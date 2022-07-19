<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TestTable;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {


//        TestTable::factory(200000)->create();
        // $this->call([
        //     ModulesSeeder::class,
        // ]);

         return $this->call([
//             UsersSeeder::class,
             RolesSeeder::class,
             ModulesSeeder::class,
             GlobalSettingsSeeder::class,
             //     EmailAutoRespondersSeeder::class,
             //     SmsResponderSeeder::class,
             MerchantProfileSeeder::class,
         ]);
    }

}
