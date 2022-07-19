<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class TestTable extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'date',
        'amount'
    ];
}
