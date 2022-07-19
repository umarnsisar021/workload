<?php

namespace App\Http\Controllers\management;
use App\Http\Controllers\Controller;

use App\Models\management\Brokers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class BrokersController extends Controller
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
        return inertia::render('management/brokers/index',[
            'title'=>'Brokers',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted'=>0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('management/brokers/index',[
            'title'=>'Broker',
            'sub_title'=>'Trash',
            'getPermission' => $optionArray,
            'deleted'=>1,
        ]);
    }


    public function records_data()
    {
        $per_page = request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['ut_management_brokers.id','ut_management_brokers.name'];
        $records = Brokers::orderBy('ut_management_brokers.id', 'desc');
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
                        $query->orWhere($key, 'LIKE', '%' . $filter_column . '%');
                    }
                }
            });
        }

        if ($deleted == 1) {
            $records->onlyTrashed();
        }

        $records = $records->select('ut_management_brokers.*')
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

        return inertia::render('management/brokers/create',[
            'title'=>'Broker',
            'sub_title' => 'Add'
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
            'name' => ['required'],
        ]);


        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        Brokers::create($data);
        return redirect()->route('management.brokers.'.$end_point)->with('type_alert', 'success')->with('msg','Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brokers  $brokers
     * @return \Illuminate\Http\Response
     */
    public function show(Brokers $brokers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Brokers  $brokers
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Brokers::findOrFail($id);

        return inertia::render('management/brokers/edit',[
            'title'=>'Broker',
            'sub_title'=>'Edit',
            'record_data' => $record_data,
            'logs' => $this->get_logs($record_data),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Brokers  $brokers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'name' => ['required']
        ]);

        $input = $request->all();
        $query = Brokers::find($id);
        $query->update($input);

        return redirect()->route('management.brokers.index')->with('type_alert', 'success')->with('msg','Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Brokers  $Brokers
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Brokers::findOrFail($id)->delete();
        return redirect()->route('management.brokers.index')->with('type_alert', 'success')->with('msg','Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Brokers::findOrFail($id)->delete();
        }
        return redirect()->route('doubling.outwards.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Brokers::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('management.brokers.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Brokers::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('management.brokers.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }




}
