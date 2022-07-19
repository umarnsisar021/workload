<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

use Auth;
use App\Models\Roles;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CheckPermisssions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        if (Auth::check()){

            $urlParts = parse_url(request()->getHttpHost());
            $user_domain = parse_url(Auth::user()->domain);

            if ($urlParts['host'] == $user_domain['path']){

            }
            else{
                return redirect()->to('http://'.Auth::user()->username.'.'.env("MAIN_DOMAIN").'/setcookie?id='.Session::getId());
            }

        }
        $role_id = Auth::user()->role_id;

        //check Super Admin
        if ($role_id == 1) {
            return $next($request);
        }

        $route = Route::getRoutes()->match($request);
        $currentroute = explode('.', $route->getName());
        $slug = $currentroute[0];
        $currentMethod = array_key_exists(1 , $currentroute) ? $currentroute[1] : "index";

        $routeToKey = array(
            '/' => 'view',
            'index' => 'view',
            'trash_index' => 'view',
            'store' => 'create',
            'create' => 'create',
            'edit' => 'update',
            'update' => 'update',
            'destroy' => 'delete',
            'restore' => 'delete',
            'purge' => 'delete',
            'trashList' => 'delete',
        );

        $OptionsKey = $routeToKey[$currentMethod];
        $role_id = 1;

        $isAllowed = Roles::checkPermission($slug, $OptionsKey, $role_id);

        if($isAllowed) {
            return $next($request);
        }


        return redirect()->route('home')->with('type_alert', 'danger')->with('msg', 'Permission Denied!');
    }
}
