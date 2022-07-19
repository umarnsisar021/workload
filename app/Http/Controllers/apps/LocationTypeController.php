<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

use App\Models\locationType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

class LocationTypeController extends Controller
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

        return inertia::render('apps/locationType/index',[
            'title'=>'Location Type',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
        ]);
    }


    public function records_data()
    {

        $per_page=request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['first_name','last_name'];
        $records = locationType::orderBy('id', 'desc');
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

        return inertia::render('apps/locationType/index',[
            'title'=>'Location Type',
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
        return Inertia::render('apps/locationType/create',[
            'title'=>'Location Type',
            'sub_title' =>'Add',
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
        $this->validate($request,[
            'type' => ['required'],
            'type_code' => ['required'],
        ]);

        locationType::create($request->all());

        return redirect()->route('location_type.index')->with('type_alert','success')->with('msg','Record Added !');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\locationType  $locationType
     * @return \Illuminate\Http\Response
     */
    public function show(locationType $locationType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\locationType  $locationType
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $locationType = locationType::findOrFail($id);

        return Inertia::render('apps/locationType/edit',[
            'title'=>'Location Type',
            'sub_title' => 'Edit',
            'typeData' => $locationType,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\locationType  $locationType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        locationType::find($id)->update($request->all());

        return redirect()->route('location_type.index')->with('type_alert','success')->with('msg','Record Updated !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\locationType  $locationType
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        locationType::findOrFail($id)->delete();
        return redirect()->route('location_type.index')->with('type_alert', 'success')->with('msg','Record Deleted !');
    }



    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            locationType::findOrFail($id)->delete();
        }
        return redirect()->route('location_type.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            locationType::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('location_type.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            locationType::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('location_type.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }

}
