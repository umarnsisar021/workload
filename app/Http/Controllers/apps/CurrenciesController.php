<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

use App\Models\currencies;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class CurrenciesController extends Controller
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

        return inertia::render('apps/currency/index',[
            'title'=>'Currency',
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
        $records = currencies::orderBy('id', 'desc');
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



    public function trash_index ()
    {

        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('apps/currency/index',[
            'title'=>'Currency',
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
        return inertia::render('apps/currency/create',[
            'title'=>'Currency',
            'sub_title' => 'Add',
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

        currencies::create($request->all());

        return redirect()->route('currencies.index')->with('type_alert', 'success')->with('msg','Record Added!');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\currencies  $currencies
     * @return \Illuminate\Http\Response
     */
    public function show(currencies $currencies)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\currencies  $currencies
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $currencies = currencies::findOrFail($id);

        return inertia::render('apps/currency/edit',[
            'title'=>'Currency',
            'sub_title'=>'Edit',
            'currency_data' => $currencies,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\currencies  $currencies
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        currencies::find($id)->update($request->all());

        return redirect()->route('currencies.index')->with('type_alert', 'success')->with('msg','Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\currencies  $currencies
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        currencies::findOrFail($id)->delete();
        return redirect()->route('currencies.index')->with('type_alert', 'success')->with('msg','Record Delete!');
    }




    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            currencies::findOrFail($id)->delete();
        }
        return redirect()->route('currencies.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            currencies::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('currencies.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            currencies::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('currencies.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }



}
