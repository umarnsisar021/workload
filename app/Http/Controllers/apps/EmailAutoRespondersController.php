<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

use App\Models\EmailAutoResponders;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class EmailAutoRespondersController extends Controller
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


        return inertia::render('apps/emailAutoResponder/index',[
            'title'=>'Email Auto Responder',
            'sub_title'=>'List',
            'getPermission' => $optionArray,
            'deleted'=>0,
        ]);

    }


    public function records_data()
    {

        $per_page=request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['responder_name','from_email','from_name'];
        $records = EmailAutoResponders::orderBy('id', 'desc');
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


    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);


        return inertia::render('apps/emailAutoResponder/index',[
            'title'=>'Email Auto Responder',
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
     * @param  \App\Models\EmailAutoResponders  $emailAutoResponders
     * @return \Illuminate\Http\Response
     */
    public function show(EmailAutoResponders $emailAutoResponders)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\EmailAutoResponders  $emailAutoResponders
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $data = EmailAutoResponders::findOrFail($id);
        /* $data1 = array("Name : [name]","Email/Username : [username]","Activation Link: [activation_link]");
        print_r($data1);
        die; */

        return inertia::render('apps/emailAutoResponder/edit',[
            'title'=>'Email Auto Responder',
            'sub_title'=>'Edit',
            '_method' => 'PUT',
            'id'=> $data->id,
            'responder_name' => $data->responder_name,
            'from_email' => $data->from_email,
            'from_name' => $data->from_name,
            'subject' => $data->subject,
            'message' => $data->message,
            'add_signature' => $data->add_signature,
            'status' => $data->status,
            'variables' => $data->variables,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EmailAutoResponders  $emailAutoResponders
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EmailAutoResponders $emailAutoResponders)
    {
        EmailAutoResponders::find($request->id)->update($request->all());

        return redirect()->route('email_responder.index')->with('type_alert','success')->with('msg','Record Updated !');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EmailAutoResponders  $emailAutoResponders
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        EmailAutoResponders::findOrFail($id)->delete();
        return redirect()->route('email_responder.index')->with('type_alert','success')->with('msg','Record Delete !');

    }



    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            EmailAutoResponders::findOrFail($id)->delete();
        }
        return redirect()->route('email_responder.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            EmailAutoResponders::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('email_responder.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            EmailAutoResponders::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('email_responder.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }


}
