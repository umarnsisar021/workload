<?php

namespace App\Http\Controllers\catalogs;
use App\Http\Controllers\Controller;

use App\Models\catalogs\Products;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class ProductsController extends Controller
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
        return inertia::render('catalogs/products/index',[
            'title'=>'Products',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted'=>0,

        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('catalogs/products/index',[
            'title'=>'Product',
            'sub_title'=>'Trash',
            'getPermission' => $optionArray,
            'deleted'=>1,
        ]);
    }


    public function records_data()
    {
        $per_page=request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['ut_catalogs_products.id','ut_catalogs_products.name','parent_cat_product.name'];
        $records = Products::orderBy('ut_catalogs_products.id','asc');
        $records->orderBy('ut_catalogs_products.id','asc');
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

        $records = $records->select('ut_catalogs_products.*','parent_cat_product.name as parent_product_name')
            ->leftJoin('ut_catalogs_products as parent_cat_product', 'parent_cat_product.id', '=', 'ut_catalogs_products.parent_id')
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
        $parents_options=Products::where('parent_id',0)->select('id as value','name as label')->get();
        return inertia::render('catalogs/products/create',[
            'title'=>'Product',
            'sub_title' => 'Add',
            'parents_options'=>$parents_options
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
            'name' => ['required']
        ]);

        $data = $request->all();
        $_action=$data['_action'];
        unset($data['_action']);
        $end_point='index';
        if($_action==2){
            $end_point='create';
        }
        Products::create($data);

        return redirect()->route('catalogs.products.'.$end_point)->with('type_alert', 'success')->with('msg','Record Added!');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(Products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $record_data = Products::findOrFail($id);
        $parents_options=Products::where('parent_id',0)->where('id','!=',$id)->select('id as value','name as label')->get();

        return inertia::render('catalogs/products/edit',[
            'title'=>'Product',
            'sub_title'=>'Edit',
            'record_data' => $record_data,
            'parents_options'=>$parents_options,
            'logs' => $this->get_logs($record_data),

        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'name' => ['required']
        ]);

        $input = $request->all();
        $query = Products::find($id);
        $query->update($input);

        return redirect()->route('catalogs.products.index')->with('type_alert', 'success')->with('msg','Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $Products
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Products::findOrFail($id)->delete();
        return redirect()->route('catalogs.products.index')->with('type_alert', 'success')->with('msg','Record Delete!');
    }


    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Products::findOrFail($id)->delete();
        }
        return redirect()->route('catalogs.products.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Products::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('catalogs.products.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Products::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('catalogs.products.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }



}
