<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Roles;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\GlobalSettings;


class UsersController extends Controller
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

        return inertia::render('apps/users/index',[
            'create_url' => route('users.create'),
            'title'=>'Users',
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

        $display_columns = ['first_name','last_name'];
        $records = User::orderBy('id', 'desc');
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
        return inertia::render('apps/users/index',[
            'create_url' => route('users.create'),
            'title'=>'Users',
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
        $store_url = route('users.store');
        $roles = Roles::all();


        return inertia::render('apps/users/create',[
            'title'=>'Users',
            'sub_title'=>'Add',
            'store_url'=>$store_url,
            'roles_data'=>$roles,
            'list_url' => route('users.index'),

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
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required','email','unique:users'],
            'mobile_no' => ['required'],
            'password' => ['required','min:5'],
            // 'role' => ['required'],
            'address' => ['required'],
        ]);

        User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'personal_email' => $request->personal_email,
                'email' => $request->email,
                'mobile_no' => $request->mobile_no,
                'password' => Hash::make($request->password),
                'address' => $request->address,
                'role_id' => $request->role_id,
        ]);
        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::first()->findOrFail($id);
        $roles = Roles::all();

        return inertia::render('apps/users/edit',[
            'title'=>'Users',
            'sub_title'=>'Edit',
            'user_data' => $user,
            'roles_data' => $roles,
            ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $this->validate($request,[
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required','email','unique:users,email,'.$id.',id'],
            'mobile_no' => ['required'],
            'address' => ['required'],
        ]);

        $request->merge(['password'=>Hash::make($request->password)]);
        User::find($id)->update($request->all());
        return redirect()->route('users.index')->with('type_alert', 'success')->with('msg','Record Updated!');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return redirect()->route('users.index')->with('type_alert', 'success')->with('msg','Record Delete!');
    }

    /* CUSTOM FUNCTION FOR TRASH RECORDS */





    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            User::findOrFail($id)->delete();
        }
        return redirect()->route('users.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            User::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('users.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            User::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('users.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }


}
