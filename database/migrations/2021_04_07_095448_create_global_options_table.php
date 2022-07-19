<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGlobalOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('global_options', function (Blueprint $table) {
            $table->id();
            $table->string('refund_policy')->nullable();
            $table->tinyInteger('enable_https')->default(true);
            $table->tinyInteger('enable_cookies')->default(true);
            $table->tinyInteger('disable_user_logins')->default(false);
            $table->tinyInteger('disable_admin_logins')->default(false);
            $table->tinyInteger('login_auditing')->default(true);
            $table->tinyInteger('logo_on_invoice')->default(true);
            $table->tinyInteger('desc_on_invoice')->default(false);
            $table->text('invoice_header')->nullable();
            $table->text('invoice_footer')->nullable();
            $table->text('black_listed_ips')->nullable();
            $table->tinyInteger('show_islamic_date')->default(false);
            $table->integer('no_of_items_per_page')->default(100);
            $table->integer('no_of_items_per_page2')->default(12);
            $table->char('timezone')->default('Asia/Karachi');
            
            $table->string('sms_api')->nullable();
            $table->string('sms_api_countrycode')->nullable();
            $table->string('sms_api_username')->nullable();
            $table->string('sms_api_password')->nullable();
            $table->string('sms_api_mask')->nullable();
            
            $table->string('google_map_api')->nullable();
            $table->string('gdrive_client_id')->nullable();
            $table->string('gdrive_client_secret')->nullable();
            $table->string('google_analytics')->nullable();
            $table->tinyInteger('track_location')->default(false);
            
            $table->text('sharethis_code')->nullable();
            $table->tinyInteger('sharethis_active')->default(false);
            $table->text('tawkto_code')->nullable();
            $table->tinyInteger('tawkto_active')->default(false);
            $table->text('mailchimp_code')->nullable();
            
            $table->string('social_google_key')->nullable();
            $table->string('social_google_secret')->nullable();
            
            $table->text('signature_email')->nullable();
            $table->string('signature_sms')->nullable();

            $table->string('email_protocol')->nullable();
            $table->string('email_smtp_host')->nullable();
            $table->string('email_smtp_port')->nullable();
            $table->string('email_smtp_user')->nullable();
            $table->string('email_smtp_password')->nullable();

            $table->text('head_scripts')->nullable();
            $table->text('body_scripts')->nullable();

            $table->string('website_status')->default('Live');
            $table->text('site_down_message')->nullable();
            $table->string('site_down_url')->nullable();
            $table->text('exclude_ip')->nullable();
            $table->string('last_offline')->nullable();
            $table->string('last_online')->nullable();
            
            $table->text('system_message_1')->nullable();
            $table->text('system_message_2')->nullable();
            $table->text('system_message_3')->nullable();
            $table->text('system_message_4')->nullable();
            $table->text('system_message_5')->nullable();
            $table->text('system_message_6')->nullable();
            
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
        Schema::dropIfExists('global_options');
    }
}
