<?php

namespace App\Http\Controllers\catalogs;

use App\Http\Controllers\Controller;

use App\Models\catalogs\Brands;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class BrandsController extends Controller
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
        return inertia::render('catalogs/brands/index', [
            'title' => 'Brands',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('catalogs/brands/index', [
            'title' => 'Brand',
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


        $display_columns = ['id','name'];
        $records = Brands::orderBy('id', 'asc');
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
        $records = $records
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
        return inertia::render('catalogs/brands/create', [
            'title' => 'Brand',
            'sub_title' => 'Add',
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
            'name' => ['required'],
        ]);


        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        Brands::create($data);

        return redirect()->route('catalogs.brands.'.$end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brands $brands
     * @return \Illuminate\Http\Response
     */
    public function show(Brands $brands)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Brands $brands
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Brands::findOrFail($id);

        return inertia::render('catalogs/brands/edit', [
            'title' => 'Brand',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'logs' => $this->get_logs($record_data),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Brands $brands
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $query = Brands::find($id);
        $query->update($input);

        return redirect()->route('catalogs.brands.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Brands $Brands
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Brands::findOrFail($id)->delete();
        return redirect()->route('catalogs.brands.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Brands::findOrFail($id)->delete();
        }
        return redirect()->route('catalogs.brands.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Brands::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('catalogs.brands.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Brands::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('catalogs.brands.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }
}
