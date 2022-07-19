<?php

namespace App\Providers;

use App\Models\GlobalSettings;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Modules;
use App\Models\ModuleOptions;
use App\Models\MerchantProfile;


Use DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {



        Inertia::share(['base_url' => env('APP_URL')]);

        /*----------------- Auth User Data   -----------*/
        Inertia::share('authUser', function () {
            if (Auth::check()) {

                Inertia::render('home/index',['title'=>'Home','sub_title'=>'Dashboard']);
                return [
                    'isLoggedIn' => true,
                    'id' => Auth::user()->id,
                    'first_name' => Auth::user()->first_name,
                    'last_name' => Auth::user()->last_name,
                    'email' => Auth::user()->email,
                ];


            } else {

                return [
                    'isLoggedIn' => false,
                ];
            }
        });
        /*----------------- Auth User Data   -----------*/


        /*----------------- SUCCESS  AND  ERROR  MESSAGE  -----------*/
        Inertia::share([
            'errors' => function () {
                return Session::get('errors')
                    ? Session::get('errors')->getBag('default')->getMessages()
                    : (object)[];
            },
            'type_alert' => function () {
                return Session::get('type_alert')
                    ? Session::get('type_alert')
                    : null;
            },
            'msg' => function () {
                return Session::get('msg')
                    ? Session::get('msg')
                    : null;
            }
        ]);
        /*----------------- SUCCESS  AND  ERROR  MESSAGE  -----------*/

        /*----------------- APPLICATION MODULES FOR NAVIGATION  -----------*/

        Inertia::share('navigationModules', function () {

            if (Auth::check()) {

                //check Super Admin
                if (Auth::user()->role_id == 0) {
                    $modules = Modules::select('modules.*')
                        ->join('modules_options', 'modules.id', '=', 'modules_options.module_id')
                        ->where('modules_options.key', '=', 'view')
                        ->where('modules.status', '=', '1')

                        ->get();
                } else {
                     $modules = DB::table('modules')
                         ->join('modules_options', 'modules.id', '=', 'modules_options.module_id')
                         ->join('modules_options_permissions', 'modules_options.id', '=', 'modules_options_permissions.module_option_id')
                         ->where('modules_options.key', '=', 'view')
                         ->where('modules_options_permissions.role_id', '=', Auth::user()->role_id)
                         ->where('modules.status', '=', '1')
                         ->select('modules.*')
                         ->get();
                }


                $modules = json_decode(json_encode($modules), true);

                $max_parent_id = Modules::max('parent_id') + 1;

                //Generating empty array of array
                $modules_sorted = array_fill(0, $max_parent_id, array());

                //sort all modules on the basis of parent_id i.e modules of parent_id = 1 will be at index:1 of $modules_sorted
                foreach ($modules as $key => $value) {
                    $modules_sorted[$value['parent_id']][$key] = $value;
                }
                return json_encode($modules_sorted, JSON_FORCE_OBJECT);
            }

        });

        // Inertia::share('moduleOptions', function () {
        //     if (Auth::check()) {
        //         $moduleOption = ModuleOptions::all();
        //         return json_encode($moduleOption);
        //     }
        // });

        /*----------------- APPLICATION MODULES FOR NAVIGATION  -----------*/

        /*----------------- APPLICATION GLOBAL OPTION FOR APP  -----------*/

        Inertia::share('no_of_items_per_page', function () {
            if (Auth::check()) {
                $val = GlobalSettings::getGlobalSetting('no_of_items_per_page');
                return $val;
            }
        });


        // $merchant_profile = MerchantProfile::find(1)->first();
        // Inertia::share('business_name', function () use ($merchant_profile) {

        //     $val = $merchant_profile->name;
        //     return $val;
        // });

        // Inertia::share('logo', function () use ($merchant_profile) {
        //     $val = $merchant_profile->logo;
        //     return $val;
        // });

        /*----------------- APPLICATION GLOBAL OPTION FOR APP  -----------*/
    }

}
