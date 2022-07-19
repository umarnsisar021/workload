<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

use App\Models\Location;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

class LocationController extends Controller
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

        return inertia::render('apps/location/index',[
            'title'=>'Location',
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
        $records = location::orderBy('id', 'desc');
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


    public function trashIndex()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);

        return inertia::render('apps/location/trash',[
            'title'=>'Location',
            'sub_title' =>'Trash',
            'getPermission' => $optionArray,
        ]);
    }


    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);

        return inertia::render('apps/location/index',[
            'title'=>'Location',
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
        return Inertia::render('apps/location/create',[
            'title'=>'Location',
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
            'area' => ['required'],
            'area_code' => ['required'],
        ]);

        $request->merge(["create_by"=>Auth::user()->id]);
        Location::create($request->all());

        return redirect()->route('locations.index')->with('type_alert', 'success')->with('msg','Record Added !');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Location  $location
     * @return \Illuminate\Http\Response
     */
    public function show(Location $location)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Location  $location
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $location = location::findOrFail($id);

        return Inertia::render('apps/location/edit',[
            'title'=>'Location',
            'sub_title' => 'Edit',
            'data' => $location,
        ]);


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Location  $location
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->merge(["modify_by"=>Auth::user()->id]);

        location::find($id)->update($request->all());

        return redirect()->route('locations.index')->with('type_alert', 'success')->with('msg','Record Updated !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Location  $location
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        location::findOrFail($id)->delete();

        return redirect()->route('locations.index')->with('type_alert', 'success')->with('msg','Record Deleted !');
    }



    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            location::findOrFail($id)->delete();
        }
        return redirect()->route('locations.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            location::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('locations.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            location::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('locations.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }
}
