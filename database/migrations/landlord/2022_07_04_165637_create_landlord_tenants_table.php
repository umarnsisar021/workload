<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLandlordTenantsTable extends Migration
{
    public function up()
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable();
            $table->string('username')->nullable();
            $table->string('name')->nullable();
            $table->string('domain')->unique();
            $table->string('database')->unique();
            $table->string('email')->unique();
            $table->string('password')->unique();


            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('personal_email')->nullable();
            $table->string('mobile_no')->nullable();
            $table->string('address')->nullable();
            $table->integer('role_id')->unsigned()->nullable()->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->softDeletes();
            $table->timestamps();
        });
    }
}
