<?php

namespace App\Http\Controllers\commerce;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;

use App\Models\catalogs\Brands;
use App\Models\catalogs\Counts;
use App\Models\catalogs\Items;
use App\Models\catalogs\Products;
use App\Models\commerce\Shipments;
use App\Models\management\Brokers;
use App\Models\management\Customers;
use App\Models\management\Suppliers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class ShipmentsController extends Controller
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
        return inertia::render('commerce/shipments/index', [
            'title' => 'Shipments',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('commerce/shipments/index', [
            'title' => 'Shipment',
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
            'ut_commerce_shipments.invoice_date',
            'ut_commerce_shipments.party_po_no',
            'ut_commerce_shipments.po_no',
            DB::raw("CONCAT(customers.first_name, ' ',customers.last_name)"),
            'products.name',
            'ut_commerce_shipments.order_pcs',
            'ut_commerce_shipments.pcs_b',
            'counts_pile.name',
            'ut_commerce_shipments.qty_pile',

            'counts_weft.name',
            'ut_commerce_shipments.qty_weft',

            'counts_ground.name',
            'ut_commerce_shipments.qty_ground',

            'ut_commerce_shipments.arrival_port',
            'ut_commerce_shipments.ship_date'
        ];
        $records = Shipments::orderBy('ut_commerce_shipments.invoice_date', 'desc');

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
                        }
                        else if($key=='ship_from_date' || $key=='ship_to_date'){
                            $query->whereBetween('ut_commerce_shipments.ship_date',[$filter_columns->ship_from_date,$filter_columns->ship_to_date]);
                        }
                        elseif($key=='customer_name'){
                            $query->where(DB::raw("CONCAT(customers.first_name, ' ',customers.last_name)"), 'Like','%'.$filter_column.'%');
                        }
                        elseif($key=='item_name'){
                            $query->where('products.name', 'Like','%'.$filter_column.'%');
                        }
                        elseif($key=='pile_name'){
                            $query->where('counts_pile.name', 'Like','%'.$filter_column.'%');
                        }
                        elseif($key=='weft_name'){
                            $query->where('counts_weft.name', 'Like','%'.$filter_column.'%');
                        }
                        elseif($key=='ground_name'){
                            $query->where('counts_ground.name', 'Like','%'.$filter_column.'%');
                        }
                        else{
                            $query->where($key, 'LIKE', '%' . $filter_column . '%');
                        }
                    }
                }
            });
        }

        if ($deleted == 1) {
            $records->onlyTrashed();
        }

        $records = $records
            ->select(
                'ut_commerce_shipments.id',
                 'ut_commerce_shipments.invoice_date',
            'ut_commerce_shipments.party_po_no',
            'ut_commerce_shipments.po_no',
            DB::raw("CONCAT(customers.first_name,' ',customers.last_name) AS customer_name"),
            'products.name as item_name',
            'ut_commerce_shipments.order_pcs',
            'ut_commerce_shipments.pcs_b',
            'counts_pile.name as pile_name',
            'ut_commerce_shipments.qty_pile',
            'counts_weft.name as weft_name',
            'ut_commerce_shipments.qty_weft',
            'counts_ground.name as ground_name',
            'ut_commerce_shipments.qty_ground',
            'ut_commerce_shipments.arrival_port',
            'ut_commerce_shipments.ship_date'
            )
            ->leftjoin('ut_management_customers as customers', 'customers.id', 'ut_commerce_shipments.customer_id')
            ->leftjoin('ut_catalogs_products as products', 'products.id', 'ut_commerce_shipments.item_id')
            ->leftjoin('ut_catalogs_counts as counts_pile', 'counts_pile.id', 'ut_commerce_shipments.count_id_pile')
            ->leftjoin('ut_catalogs_counts as counts_weft', 'counts_weft.id', 'ut_commerce_shipments.count_id_weft')
            ->leftjoin('ut_catalogs_counts as counts_ground', 'counts_ground.id', 'ut_commerce_shipments.count_id_ground')

            ->paginate($per_page)->toArray();


        $total_order_pcs=0;
        $total_pcs_b=0;
        foreach($records['data'] as $row){
            $total_order_pcs+=floatval($row['order_pcs']);
            $total_pcs_b+=floatval($row['pcs_b']);
        }


        $records['data'][] = [
            "action" => "footer",
            "total_order_pcs"=>$total_order_pcs,
            "total_pcs_b"=>$total_pcs_b
        ];


        return response()->json($records);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $customers = Customers::where('status', 1)->get();
        $items_options = Products::where('status', 1)->select('id as value','name as label')->get();
        $counts = Counts::where('status', 1)->get();

        return inertia::render('commerce/shipments/create', [
            'title' => 'Shipment',
            'sub_title' => 'Add',
            'customers' => $customers,
            'items_options' => $items_options,
            'counts' => $counts,
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
            'party_po_no' => ['required'],
            'po_no' => ['required'],
            'item_id' => ['required'],
            'customer_id' => ['required'],
            'order_pcs' => ['required'],
            'count_id_pile' => ['required'],
            'count_id_weft' => ['required'],
            'count_id_ground' => ['required'],
            'qty_pile' => ['required'],
            'qty_weft' => ['required'],
            'qty_ground' => ['required'],
            'ship_date' => ['required'],
            'arrival_port' => ['required']
        ]);


        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        Shipments::create($data);
        return redirect()->route('commerce.shipments.'.$end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Shipments $shipment
     * @return \Illuminate\Http\Response
     */
    public function show(Shipments $shipment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Shipments $shipment
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Shipments::findOrFail($id);

        $customers = Customers::where('status', 1)->get();
        $items_options = Products::where('status', 1)->select('id as value','name as label')->get();
        $counts = Counts::where('status', 1)->get();



        return inertia::render('commerce/shipments/edit', [
            'title' => 'Shipment',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'customers' => $customers,
            'items_options' => $items_options,
            'counts' => $counts,
            'logs' => $this->get_logs($record_data),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Shipments $shipment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'party_po_no' => ['required'],
            'po_no' => ['required'],
            'item_id' => ['required'],
            'customer_id' => ['required'],
            'order_pcs' => ['required'],
            'count_id_pile' => ['required'],
            'count_id_weft' => ['required'],
            'count_id_ground' => ['required'],
            'qty_pile' => ['required'],
            'qty_weft' => ['required'],
            'qty_ground' => ['required'],
            'ship_date' => ['required'],
            'arrival_port' => ['required']
        ]);

        Shipments::find($id)->update($request->all());
        return redirect()->route('commerce.shipments.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Shipments $Shipments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Shipments::findOrFail($id)->delete();
        return redirect()->route('commerce.shipments.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }




    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Shipments::findOrFail($id)->delete();
        }
        return redirect()->route('commerce.shipments.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Shipments::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('commerce.shipments.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Shipments::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('commerce.shipments.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }

}
