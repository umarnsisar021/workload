<?php

namespace App\Http\Controllers\doubling;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;

use App\Models\catalogs\Brands;
use App\Models\catalogs\Counts;
use App\Models\commerce\PurchaseOrders;
use App\Models\doubling\Inwards;

use App\Models\GlobalSettings;
use App\Models\management\Brokers;
use App\Models\management\Customers;
use App\Models\management\Suppliers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class InwardsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('doubling/inwards/index', [
            'title' => 'Inwards',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('doubling/inwards/index', [
            'title' => 'Inwards',
            'sub_title' => 'Trash',
            'getPermission' => $optionArray,
            'deleted' => 1,
        ]);
    }


    public function records_data()
    {
        $per_page = request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = [
            'ut_doubling_inwards.invoice_date',
            'ut_doubling_inwards.chalan_no',
            'brands.name',
            'counts.name',
            DB::raw("CONCAT(customers.first_name, ' ',customers.last_name)"),
            'ut_doubling_inwards.qty',
            'ut_doubling_inwards.vehicle_no',
            'brokers.name',
            'ut_doubling_inwards.remarks',
            'ut_doubling_inwards.po_no'
        ];
        $records = Inwards::orderBy('ut_doubling_inwards.invoice_date', 'desc');

        if (!empty($search)) {
            $records->where(function ($query) use ($search, $display_columns) {
                foreach ($display_columns as $display_column) {
                    $query->orWhere($display_column, 'LIKE', '%' . $search . '%');
                }
            });
        }

        if ($deleted == 1) {
            $records->onlyTrashed();
        }



        $filter_columns = request('filter_columns');
        if (!empty($filter_columns)) {
            $filter_columns = json_decode($filter_columns);
            $records->where(function ($query) use ($search, $filter_columns) {
                foreach ($filter_columns as $key => $filter_column) {
                    if (isset($filter_column) && !empty($filter_column)) {

                        if($key=='from_date' || $key=='to_date'){
                            $query->whereBetween('invoice_date',[$filter_columns->from_date,$filter_columns->to_date]);
                        }elseif($key=='customer_name'){
                            $query->Where(DB::raw("CONCAT(customers.first_name, ' ',customers.last_name)"), 'Like','%'.$filter_column.'%');
                        }
                        elseif($key=='broker_name'){
                            $query->Where('brokers.name', 'Like','%'.$filter_column.'%');
                        }
                        elseif($key=='brand_name'){
                            $query->Where('brands.name', 'Like','%'.$filter_column.'%');
                        }
                        elseif($key=='count_name'){
                            $query->Where('counts.name', 'Like','%'.$filter_column.'%');
                        }
                        else{
                            $query->Where($key, 'LIKE', '%' . $filter_column . '%');
                        }
                    }
                }
            });
        }

        $records = $records
            ->select('ut_doubling_inwards.*',
                DB::raw("CONCAT(customers.first_name,' ',customers.last_name) AS customer_name"),
                'brands.name as brand_name',
                'counts.name as count_name',
                'brokers.name as broker_name'
            )
            ->leftjoin('ut_management_customers as customers', 'customers.id', 'ut_doubling_inwards.customer_id')
            ->leftjoin('ut_catalogs_brands as brands', 'brands.id', 'ut_doubling_inwards.brand_id')
            ->leftjoin('ut_catalogs_counts as counts', 'counts.id', 'ut_doubling_inwards.count_id')
            ->leftjoin('ut_management_brokers as brokers', 'brokers.id', 'ut_doubling_inwards.broker_id')
            ->paginate($per_page)->toArray();


        $total_qty=0;
        foreach($records['data'] as $row){
            $total_qty+=floatval($row['qty']);
        }


        $records['data'][] = [
            "action" => "footer",
            "total_qty"=>$total_qty,
        ];


        return response()->json($records);
    }




    public function get_purchase_order(Request $request)
    {
        $this->validate($request, [
            'po_no' => ['required']
        ]);
        $record=PurchaseOrders::where('po_no', $request['po_no'])->first();
        return response()->json($record);
    }





    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $customers = Customers::where('status', 1)->select('id as value', DB::raw("CONCAT(first_name,' ',last_name) AS label"))->get();
        $brands = Brands::where('status', 1)->select('id as value', 'name as label')->get();
        $counts = Counts::where('status', 1)->select('id as value', 'name as label')->get();
        $brokers = Brokers::where('status', 1)->select('id as value', 'name as label')->get();
        $purchase_orders = PurchaseOrders::where('status', 1)->select('po_no as value', 'po_no as label')->get();

        return inertia::render('doubling/inwards/create', [
            'title' => 'Inwards',
            'sub_title' => 'Add',
            'customers' => $customers,
            'brands' => $brands,
            'counts' => $counts,
            'brokers' => $brokers,
            'purchase_orders' => $purchase_orders,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'po_no' => ['required'],
            'invoice_date' => ['required'],
            'customer_id' => ['required'],
            'brand_id' => ['required'],
            'broker_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'chalan_no' => ['required'],
        ]);


        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        Inwards::create($data);
        return redirect()->route('doubling.inwards.'.$end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Inwards $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function show(Inwards $purchase_order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Inwards $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Inwards::findOrFail($id);


        $customers = Customers::where('status', 1)->select('id as value', DB::raw("CONCAT(first_name,' ',last_name) AS label"))->get();
        $brands = Brands::where('status', 1)->select('id as value', 'name as label')->get();
        $counts = Counts::where('status', 1)->select('id as value', 'name as label')->get();
        $brokers = Brokers::where('status', 1)->select('id as value', 'name as label')->get();
        $purchase_orders = PurchaseOrders::where('status', 1)->select('po_no as value', 'po_no as label')->get();



        return inertia::render('doubling/inwards/edit', [
            'title' => 'Inwards',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'customers' => $customers,
            'brands' => $brands,
            'counts' => $counts,
            'brokers' => $brokers,
            'purchase_orders' => $purchase_orders,
            'logs' => $this->get_logs($record_data),

        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Inwards $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'po_no' => ['required'],
            'invoice_date' => ['required'],
            'customer_id' => ['required'],
            'brand_id' => ['required'],
            'broker_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'chalan_no' => ['required'],
        ]);

        Inwards::find($id)->update($request->all());
        return redirect()->route('doubling.inwards.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Inwards $Inwards
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Inwards::findOrFail($id)->delete();
        return redirect()->route('doubling.inwards.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Inwards::findOrFail($id)->delete();
        }
        return redirect()->route('doubling.inwards.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Inwards::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('doubling.inwards.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Inwards::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('doubling.inwards.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }
}
