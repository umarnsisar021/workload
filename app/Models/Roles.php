<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Modules;
use DB;
use Illuminate\Support\Facades\Auth;

class Roles extends Model
{
    use HasFactory,SoftDeletes;
    protected $connection = "tenant";
    protected $guarded = [];
    protected $dates = ['deleted_at'];

    public static function checkPermission($slug, $OptionsKey, $role_id)
    {
            $modules = Modules::select('modules.*')
        ->join('modules_options', 'modules.id', '=', 'modules_options.module_id')
        ->join('modules_options_permissions', 'modules_options.id', '=', 'modules_options_permissions.module_option_id')
        ->where('modules.slug', '=', $slug)
        ->where('modules_options.key', '=', $OptionsKey)
        ->where('modules_options_permissions.role_id', '=', $role_id)
        ->get();

        if ($modules->isEmpty()) {
            return false;
        }else{
            return true;
        }
    }


    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            $model->created_by = is_object(Auth::guard(config('app.guards.web'))->user()) ? Auth::guard(config('app.guards.web'))->user()->id : 1;
            $model->updated_by = NULL;
        });

        static::updating(function ($model) {
            $model->updated_by = is_object(Auth::guard(config('app.guards.web'))->user()) ? Auth::guard(config('app.guards.web'))->user()->id : 1;
        });
    }
}
