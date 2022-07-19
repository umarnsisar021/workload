<?php

namespace App\Http\Controllers\catalogs;

use App\Http\Controllers\Controller;

use App\Models\locations\Countries;
use App\Models\management\Unit_departments;
use App\Models\catalogs\Items;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class ItemsController extends Controller
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
        return inertia::render('catalogs/items/index', [
            'title' => 'Items',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('catalogs/items/index', [
            'title' => 'Item',
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

        $display_columns = ['ut_catalogs_items.id', 'ut_catalogs_items.name', 'umut.name', 'ut_catalogs_items.unit'];
        $records = Items::orderBy('ut_catalogs_items.id', 'asc');
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
        $records = $records->select('ut_catalogs_items.*', 'umut.name as unit_department_name')
            ->leftJoin('ut_management_unit_departments as umut', 'umut.id', '=', 'ut_catalogs_items.unit_department_id')
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
        $unit_departments_options = Unit_departments::where('status', 1)->select('id as value', 'name as label')->get();
        $countries = Countries::where('status', 1)->get();

        return inertia::render('catalogs/items/create', [
            'title' => 'Item',
            'sub_title' => 'Add',
            'unit_departments_options' => $unit_departments_options,
            'countries' => $countries
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
            'name' => ['required']
        ]);


        $data = $request->all();
        $_action = $data['_action'];
        unset($data['_action']);
        $end_point = 'index';
        if ($_action == 2) {
            $end_point = 'create';
        }
        Items::create($data);
        return redirect()->route('catalogs.items.' . $end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Items $record
     * @return \Illuminate\Http\Response
     */
    public function show(Items $record)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Items $record
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Items::findOrFail($id);
        $unit_departments_options = Unit_departments::where('status', 1)->select('id as value', 'name as label')->get();

        $countries = Countries::where('status', 1)->get();

        return inertia::render('catalogs/items/edit', [
            'title' => 'Item',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'unit_departments_options' => $unit_departments_options,
            'countries' => $countries,
            'logs' => $this->get_logs($record_data),

        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Items $record
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {



        $this->validate($request, [
            'name' => ['required']
        ]);

        $input = $request->all();
        $query = Items::find($id);
        $query->update($input);

        return redirect()->route('catalogs.items.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Items $Items
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Items::findOrFail($id)->delete();
        return redirect()->route('catalogs.items.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            Items::findOrFail($id)->delete();
        }
        return redirect()->route('catalogs.items.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            Items::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('catalogs.items.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            Items::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('catalogs.items.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }


    public function check_name(Request $request)
    {
        $items = Items::where(['name'=> $request['name'],'unit_department_id'=> $request['unit_department_id']])->select('id as value', 'name as label');


        if (isset($request['id']) && !empty($request['id'])) {
            $current_item = Items::find($request['id']);
            if ($current_item->name == $request['name']) {
                $items->where('id', '!=', $request['id']);
            }
        }

        $items = $items->get();

        return $items;
    }

}
