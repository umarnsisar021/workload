<?php

namespace App\Models\commerce;

use App\Models\doubling\Inwards;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\management\Suppliers;
use Illuminate\Support\Facades\Auth;

class PurchaseOrders extends Model
{
    protected $table = 'ut_commerce_purchase_orders';
    use HasFactory, SoftDeletes;
    protected $guarded = [];


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
