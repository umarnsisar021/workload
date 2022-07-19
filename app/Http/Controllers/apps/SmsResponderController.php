<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

use App\Models\SmsResponder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class SmsResponderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        /* GET PERMISSION OF THIS MODULES */
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        /* GET PERMISSION OF THIS MODULES */

        return inertia::render('apps/smsResponder/index',[
            'title'=>'SMS Auto Responder',
            'sub_title'=>'List',
            'getPermission' => $optionArray,
            'deleted'=>0,
        ]);
    }


    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);


        return inertia::render('apps/smsResponder/index',[
            'title'=>'SMS Auto Responder',
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

        $display_columns = ['responder_name'];
        $records = SmsResponder::orderBy('id', 'desc');
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
     * @param  \App\Models\SmsResponder  $smsResponder
     * @return \Illuminate\Http\Response
     */
    public function show(SmsResponder $smsResponder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SmsResponder  $smsResponder
     * @return \Illuminate\Http\Response
     */
    public function edit(SmsResponder $smsResponder)
    {
        return inertia::render('apps/smsResponder/edit',[
            'title'=>'SMS Auto Responder',
            'sub_title'=>'Edit',
            '_method' => 'PUT',
            'id'=> $smsResponder->id,
            'responder_name' => $smsResponder->responder_name,
            'message' => $smsResponder->message,
            'add_signature' => $smsResponder->add_signature,
            'status' => $smsResponder->status,
            'variables' => $smsResponder->variables,
        ]);

        // json_encode($smsResponder->variables,JSON_FORCE_OBJECT)

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SmsResponder  $smsResponder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SmsResponder $smsResponder)
    {
        SmsResponder::find($request->id)->update([
            'responder_name' => $request->responder_name,
            'message' => $request->message,
            'add_signature' => $request->add_signature,
            'status' => $request->status,
        ]);


        return redirect()->route('sms_responders.index')->with('type_alert', 'success')->with('msg','Record Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SmsResponder  $smsResponder
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        SmsResponder::findOrFail($id)->delete();
        return redirect()->route('sms_responders.index')->with('type_alert','success')->with('msg','Record Delete !');
    }


    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            SmsResponder::findOrFail($id)->delete();
        }
        return redirect()->route('sms_responders.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            SmsResponder::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('sms_responders.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            SmsResponder::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('sms_responders.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }

}
