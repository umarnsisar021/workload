<?php

namespace App\Http\Controllers\management;

use App\Http\Controllers\Controller;

use App\Models\locations\Countries;
use App\Models\management\Customers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class CustomersController extends Controller
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
        return inertia::render('management/customers/index', [
            'title' => 'Customers',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted' => 0,
        ]);
    }


    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('management/customers/index', [
            'title' => 'Customer',
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
            'ut_management_customers.company_name',
            DB::raw("CONCAT(ut_management_customers.first_name, ' ',ut_management_customers.last_name)"),
            'ut_management_customers.id'
        ];
        $records = Customers::orderBy('ut_management_customers.id', 'desc');
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
        $records = $records->select('ut_management_customers.*')
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

        return inertia::render('management/customers/create', [
            'title' => 'Customer',
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
        Customers::create($data);
        return redirect()->route('management.customers.'.$end_point)->with('type_alert', 'success')->with('msg', 'Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customers $customers
     * @return \Illuminate\Http\Response
     */
    public function show(Customers $customers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customers $customers
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Customers::findOrFail($id);
        $countries_options = Countries::where('status', 1)->orderBy('name', 'asc')->select('id as value','name as label')->get();

        return inertia::render('management/customers/edit', [
            'title' => 'Customer',
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
     * @param  \App\Models\Customers $customers
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
        $query = Customers::find($id);
        $query->update($input);

        return redirect()->route('management.customers.index')->with('type_alert', 'success')->with('msg', 'Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customers $Customers
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Customers::findOrFail($id)->delete();
        return redirect()->route('management.customers.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }


    public function restore($id)
    {
        Customers::withTrashed()
            ->findOrFail($id)
            ->restore();

        return redirect()->route('management.customers.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }


    public function multi_delete(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            Customers::findOrFail($id)->delete();
        }
        return redirect()->route('management.customers.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            Customers::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('management.customers.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            Customers::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('management.customers.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }
}
