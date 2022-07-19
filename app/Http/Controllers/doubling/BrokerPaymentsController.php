<?php

namespace App\Http\Controllers\doubling;

use App\Http\Controllers\Controller;

use App\Models\catalogs\Brands;
use App\Models\catalogs\Counts;
use App\Models\commerce\PurchaseOrders;
use App\Models\doubling\BrokerPayments;

use App\Models\management\Brokers;
use App\Models\management\Customers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class BrokerPaymentsController extends Controller
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
        return inertia::render('doubling/broker_payments/index', [
            'title' => 'Broker Payments',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('doubling/broker_payments/index', [
            'title' => 'Broker Payments',
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
            'ut_doubling_broker_payments.invoice_date',
            'brokers.name',
            'ut_doubling_broker_payments.remarks',
            'ut_doubling_broker_payments.amount',
            'ut_doubling_broker_payments.ag_no'
        ];
        $records = BrokerPayments::orderBy('ut_doubling_broker_payments.invoice_date', 'desc');

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
                        }
                        elseif($key=='broker_name'){
                            $query->where('brokers.name', 'Like','%'.$filter_column.'%');
                        }
                        else{
                            $query->where($key, 'LIKE', '%' . $filter_column . '%');
                        }
                    }
                }
            });
        }

        $records = $records
            ->select('ut_doubling_broker_payments.*',
                'brokers.name as broker_name'
            )
            ->leftjoin('ut_management_brokers as brokers', 'brokers.id', 'ut_doubling_broker_payments.broker_id')
            ->paginate($per_page);
        return response()->json($records);
    }




    public function get_purchase_order(Request $request)
    {
        $this->validate($request, [
            'ag_no' => ['required']
        ]);
        $record=PurchaseOrders::where('ag_no', $request['ag_no'])->first();
        return response()->json($record);
    }





    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $brands = Brands::where('status', 1)->select('id as value', 'name as label')->get();
        $counts = Counts::where('status', 1)->select('id as value', 'name as label')->get();
        $brokers = Brokers::where('status', 1)->select('id as value', 'name as label')->get();
        $purchase_orders = PurchaseOrders::where('ut_commerce_purchase_orders.status', 1)
            ->select('ut_commerce_purchase_orders.ag_no as value', 'ut_commerce_purchase_orders.ag_no as label')
            ->leftjoin('ut_doubling_broker_payments', function ($join) {
                $join->on('ut_doubling_broker_payments.ag_no', '=', 'ut_commerce_purchase_orders.ag_no')
                    ->whereNull('ut_doubling_broker_payments.deleted_at');
//                $join->on('ut_doubling_broker_payments.deleted_at', '=', DB::Raw('NULL'));
            })

            ->where('ut_doubling_broker_payments.ag_no', '=', NULL)
            ->groupBy('ut_commerce_purchase_orders.id')
            ->get();

        return inertia::render('doubling/broker_payments/create', [
            'title' => 'Broker Payments',
            'sub_title' => 'Add',
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
            'ag_no' => ['required'],
            'invoice_date' => ['required'],
            'brand_id' => ['required'],
            'broker_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
            'amount' => ['required'],
        ]);


        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }

        BrokerPayments::create($data);
        return redirect()->route('doubling.broker_payments.'.$end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BrokerPayments $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function show(BrokerPayments $purchase_order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BrokerPayments $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = BrokerPayments::findOrFail($id);


        $customers = Customers::where('status', 1)->select('id as value', DB::raw("CONCAT(first_name,' ',last_name) AS label"))->get();
        $brands = Brands::where('status', 1)->select('id as value', 'name as label')->get();
        $counts = Counts::where('status', 1)->select('id as value', 'name as label')->get();
        $brokers = Brokers::where('status', 1)->select('id as value', 'name as label')->get();
        $purchase_orders = PurchaseOrders::where('status', 1)->select('ag_no as value', 'ag_no as label')->where('ag_no',$record_data->ag_no)->get();

        return inertia::render('doubling/broker_payments/edit', [
            'title' => 'Broker Payment',
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
     * @param  \App\Models\BrokerPayments $purchase_order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'ag_no' => ['required'],
            'invoice_date' => ['required'],
            'brand_id' => ['required'],
            'broker_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
            'amount' => ['required'],
        ]);

        BrokerPayments::find($id)->update($request->all());
        return redirect()->route('doubling.broker_payments.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BrokerPayments $BrokerPayments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        BrokerPayments::findOrFail($id)->delete();
        return redirect()->route('doubling.broker_payments.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            BrokerPayments::findOrFail($id)->delete();
        }
        return redirect()->route('doubling.broker_payments.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            BrokerPayments::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('doubling.broker_payments.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            BrokerPayments::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('doubling.broker_payments.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }

}
