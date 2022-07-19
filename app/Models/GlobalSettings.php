<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes;

class GlobalSettings extends Model
{
    use HasFactory,softDeletes;
    protected $connection = "tenant";
    protected $guarded = [];



    public static function getGlobalSetting($key){
        $global_settings= self::where('value_key',$key)->select('value')->first();
        if(isset($global_settings->value)){
            return $global_settings->value;
        }
        return '';
    }

    public static function setGlobalSetting($key,$value){
        $global_settings= self::where('value_key',$key)->update(['value'=>$value]);
        if($global_settings){
            return true;
        }
        return false;
    }
}
