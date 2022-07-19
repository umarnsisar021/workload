<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Roles;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        Roles::factory(1)->create();


        Roles::create(
            [
                'name' => 'Super admin',
                'description'=>""
            ]
        );


    }
}
