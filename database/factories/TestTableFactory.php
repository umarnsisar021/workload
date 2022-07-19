<?php

namespace Database\Factories;

use App\Models\TestTable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class TestTableFactory extends Factory
{

    protected $model = TestTable::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'date' => $this->faker->date(),
            'amount' => $this->faker->randomNumber()
        ];
    }

    public function unverified()
    {
    }
}
