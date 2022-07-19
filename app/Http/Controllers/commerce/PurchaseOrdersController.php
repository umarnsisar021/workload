<?php

namespace App\Http\Controllers\commerce;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;

use App\Models\catalogs\Brands;
use App\Models\catalogs\Counts;
use App\Models\commerce\PurchaseOrders;

use App\Models\GlobalSettings;
use App\Models\management\Brokers;
use App\Models\management\Suppliers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class PurchaseOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);

        return inertia::render('commerce/purchase_orders/index', [
            'title' => 'Purchase Orders',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
            'status' => isset($request->status) ? $request->status : 1
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('commerce/purchase_orders/index', [
            'title' => 'Purchase Order',
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
        $status = request('status');
        $display_columns = ['ut_commerce_purchase_orders.qty', 'ut_commerce_purchase_orders.rate', 'ut_commerce_purchase_orders.po_no', 'ut_commerce_purchase_orders.ag_no', 'ut_commerce_purchase_orders.invoice_date', 'brands.name', 'counts.name', 'brokers.name',
            DB::raw("CONCAT(suppliers.first_name, ' ',suppliers.last_name)"),

        ];
        $records = PurchaseOrders::orderBy('ut_commerce_purchase_orders.invoice_date', 'desc');

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
            $records->where(function ($query) use ($search, $filter_columns, $records) {
                foreach ($filter_columns as $key => $filter_column) {
                    if (isset($filter_column) && !empty($filter_column)) {

                        if ($key == 'from_date' || $key == 'to_date') {
                            $query->whereBetween('ut_commerce_purchase_orders.invoice_date', [$filter_columns->from_date, $filter_columns->to_date]);
                        } elseif ($key == 'supplier_name') {
                            $query->Where(DB::raw("CONCAT(suppliers.first_name, ' ',suppliers.last_name)"), 'Like', '%' . $filter_column . '%');
                        } elseif ($key == 'broker_name') {
                            $query->Where('brokers.name', 'Like', '%' . $filter_column . '%');
                        } elseif ($key == 'brand_name') {
                            $query->Where('brands.name', 'Like', '%' . $filter_column . '%');
                        } elseif ($key == 'count_name') {
                            $query->Where('counts.name', 'Like', '%' . $filter_column . '%');
                        } elseif ($key == 'receivable_lbs') {
                            if ($filter_column) {
                                $records->havingRaw('total_qty_balance > 0');
                            }
                        } else {
                            $query->Where('ut_commerce_purchase_orders.' . $key, 'LIKE', '%' . $filter_column . '%');
                        }
                    }
                }
            });
        }

        if ($deleted == 1) {
            $records->onlyTrashed();
        }

        if ($status) {
            $records->where('ut_commerce_purchase_orders.status', $status);
        }

        $records = $records
            ->select('ut_commerce_purchase_orders.*',
                DB::raw("CONCAT(suppliers.first_name,' ',suppliers.last_name) AS supplier_name"),
                'brands.name as brand_name',
                'counts.name as count_name',
                'brokers.name as broker_name',
                DB::raw('SUM(doubling_inwards.qty) as total_inward_qty'),
                DB::raw('ut_commerce_purchase_orders.qty-SUM(if(doubling_inwards.qty,doubling_inwards.qty,0)) total_qty_balance')
            )
            ->leftjoin('ut_management_suppliers as suppliers', 'suppliers.id', 'ut_commerce_purchase_orders.supplier_id')
            ->leftjoin('ut_catalogs_brands as brands', 'brands.id', 'ut_commerce_purchase_orders.brand_id')
            ->leftjoin('ut_catalogs_counts as counts', 'counts.id', 'ut_commerce_purchase_orders.count_id')
            ->leftjoin('ut_management_brokers as brokers', 'brokers.id', 'ut_commerce_purchase_orders.broker_id')
            ->leftjoin('ut_doubling_inwards as doubling_inwards', 'doubling_inwards.po_no', 'ut_commerce_purchase_orders.po_no')
            ->whereNull('doubling_inwards.deleted_at')
            ->groupBy('ut_commerce_purchase_orders.id')
            ->paginate($per_page)->toArray();

//        $records[] = collect(['data' => 'My custom data here']);


        $total_qty=0;
        $grand_total_qty_balance=0;
        foreach($records['data'] as $row){
            $total_qty+=floatval($row['qty']);
            $grand_total_qty_balance+=floatval($row['total_qty_balance']);
        }


        $records['data'][] = [
            "action" => "footer",
            "total_qty"=>$total_qty,
            "grand_total_qty_balance"=>$grand_total_qty_balance
        ];

//        print_r($records['data']);die;
        return response()->json($records);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $suppliers = Suppliers::where('status', 1)->select('id as value', DB::raw("CONCAT(first_name,' ',last_name) AS label"))->get();
        $brands = Brands::where('status', 1)->select('id as value', DB::raw("name AS label"))->get();
        $counts = Counts::where('status', 1)->select('id as value', DB::raw("name AS label"))->get();
        $brokers = Brokers::where('status', 1)->select('id as value', DB::raw("name AS label"))->get();

        return inertia::render('commerce/purchase_orders/create', [
            'title' => 'Purchase Order',
            'sub_title' => 'Add',
            'suppliers' => $suppliers,
            'brands' => $brands,
            'counts' => $counts,
            'brokers' => $brokers,
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
        $purchase_no_offset = GlobalSettings::getGlobalSetting('purchase_no_offset');
        $request['ag_no'] = Helper::generate_v_no("P", $purchase_no_offset);
        $this->validate($request, [
            'po_no' => ['required', 'unique:ut_commerce_purchase_orders,po_no'],
            'ag_no' => ['required', 'unique:ut_commerce_purchase_orders,ag_no'],
            'invoice_date' => ['required'],
            'supplier_id' => ['required'],
            'brand_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
        ]);

        $data = $request->all();
        $_action = $data['_action'];
        unset($data['_action']);
        $end_point = 'index';
        if ($_action == 2) {
            $end_point = 'create';
        }

        PurchaseOrders::create($data);
        GlobalSettings::setGlobalSetting('purchase_no_offset', ($purchase_no_offset + 1));
        return redirect()->route('commerce.purchase_orders.' . $end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PurchaseOrders $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function show(PurchaseOrders $purchase_order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PurchaseOrders $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = PurchaseOrders::findOrFail($id);

        $suppliers = Suppliers::where('status', 1)->select('id as value', DB::raw("CONCAT(first_name,' ',last_name) AS label"))->get();
        $brands = Brands::where('status', 1)->select('id as value', DB::raw("name AS label"))->get();
        $counts = Counts::where('status', 1)->select('id as value', DB::raw("name AS label"))->get();
        $brokers = Brokers::where('status', 1)->select('id as value', DB::raw("name AS label"))->get();

        return inertia::render('commerce/purchase_orders/edit', [
            'title' => 'Purchase Order',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'suppliers' => $suppliers,
            'brands' => $brands,
            'counts' => $counts,
            'brokers' => $brokers,
            'logs' => $this->get_logs($record_data),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\PurchaseOrders $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'po_no' => ['required', 'unique:ut_commerce_purchase_orders,po_no,' . $id],
            'invoice_date' => ['required'],
            'supplier_id' => ['required'],
            'brand_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
        ]);

        $data = $request->all();
        PurchaseOrders::find($id)->update($data);
        return redirect()->route('commerce.purchase_orders.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }


    public function update_status(Request $request)
    {
        $this->validate($request, [
            'status' => ['required'],
            'id' => ['required'],
        ]);

        $data = $request->all();
        PurchaseOrders::find($request->id)->update($data);
        return redirect()->route('commerce.purchase_orders.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PurchaseOrders $PurchaseOrders
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        PurchaseOrders::findOrFail($id)->delete();
        return redirect()->route('commerce.purchase_orders.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_delete(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            PurchaseOrders::findOrFail($id)->delete();
        }
        return redirect()->route('commerce.purchase_orders.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            PurchaseOrders::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('commerce.purchase_orders.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            PurchaseOrders::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('commerce.purchase_orders.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }
}
