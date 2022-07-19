<?php

namespace App\Http\Controllers\commerce;
use App\Helpers\Helper;
use App\Http\Controllers\Controller;

use App\Models\catalogs\Brands;
use App\Models\catalogs\Counts;
use App\Models\commerce\UnassignedPurchases;

use App\Models\management\Brokers;
use App\Models\management\Suppliers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class UnassignedPurchasesController extends Controller
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
        return inertia::render('commerce/unassigned_purchases/index',[
            'title'=>'Unassigned Purchases',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted'=>0,
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('commerce/unassigned_purchases/index',[
            'title'=>'Unassigned Purchase',
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

        $display_columns = ['ut_commerce_unassigned_purchases.invoice_date','brands.name','counts.name','brokers.name','suppliers.first_name', 'suppliers.last_name'];
        $records = UnassignedPurchases::orderBy('ut_commerce_unassigned_purchases.id','desc');

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
            ->select('ut_commerce_unassigned_purchases.*',
                DB::raw("CONCAT(suppliers.first_name,' ',suppliers.last_name) AS supplier_name"),
                'brands.name as brand_name',
                'counts.name as count_name',
                'brokers.name as broker_name'
                )
            ->leftjoin('ut_management_suppliers as suppliers','suppliers.id','ut_commerce_unassigned_purchases.supplier_id')
            ->leftjoin('ut_catalogs_brands as brands','brands.id','ut_commerce_unassigned_purchases.brand_id')
            ->leftjoin('ut_catalogs_counts as counts','counts.id','ut_commerce_unassigned_purchases.count_id')
            ->leftjoin('ut_management_brokers as brokers','brokers.id','ut_commerce_unassigned_purchases.broker_id')
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
        $suppliers=Suppliers::where('status',1)->get();
        $brands=Brands::where('status',1)->get();
        $counts=Counts::where('status',1)->get();
        $brokers=Brokers::where('status',1)->get();

        return inertia::render('commerce/unassigned_purchases/create',[
            'title'=>'Unassigned Purchase',
            'sub_title' => 'Add',
            'suppliers'=>$suppliers,
            'brands'=>$brands,
            'counts'=>$counts,
            'brokers'=>$brokers,
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
        $request['ag_no']=Helper::generate_v_no("UP",1);
        $this->validate($request,[
            'ag_no' => ['required','unique:ut_commerce_unassigned_purchases,ag_no'],
            'invoice_date' => ['required'],
            'supplier_id' => ['required'],
            'brand_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
        ]);


        $data=$request->all();
        UnassignedPurchases::create($data);
        return redirect()->route('commerce.unassigned_purchases.index')->with('type_alert', 'success')->with('msg','Record Added!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UnassignedPurchases  $unassigned_purchase
     * @return \Illuminate\Http\Response
     */
    public function show(UnassignedPurchases $unassigned_purchase)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UnassignedPurchases  $unassigned_purchase
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $unassigned_purchase = UnassignedPurchases::findOrFail($id);


        $suppliers=Suppliers::where('status',1)->get();
        $brands=Brands::where('status',1)->get();
        $counts=Counts::where('status',1)->get();
        $brokers=Brokers::where('status',1)->get();




        return inertia::render('commerce/unassigned_purchases/edit',[
            'title'=>'Unassigned Purchase',
            'sub_title'=>'Edit',
            'record_data' => $unassigned_purchase,
            'suppliers'=>$suppliers,
            'brands'=>$brands,
            'counts'=>$counts,
            'brokers'=>$brokers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UnassignedPurchases  $unassigned_purchase
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'invoice_date' => ['required'],
            'supplier_id' => ['required'],
            'brand_id' => ['required'],
            'count_id' => ['required'],
            'qty' => ['required'],
            'rate' => ['required'],
        ]);

        UnassignedPurchases::find($id)->update($request->all());
        return redirect()->route('commerce.unassigned_purchases.index')->with('type_alert', 'success')->with('msg','Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UnassignedPurchases  $UnassignedPurchases
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        UnassignedPurchases::findOrFail($id)->delete();
        return redirect()->route('commerce.unassigned_purchases.index')->with('type_alert', 'success')->with('msg','Record Delete!');
    }


    public function restore($id)
    {
        UnassignedPurchases::withTrashed()
        ->findOrFail($id)
        ->restore();
        return redirect()->route('commerce.unassigned_purchases.index')->with('type_alert', 'success')->with('msg','Record Restore!');
    }





}
