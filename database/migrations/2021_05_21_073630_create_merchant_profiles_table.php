<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMerchantProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merchant_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('short_name')->nullable();
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('town_city')->nullable();
            $table->string('county_state')->nullable();
            $table->string('postcode_zip')->nullable();
            $table->string('country')->nullable();
            $table->string('telephone')->nullable();
            $table->string('fax')->nullable();
            $table->string('sms_no')->nullable();
            $table->string('primary_email')->nullable();
            $table->string('secondary_email')->nullable();
            $table->string('web')->nullable();
            $table->text('map_embed')->nullable();
            $table->string('ntn_no')->nullable();
            $table->string('strn_no')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('mobile_no')->nullable();
            $table->string('personal_email')->nullable();
            $table->string('sales_email')->nullable();
            $table->string('inquiry_email')->nullable();
            $table->string('support_email')->nullable();
            $table->string('super_admin_email')->nullable();
            $table->string('webmaster_email')->nullable();
            $table->string('backup_email_primary')->nullable();
            $table->string('backup_email_secondary')->nullable();
            $table->string('skype')->nullable();
            $table->string('gtalk')->nullable();
            $table->string('msn')->nullable();
            $table->string('yahoo')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('tumbler')->nullable();
            $table->string('pinterest')->nullable();
            $table->string('instagram')->nullable();
            $table->string('imo')->nullable();
            $table->string('youtube')->nullable();
            $table->string('gplus')->nullable();
            $table->string('wechat')->nullable();
            $table->string('logo')->nullable();
            $table->string('logo2')->nullable();
            $table->string('slogan')->nullable();
            $table->string('favicon')->nullable();
            $table->string('service_provider')->nullable();
            $table->string('business_type')->nullable();
            $table->timestamps();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merchant_profiles');
    }
}
