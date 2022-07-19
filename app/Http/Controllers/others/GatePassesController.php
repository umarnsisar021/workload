<?php

namespace App\Http\Controllers\others;

use App\Http\Controllers\Controller;

use App\Models\locations\Countries;
use App\Models\management\Unit_departments;

use App\Models\others\GatePasses;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class GatePassesController extends Controller
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
        return inertia::render('others/gate_passes/index', [
            'title' => 'Gate Passes',
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

        $display_columns = ['ut_others_gate_passes.id','ut_others_gate_passes.invoice_date','ut_others_gate_passes.type','ut_others_gate_passes.gp_no','ut_others_gate_passes.item','ut_others_gate_passes.qty','ut_others_gate_passes.unit','ut_others_gate_passes.vehicle_no','ut_others_gate_passes.roll','ut_others_gate_passes.remarks','unit_departments.name'];

        $records = GatePasses::orderBy('ut_others_gate_passes.id', 'desc');
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


        $filter_columns = request('filter_columns');
        if (!empty($filter_columns)) {
            $filter_columns = json_decode($filter_columns);
            $records->where(function ($query) use ($search, $filter_columns) {
                foreach ($filter_columns as $key => $filter_column) {
                    if (isset($filter_column) && !empty($filter_column)) {

                        if($key=='from_date' || $key=='to_date'){
                            $query->whereBetween('invoice_date',[$filter_columns->from_date,$filter_columns->to_date]);
                        }elseif($key=='type'){
                            if(strtolower($filter_column)=='in'){
                                $query->Where('type', 'Like','1');
                            }
                            elseif(strtolower($filter_column)=='out'){
                                $query->Where('type', 'Like','2');
                            }else{
                                $query->Where('type', 'Like','3');
                            }
                        }
                        else{
                            $query->Where($key, 'LIKE', '%' . $filter_column . '%');
                        }
                    }
                }
            });
        }

        $records=  $records->select('ut_others_gate_passes.id','ut_others_gate_passes.invoice_date','ut_others_gate_passes.type','ut_others_gate_passes.gp_no','ut_others_gate_passes.item','ut_others_gate_passes.qty','ut_others_gate_passes.unit','ut_others_gate_passes.vehicle_no','ut_others_gate_passes.roll','ut_others_gate_passes.remarks','unit_departments.name as unit_name')
            ->leftjoin('ut_management_unit_departments as unit_departments', 'unit_departments.id', 'ut_others_gate_passes.unit_department_id')
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
        return inertia::render('others/gate_passes/index', [
            'create_url' => route('others.gate_passes.create'),
            'title' => 'Gate Passes',
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
        $unit_departments = Unit_departments::where('status', 1)
            ->select('id as value','name as label')->get();

        return inertia::render('others/gate_passes/create', [
            'title' => 'Gate Passes',
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
            'type' => ['required'],
            'gp_no' => ['required'],
            'item' => ['required'],
            'qty' => ['required'],

        ]);

        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        GatePasses::create($data);
        return redirect()->route('others.gate_passes.'.$end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GatePasses $units
     * @return \Illuminate\Http\Response
     */
    public function show(GatePasses $units)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GatePasses $units
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = GatePasses::findOrFail($id);
        $unit_departments = Unit_departments::where('status', 1)
            ->select('id as value','name as label')->get();



        return inertia::render('others/gate_passes/edit', [
            'title' => 'Gate Passes',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'unit_departments' => $unit_departments,
            'logs' => $this->get_logs($record_data),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\GatePasses $units
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'invoice_date' => ['required'],
            'unit_department_id' => ['required'],
            'type' => ['required'],
            'gp_no' => ['required'],
            'item' => ['required'],
            'qty' => ['required']
        ]);

        GatePasses::find($id)->update($request->all());

        return redirect()->route('others.gate_passes.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GatePasses $GatePasses
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        GatePasses::findOrFail($id)->delete();
        return redirect()->route('others.gate_passes.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            GatePasses::findOrFail($id)->delete();
        }
        return redirect()->route('others.gate_passes.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            GatePasses::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('others.gate_passes.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            GatePasses::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('others.gate_passes.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }
}
