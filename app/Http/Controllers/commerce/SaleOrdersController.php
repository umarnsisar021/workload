<?php

namespace App\Http\Controllers\commerce;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;

use App\Models\catalogs\Brands;
use App\Models\catalogs\Counts;
use App\Models\commerce\SaleOrders;

use App\Models\GlobalSettings;
use App\Models\management\Brokers;
use App\Models\management\Customers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class SaleOrdersController extends Controller
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
        return inertia::render('commerce/sale_orders/index',[
            'title'=>'Sale Orders',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted'=>0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('commerce/sale_orders/index',[
            'title'=>'Sale Order',
            'sub_title'=>'Trash',
            'getPermission' => $optionArray,
            'deleted'=>1,
        ]);
    }


    public function records_data()
    {
        $per_page = request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['ut_commerce_sale_orders.qty','ut_commerce_sale_orders.rate',
        'ut_commerce_sale_orders.ag_no','ut_commerce_sale_orders.invoice_date','brands.name',
        'counts.name','brokers.name',DB::raw("CONCAT(customers.first_name, ' ',customers.last_name)")];
        $records = SaleOrders::orderBy('ut_commerce_sale_orders.invoice_date','desc');

        if (!empty($search)) {
            $records->where(function ($query) use ($search, $display_columns) {
                foreach ($display_columns as $display_column) {
                    $query->orWhere($display_column, 'LIKE', '%' . $search . '%');
                }
            });
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

        if ($deleted == 1) {
            $records->onlyTrashed();
        }

        $records = $records
            ->select('ut_commerce_sale_orders.*',
                DB::raw("CONCAT(customers.first_name,' ',customers.last_name) AS customer_name"),
                'brands.name as brand_name',
                'counts.name as count_name',
                'brokers.name as broker_name'
                )
            ->leftjoin('ut_management_customers as customers','customers.id','ut_commerce_sale_orders.customer_id')
            ->leftjoin('ut_catalogs_brands as brands','brands.id','ut_commerce_sale_orders.brand_id')
            ->leftjoin('ut_catalogs_counts as counts','counts.id','ut_commerce_sale_orders.count_id')
            ->leftjoin('ut_management_brokers as brokers','brokers.id','ut_commerce_sale_orders.broker_id')
            ->paginate($per_page);
        return response()->json($records);
    }





    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $customers=Customers::where('status',1)->select('id as value', DB::raw("CONCAT(first_name,' ',last_name) AS label"))->get();
        $brands=Brands::where('status',1)->select('id as value', DB::raw("name AS label"))->get();
        $counts=Counts::where('status',1)->select('id as value', DB::raw("name AS label"))->get();
        $brokers=Brokers::where('status',1)->select('id as value', DB::raw("name AS label"))->get();

        return inertia::render('commerce/sale_orders/create',[
            'title'=>'Sale Order',
            'sub_title' => 'Add',
            'customers'=>$customers,
            'brands'=>$brands,
            'counts'=>$counts,
            'brokers'=>$brokers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $sale_no_offset=GlobalSettings::getGlobalSetting('sale_no_offset');
        $request['ag_no']=Helper::generate_v_no("S",$sale_no_offset);
        $this->validate($request,[
            'ag_no' => ['required','unique:ut_commerce_sale_orders,ag_no'],
            'invoice_date' => ['required'],
            'customer_id' => ['required'],
            'brand_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
        ]);

        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        SaleOrders::create($data);
        GlobalSettings::setGlobalSetting('sale_no_offset',($sale_no_offset+1));
        return redirect()->route('commerce.sale_orders.'.$end_point)->with('type_alert', 'success')->with('msg','Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SaleOrders  $sale_order
     * @return \Illuminate\Http\Response
     */
    public function show(SaleOrders $sale_order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SaleOrders  $sale_order
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = SaleOrders::findOrFail($id);

        $customers=Customers::where('status',1)->select('id as value', DB::raw("CONCAT(first_name,' ',last_name) AS label"))->get();
        $brands=Brands::where('status',1)->select('id as value', DB::raw("name AS label"))->get();
        $counts=Counts::where('status',1)->select('id as value', DB::raw("name AS label"))->get();
        $brokers=Brokers::where('status',1)->select('id as value', DB::raw("name AS label"))->get();


        return inertia::render('commerce/sale_orders/edit',[
            'title'=>'Sale Order',
            'sub_title'=>'Edit',
            'record_data' => $record_data,
            'customers'=>$customers,
            'brands'=>$brands,
            'counts'=>$counts,
            'brokers'=>$brokers,
            'logs' => $this->get_logs($record_data),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SaleOrders  $sale_order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'invoice_date' => ['required'],
            'customer_id' => ['required'],
            'brand_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
        ]);

        SaleOrders::find($id)->update($request->all());

        return redirect()->route('commerce.sale_orders.index')->with('type_alert', 'success')->with('msg','Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SaleOrders  $SaleOrders
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        SaleOrders::findOrFail($id)->delete();
        return redirect()->route('commerce.sale_orders.index')->with('type_alert', 'success')->with('msg','Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            SaleOrders::findOrFail($id)->delete();
        }
        return redirect()->route('commerce.sale_orders.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            SaleOrders::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('commerce.sale_orders.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            SaleOrders::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('commerce.sale_orders.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }



}
