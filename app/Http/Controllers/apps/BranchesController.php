<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

/* MODELS */
use App\Models\branches;
use App\Models\Location;
use App\Models\locationType;
use DB;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BranchesController extends Controller
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

        return inertia::render('apps/branches/index',[
            'title'=>'Branches',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
        ]);
    }


    public function records_data()
    {

        $per_page=request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['branches.name','branches.code','locations.area','location_types.type'];
        $records = branches::orderBy('branches.id', 'desc');
        $records->select('branches.*','locations.area','location_types.type');
        $records->join('locations','locations.id','branches.location_id');
        $records->join('location_types','location_types.id','branches.location_type_id');
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
        $records=  $records
            ->paginate($per_page);
        return response()->json($records);

    }



    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);

        return inertia::render('apps/branches/index',[
            'title'=>'Branches',
            'sub_title'=>'Trash',
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
        $location = location::all();
        $location_type = locationType::all();

        return inertia::render('apps/branches/create',[
            'title' => 'Branches',
            'sub_title' => 'Create',
            'location' => $location,
            'location_type' => $location_type,
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
       $this->validate($request,
            [
                'name' => 'required',
                'code' => 'required',
                'location_id' => 'required',
                'location_type_id' => 'required'
            ],
            [
                'location_id.required' => 'The location field is required.',
                'location_type_id.required' => 'The location type field is required.',
            ]);

            $request->merge(["create_by"=>Auth::user()->id]);
            branches::create($request->all());

        return redirect()->route('branches.index')->with('type_alert', 'success')->with('msg','Record Added!');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\branches  $branches
     * @return \Illuminate\Http\Response
     */
    public function show(branches $branches)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\branches  $branches
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = branches::findOrFail($id);

        // $data1 = branches::where('branches.id', $id);
        // $data1->select('branches.*','locations.area','location_types.type');
        // $data1->join('locations','locations.id','branches.location_id');
        // $data1->join('location_types','location_types.id','branches.location_type_id');

        $location = location::all();
        $location_type = locationType::all();

        return inertia::render('apps/branches/edit',[
            'title' => 'Branches',
            'sub_title' => 'Edit',
            'location' => $location,
            'location_type' => $location_type,
            'data' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\branches  $branches
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $request->merge(["modify_by"=>Auth::user()->id]);
        branches::find($id)->update($request->all());

        return redirect()->route('branches.index')->with('type_alert', 'success')->with('msg','Record Updated !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\branches  $branches
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        branches::find($id)->delete();
        return redirect()->route('branches.index')->with('type_alert', 'success')->with('msg','Record Delete !');
    }



    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            branches::findOrFail($id)->delete();
        }
        return redirect()->route('branches.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            branches::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('branches.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            branches::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('branches.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }
}
