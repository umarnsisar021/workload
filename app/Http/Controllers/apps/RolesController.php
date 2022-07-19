<?php

namespace App\Http\Controllers\apps;

use App\Http\Controllers\Controller;

use App\Models\Roles;

use App\Models\ModulePermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class RolesController extends Controller
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

        return inertia::render('apps/roles/index', [
            'create_url' => route('roles.create'),
            'title' => 'Roles',
            'sub_title' => 'List',
            'getPermission' => $optionArray,
            'deleted'=>0
        ]);
    }

    public function trash_index()
    {
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        return inertia::render('apps/roles/index', [
            'create_url' => route('roles.create'),
            'title' => 'Roles',
            'sub_title' => 'Trash',
            'getPermission' => $optionArray,
            'deleted'=>1
        ]);
    }


    public function records_data()
    {


        $per_page=request('per_page');
        $search = request('search');
        $deleted = request('deleted');

        $display_columns = ['name'];
        $records = Roles::orderBy('id', 'desc');
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
        $store_url = route('roles.store');
        return inertia::render('apps/roles/create', [
            'title' => 'Roles',
            'sub_title' => 'Add',
            'store_url' => $store_url,
            'list_url' => route('roles.index'),
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
            'description' => ['required'],
        ]);

        $id = Roles::create([
            'name' => $request->name,
            'description' => $request->description,
        ])->id;

        return redirect()->route('roles.edit', $id)->with('type_alert', 'success')->with('msg', 'Record added successfully! Please select role permissions.');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Roles $roles
     * @return \Illuminate\Http\Response
     */
    public function show(Roles $roles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Roles $roles
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $role = Roles::findOrFail($id);

        $ParentModules = array();
        $ChildModules = array();

        // get all modules
        $modules = DB::table('modules')->get();
        $modulesArray = json_decode(json_encode($modules), true); //converting to array

        // add options for each module
        foreach ($modulesArray as $key => $module) {
            $ModuleOptions = DB::table('modules_options')->where('module_id', $module['id'])->get();
            $ModuleOptions = json_decode(json_encode($ModuleOptions), true); //converting to array

            //check options permissions for the role
            foreach ($ModuleOptions as $mo_key => $ModuleOption) {
                $isCheck = DB::table('modules_options_permissions')->where('module_id', $module['id'])->where('module_option_id', $ModuleOption['id'])->where('role_id', $id)->get();
                $ModuleOptions[$mo_key]['isChecked'] = $isCheck->isEmpty() ? false : true;
            }

            // add options to particular module
            $modulesArray[$key]["options"] = $ModuleOptions;

            //separate parent/child modules
            if ($modulesArray[$key]["parent_id"] == 0) {
                array_push($ParentModules, $modulesArray[$key]);
            } else {
                array_push($ChildModules, $modulesArray[$key]);
            }
        }

        foreach ($ParentModules as $pm_key => $ParentModule) {
            $childs = array();
            foreach ($ChildModules as $cm_key => $ChildModule) {
                if ($ParentModule['id'] == $ChildModule['parent_id']) {

                    if(!isset($ChildModule['sub_childs'])){
                        $ChildModule['sub_childs']=array();
                    }
                    foreach ($ChildModules as $cm_key_sub => $ChildModule_sub) {
                        if ($ChildModule['id'] == $ChildModule_sub['parent_id']) {
                            $ChildModule['sub_childs'][]=$ChildModule_sub;
                        }
                    }
                    array_push($childs, $ChildModule);
                }
            }
            $ParentModules[$pm_key]['childs'] = $childs;
        }

        $ModulesWithChilds = $ParentModules;

        return inertia::render('apps/roles/edit', [
            'title' => 'Roles',
            'sub_title' => 'Edit',
            'id' => $role->id,
            'name' => $role->name,
            'description' => $role->description,
            'modules' => $ModulesWithChilds,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Roles $roles
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => ['required'],
            'description' => ['required'],
        ]);

        Roles::find($id)->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        /* Delete all permissions for the role */
        ModulePermission::where('role_id', $id)->delete();

        $options = $request->all();
        array_shift($options); //unset _method
        array_shift($options); //unset name
        array_shift($options);  //unset description

        foreach ($options as $key => $isCheck) {
            /* Seprate Option_Id and Module_id */
            $option_and_module_id = explode("-", $key);

            if ($isCheck) {
                ModulePermission::updateOrCreate([
                    'module_option_id' => $option_and_module_id[0],
                    'module_id' => $option_and_module_id[1],
                    'role_id' => $id,
                ]);
            }
        };

        // return redirect()->route('roles.edit', $id)->with('type_alert', 'success')->with('msg', 'Record updated successfully!');
        return redirect()->route('roles.index')->with('type_alert', 'success')->with('msg', 'Record updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Roles $roles
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Roles::find($id)->delete();
        return redirect()->route('roles.index')->with('type_alert', 'success')->with('msg', 'Record deleted!');
    }




    public function multi_delete(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Roles::findOrFail($id)->delete();
        }
        return redirect()->route('roles.index')->with('type_alert', 'success')->with('msg', 'Record Delete!');
    }

    public function multi_restore(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Roles::withTrashed()->findOrFail($id)->restore();
        }
        return redirect()->route('roles.index')->with('type_alert', 'success')->with('msg', 'Record Restore!');
    }

    public function multi_purge(Request $request)
    {
        $ids= $request->ids;
        foreach ($ids as $id) {
            Roles::withTrashed()->findOrFail($id)->forceDelete();
        }
        return redirect()->route('roles.index')->with('type_alert', 'success')->with('msg', 'Record Purge!');
    }

}
