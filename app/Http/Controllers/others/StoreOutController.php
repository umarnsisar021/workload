<?php

namespace App\Http\Controllers\others;

use App\Http\Controllers\Controller;

use App\Models\catalogs\Items;
use App\Models\locations\Countries;
use App\Models\management\Unit_departments;

use App\Models\others\StoreOut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class StoreOutController extends Controller
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
        return inertia::render('others/store_out/index', [
            'title' => 'Store Out',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
        ]);
    }


    public function records_data()
    {
        $per_page = request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['ut_others_store_out.id', 'ut_others_store_out.invoice_date', 'ut_others_store_out.po_no', 'ut_others_store_out.slip_no', 'ut_others_store_out.qty', 'ut_others_store_out.unit', 'ut_others_store_out.rate', 'ut_others_store_out.amount', 'ut_others_store_out.issue_to', 'ut_others_store_out.remarks', 'unit_departments.name', 'issue_unit_departments.name'];

        $records = StoreOut::orderBy('ut_others_store_out.id', 'desc');
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

                        if ($key == 'from_date' || $key == 'to_date') {
                            $query->whereBetween('invoice_date', [$filter_columns->from_date, $filter_columns->to_date]);
                        } elseif ($key == 'unit_name') {
                            $query->where('unit_departments.name', 'Like', '%' . $filter_column . '%');
                        } elseif ($key == 'issue_unit_name') {
                            $query->where('issue_unit_departments.name', 'Like', '%' . $filter_column . '%');
                        }elseif ($key == 'item') {
                            $query->where('catalogs_items.name', 'Like', '%' . $filter_column . '%');
                        }  else {
                            $query->Where('ut_others_store_out.'.$key, 'LIKE', '%' . $filter_column . '%');
                        }
                    }
                }
            });
        }

        $records = $records->select('ut_others_store_out.id', 'ut_others_store_out.invoice_date', 'ut_others_store_out.po_no', 'ut_others_store_out.slip_no', 'ut_others_store_out.qty', 'ut_others_store_out.unit', 'ut_others_store_out.rate', 'ut_others_store_out.amount', 'ut_others_store_out.issue_to', 'ut_others_store_out.remarks', 'unit_departments.name as unit_name', 'issue_unit_departments.name as issue_unit_name','catalogs_items.name as item_name')
            ->leftjoin('ut_management_unit_departments as unit_departments', 'unit_departments.id', 'ut_others_store_out.unit_department_id')
            ->leftjoin('ut_management_unit_departments as issue_unit_departments', 'issue_unit_departments.id', 'ut_others_store_out.issue_unit_department_id')
            ->leftjoin('ut_catalogs_items as catalogs_items', 'catalogs_items.id', 'ut_others_store_out.item_id')
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


    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('others/store_out/index', [
            'create_url' => route('others.store_out.create'),
            'title' => 'Store Out',
            'sub_title' => 'Trash',
            'getPermission' => $optionArray,
            'deleted' => 1,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $unit_departments = Unit_departments::where('status', 1)
            ->select('id as value', 'name as label')->get();

        return inertia::render('others/store_out/create', [
            'title' => 'Store Out',
            'sub_title' => 'Add',
            'unit_departments' => $unit_departments
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
            'invoice_date' => ['required'],
            'unit_department_id' => ['required'],
            'issue_unit_department_id' => ['required'],
            'amount' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
            'po_no' => ['required'],
            'item_id' => ['required'],
        ]);

        $data = $request->all();
        $_action = $data['_action'];
        unset($data['_action']);
        $end_point = 'index';
        if ($_action == 2) {
            $end_point = 'create';
        }
        StoreOut::create($data);
        return redirect()->route('others.store_out.' . $end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StoreOut $units
     * @return \Illuminate\Http\Response
     */
    public function show(StoreOut $units)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StoreOut $units
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = StoreOut::findOrFail($id);
        $unit_departments = Unit_departments::where('status', 1)
            ->select('id as value', 'name as label')->get();

        $items = Items::where('unit_department_id', $record_data->unit_department_id)->select('id as value', 'name as label')->get();

        return inertia::render('others/store_out/edit', [
            'title' => 'Store Out',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'items' => $items,
            'unit_departments' => $unit_departments
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\StoreOut $units
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'invoice_date' => ['required'],
            'unit_department_id' => ['required'],
            'issue_unit_department_id' => ['required'],
            'amount' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
            'po_no' => ['required'],
            'item_id' => ['required'],
        ]);

        StoreOut::find($id)->update($request->all());

        return redirect()->route('others.store_out.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StoreOut $StoreOut
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        StoreOut::findOrFail($id)->delete();
        return redirect()->route('others.store_out.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            StoreOut::findOrFail($id)->delete();
        }
        return redirect()->route('others.store_out.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            StoreOut::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('others.store_out.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            StoreOut::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('others.store_out.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }

    public function get_items_by_unit(Request $request)
    {
        $items = Items::where('unit_department_id', $request['department_id'])->select('id as value', 'name as label')->get();
        return $items;
    }
}
