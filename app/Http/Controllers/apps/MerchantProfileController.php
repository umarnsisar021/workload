<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

use App\Models\merchantProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class MerchantProfileController extends Controller
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

        $data = merchantProfile::first();
        return Inertia::render('apps/merchantProfile/index',[
            'data' => $data,
            'img_url'=> url('logos'),
            'title' => 'Merchant Profile',
            'sub_title' => 'Edit',
            'getPermission' => $optionArray,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\merchantProfile  $merchantProfile
     * @return \Illuminate\Http\Response
     */
    public function show(merchantProfile $merchantProfile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\merchantProfile  $merchantProfile
     * @return \Illuminate\Http\Response
     */
    public function edit(merchantProfile $merchantProfile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\merchantProfile  $merchantProfile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {

        if($request->hasFile('logo')){
            $this->validate($request,[
                'logo'=>'mimes:jpg,jpeg,png',
            ]);
        }

        if($request->hasFile('logo2')){
            $this->validate($request,[
                'logo2'=>'mimes:jpg,jpeg,png',
            ]);
        }

        if($request->hasFile('favicon')){
            $this->validate($request,[
                'favicon'=>'mimes:jpg,jpeg,png',
            ]);
        }

        $input = $request->all();
        // unset($input['logo']);
        // unset($input['logo2']);
        // unset($input['favicon']);

        if($request->hasFile('logo')){
            $originalName = $request->logo->getClientOriginalName();
            $request->logo->move(public_path().'/logos',$originalName) . ',';
            $input['logo'] = $originalName;
        }

        if($request->hasFile('logo2')){
            $reportLogoName = $request->logo2->getClientOriginalName();
            $request->logo2->move(public_path().'/logos',$reportLogoName) . ',';
            $input['logo2'] = $reportLogoName;
        }

        if($request->hasFile('favicon')){
            $faviconName = $request->favicon->getClientOriginalName();
            $request->favicon->move(public_path().'/logos',$faviconName) . ',';
            $input['favicon'] = $faviconName;
        }

        merchantProfile::find($id)->update($input);
        return redirect()->route('merchant_profile.index')->with('type_alert', 'success')->with('msg','Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\merchantProfile  $merchantProfile
     * @return \Illuminate\Http\Response
     */
    public function destroy(merchantProfile $merchantProfile)
    {
        //
    }
}
