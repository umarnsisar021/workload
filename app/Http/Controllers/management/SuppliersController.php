<?php

namespace App\Http\Controllers\management;

use App\Http\Controllers\Controller;

use App\Models\locations\Countries;
use App\Models\management\Suppliers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class SuppliersController extends Controller
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
        return inertia::render('management/suppliers/index', [
            'title' => 'Suppliers',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('management/suppliers/index', [
            'title' => 'Supplier',
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
            DB::raw("CONCAT(ut_management_suppliers.first_name, ' ',ut_management_suppliers.last_name)"),
            'ut_management_suppliers.id'
        ];
        $records = Suppliers::orderBy('ut_management_suppliers.id', 'desc');
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
        $records = $records->select('ut_management_suppliers.*')
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
        $countries_options = Countries::where('status', 1)->orderBy('name', 'asc')->select('id as value','name as label')->get();

        return inertia::render('management/suppliers/create', [
            'title' => 'Supplier',
            'sub_title' => 'Add',
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
        $rules=[
            'first_name' => ['required'],
            'last_name' => ['required'],
            'company_name' => ['required'],
        ];

        if(!empty($request->telephone)){
            $rules['telephone']=['min:11|numeric'];
        }

        if(!empty($request->primary_email)){
            $rules['primary_email']=['email:rfc,dns'];
        }

        if(!empty($request->url)){
            $rules['url']=['url'];
        }

        $this->validate($request, $rules);


        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        Suppliers::create($data);
        return redirect()->route('management.suppliers.'.$end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Suppliers $suppliers
     * @return \Illuminate\Http\Response
     */
    public function show(Suppliers $suppliers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Suppliers $suppliers
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Suppliers::findOrFail($id);
        $countries_options = Countries::where('status', 1)->orderBy('name', 'asc')->select('id as value','name as label')->get();


        return inertia::render('management/suppliers/edit', [
            'title' => 'Supplier',
            'sub_title' => 'Edit',
            'record_data' => $record_data,
            'countries_options' => $countries_options,
            'logs' => $this->get_logs($record_data),

        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Suppliers $suppliers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $rules=[
            'first_name' => ['required'],
            'last_name' => ['required'],
            'company_name' => ['required'],
        ];

        if(!empty($request->telephone)){
            $rules['telephone']=['min:11|numeric'];
        }

        if(!empty($request->primary_email)){
            $rules['primary_email']=['email:rfc,dns'];
        }

        if(!empty($request->url)){
            $rules['url']=['url'];
        }

        $this->validate($request, $rules);

        $input = $request->all();
        $query = Suppliers::find($id);
        $query->update($input);

        return redirect()->route('management.suppliers.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Suppliers $Suppliers
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Suppliers::findOrFail($id)->delete();
        return redirect()->route('management.suppliers.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Suppliers::findOrFail($id)->delete();
        }
        return redirect()->route('management.suppliers.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Suppliers::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('management.suppliers.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Suppliers::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('management.suppliers.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }
}
