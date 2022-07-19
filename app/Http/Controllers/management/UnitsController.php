<?php

namespace App\Http\Controllers\management;

use App\Http\Controllers\Controller;

use App\Models\locations\Countries;
use App\Models\management\Unit_departments;
use App\Models\management\Units;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class UnitsController extends Controller
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
        return inertia::render('management/units/index', [
            'title' => 'Units',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted'=>0,
        ]);
    }


    public function records_data()
    {
        $per_page=request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['ut_management_units.name','umut.name'];

        $records = Units::orderBy('ut_management_units.id', 'asc');
        if (!empty($search)) {
            $records->where(function ($query) use ($search,$display_columns) {
                foreach($display_columns as $display_column){
                    $query->orWhere($display_column, 'LIKE', '%' . $search . '%');
                }
            });
        }

        if($deleted==1){
            $records->onlyTrashed();
        }
        $records=  $records->select('ut_management_units.*', 'umut.name as unit_department_name')
            ->leftJoin('ut_management_unit_departments as umut', 'umut.id', '=', 'ut_management_units.unit_department_id')
            ->paginate($per_page);

        return response()->json($records);
    }


    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('management/units/index', [
            'create_url' => route('management.units.create'),
            'title' => 'Unit',
            'sub_title' => 'Trash',
            'getPermission' => $optionArray,
            'deleted'=>1,
        ]);
    }




    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $unit_departments_options=Unit_departments::where('status',1)->select('id as value','name as label')->get();
        $countries_options = Countries::where('status', 1)->orderBy('name', 'asc')->select('id as value','name as label')->get();

        return inertia::render('management/units/create', [
            'title' => 'Unit',
            'sub_title' => 'Add',
            'unit_departments_options' => $unit_departments_options,
            'countries_options' => $countries_options
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
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        Units::create($data);
        return redirect()->route('management.units.'.$end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Units $units
     * @return \Illuminate\Http\Response
     */
    public function show(Units $units)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Units $units
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Units::findOrFail($id);
        $unit_departments_options=Unit_departments::where('status',1)->select('id as value','name as label')->get();
        $countries_options = Countries::where('status', 1)->orderBy('name', 'asc')->select('id as value','name as label')->get();


        return inertia::render('management/units/edit', [
            'title' => 'Unit',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'unit_departments_options' => $unit_departments_options,
            'countries_options' => $countries_options,
            'logs' => $this->get_logs($record_data),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Units $units
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => ['required']
        ]);

        $input = $request->all();
        $query = Units::find($id);
        $query->update($input);

        return redirect()->route('management.units.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Units $Units
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Units::findOrFail($id)->delete();
        return redirect()->route('management.units.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Units::findOrFail($id)->delete();
        }
        return redirect()->route('management.units.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Units::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('management.units.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Units::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('management.units.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }

}
