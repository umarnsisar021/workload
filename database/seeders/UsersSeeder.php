<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        User::factory(1)->create();

        User::create(
            [
                'first_name' => "admin",
                'last_name' => "admin",
                'mobile_no' => "",
                'address' => "",
                'email' =>"admin@gmail.com",
                'email_verified_at' => now(),
                'role_id' => 1,
                'password' => Hash::make("12345"),
                'remember_token' => Str::random(10),
            ]
        );

    }
}
