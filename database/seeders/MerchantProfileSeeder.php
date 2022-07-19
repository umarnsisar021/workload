<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MerchantProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('merchant_profiles')->delete();
        DB::table('merchant_profiles')->insert([
            [
                'id'=>1,
                'created_at'=>date("Y-m-d H:i:s"),
            ],
        ]);
    }
}
