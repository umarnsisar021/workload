<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class GlobalSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('global_settings')->truncate();
        $this->common();
        $this->project();
    }


    public function common()
    {
        DB::table('global_settings')->insert([
            ['value_key' => 'black_listed_ips', 'value' => '192.168.11', 'system_default' => 1],
            ['value_key' => 'enable_https', 'value' => '1', 'system_default' => 1],
            ['value_key' => 'enable_cookies', 'value' => '1', 'system_default' => 1],
            ['value_key' => 'disable_user_logins', 'value' => '0', 'system_default' => 1],
            ['value_key' => 'disable_admin_logins', 'value' => '0', 'system_default' => 1],
            ['value_key' => 'login_auditing', 'value' => '1', 'system_default' => 1],
            ['value_key' => 'no_of_items_per_page', 'value' => '20', 'system_default' => 1],
            ['value_key' => 'no_of_items_per_page2', 'value' => '15', 'system_default' => 1],
            ['value_key' => 'timezone', 'value' => 'Asia/Karachi', 'system_default' => 1],
            ['value_key' => 'show_islamic_date', 'value' => '1', 'system_default' => 1],
            ['value_key' => 'sms_api_countrycode', 'value' => '+93', 'system_default' => 1],
            ['value_key' => 'sms_api', 'value' => '', 'system_default' => 1],
            ['value_key' => 'sms_api_username', 'value' => 'elenor411@example.com', 'system_default' => 1],
            ['value_key' => 'sms_api_password', 'value' => '1234', 'system_default' => 1],
            ['value_key' => 'sms_api_mask', 'value' => '', 'system_default' => 1],
            ['value_key' => 'google_map_api', 'value' => '', 'system_default' => 1],
            ['value_key' => 'gdrive_client_id', 'value' => '', 'system_default' => 1],
            ['value_key' => 'gdrive_client_secret', 'value' => '', 'system_default' => 1],
            ['value_key' => 'google_analytics', 'value' => '', 'system_default' => 1],
            ['value_key' => 'track_location', 'value' => '0', 'system_default' => 1],
            ['value_key' => 'sharethis_active', 'value' => '0', 'system_default' => 1],
            ['value_key' => 'tawkto_active', 'value' => '0', 'system_default' => 1],
            ['value_key' => 'social_google_key', 'value' => '', 'system_default' => 1],
            ['value_key' => 'social_google_secret', 'value' => '', 'system_default' => 1],
            ['value_key' => 'sharethis_code', 'value' => '', 'system_default' => 1],
            ['value_key' => 'tawkto_code', 'value' => ' ', 'system_default' => 1],
            ['value_key' => 'mailchimp_code', 'value' => 'Name * Email Address * Mobile Number *', 'system_default' => 1],
            ['value_key' => 'signature_sms', 'value' => 'Test SMS Signature1', 'system_default' => 1],
            ['value_key' => 'signature_email', 'value' => 'sdasdasdasd123123', 'system_default' => 1],
            ['value_key' => 'email_protocol', 'value' => 'SMTP', 'system_default' => 1],
            ['value_key' => 'email_smtp_host', 'value' => '', 'system_default' => 1],
            ['value_key' => 'email_smtp_port', 'value' => '', 'system_default' => 1],
            ['value_key' => 'email_smtp_user', 'value' => '', 'system_default' => 1],
            ['value_key' => 'email_smtp_password', 'value' => '12345', 'system_default' => 1],
            ['value_key' => 'head_scripts', 'value' => ' ', 'system_default' => 1],
            ['value_key' => 'body_scripts', 'value' => ' ', 'system_default' => 1],
            ['value_key' => 'website_status', 'value' => 'LIVE', 'system_default' => 1],
            ['value_key' => 'site_down_url', 'value' => '', 'system_default' => 1],
            ['value_key' => 'exclude_ip', 'value' => '127.0.0.1', 'system_default' => 1],
            ['value_key' => 'site_down_message', 'value' => 'SORRYY! We are DOWN for scheduled maintenance.Do not worry. Be right back!', 'system_default' => 1],
            ['value_key' => 'system_message_1', 'value' => 'Refer To Friend112', 'system_default' => 1],
            ['value_key' => 'system_message_2', 'value' => 'Password changed:1', 'system_default' => 1],
            ['value_key' => 'system_message_3', 'value' => 'Profile updated:1', 'system_default' => 1],
            ['value_key' => 'system_message_4', 'value' => 'Forgot password:1', 'system_default' => 1],
            ['value_key' => 'system_message_5', 'value' => 'Registration completed:132323', 'system_default' => 1],
            ['value_key' => 'system_message_6', 'value' => 'Checkout Terms:1', 'system_default' => 1],

        ]);
    }


    public function project(){
        DB::table('global_settings')->insert([
            ['value_key' => 'purchase_no_offset', 'value' => 1],
            ['value_key' => 'sale_no_offset', 'value' => 1]
        ]);
    }
}
