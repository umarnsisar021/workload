<?php

namespace App\Http\Controllers;

use App\Models\GlobalSettings;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use App\Models\Modules;
use App\Models\ModulePermission;
use App\Models\ModuleOptions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /* GET PERMISSION ARRAY */
        public function getPermissions($route){

            //check super admin
            if (Auth::user()->role_id == 1) {
                return $optionArray = ["view","create","update","delete"];
            }

            $optionArray = [];
            $module = Modules::where('slug',$route)->first();
            $permission = ModulePermission::where('module_id',$module->id)
            ->where('role_id',Auth::user()->role_id)
            ->get();
            foreach($permission as $row){
                $moduleKey = ModuleOptions::select('key')->where('id',$row->module_option_id)->get();
                array_push($optionArray,$moduleKey[0]['key']);
            }
            return $optionArray;
        }
    /* GET PERMISSION ARRAY */



    public function get_logs($record_data){
        $logs = [];
        if ($record_data) {
            $created_by = User::where('id',$record_data->created_by)->select(DB::raw("CONCAT(first_name,' ',last_name) AS name"))->first();
            $updated_by = User::where('id',$record_data->updated_by)->select(DB::raw("CONCAT(first_name,' ',last_name) AS name"))->first();
            $logs['created_at'] = date('Y-m-d h:i a',strtotime($record_data->created_at));
            $logs['updated_at'] = date('Y-m-d h:i a',strtotime($record_data->updated_at));
            $logs['created_by'] = isset($created_by->name)?$created_by->name:'';
            $logs['updated_by'] = isset($updated_by->name)?$updated_by->name:'';
        }
        return $logs;
    }

}
