<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use App\Models\Modules;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {


//        $tables = DB::select('SHOW TABLES');
//        foreach($tables as $table)
//        {
////            echo $table->Tables_in_db_name;
//            echo 'ALTER TABLE '.$table->Tables_in_laravel_react_db.' ADD `created_by` INT NULL AFTER `updated_at`, ADD `updated_by` INT NULL AFTER `created_by`;<br />';
//        }
//        die;
        return Inertia::render('home/index',['title'=>'Home','sub_title'=>'Dashboard']);
    }
}
