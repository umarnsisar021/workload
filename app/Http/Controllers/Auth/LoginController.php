<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Models\GlobalSettings;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Inertia\Inertia;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return Inertia::render('auth/login',['title'=> 'Sign In']);
    }


    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateLogin(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        //Check Status before Login.
        // if($user->status==0){
        //     throw ValidationException::withMessages([$this->username() => __('Logins Disabled by Super Admin.')]);
        // }
        // Check Admins Login in enabled.

        if ($user && $user->role_id !="1" && GlobalSettings::getGlobalScope('disable_admin_logins')) {
            throw ValidationException::withMessages([$this->username() => __('Logins Disabled by Super Admin.')]);
        }

        // Then, validate input.
        return $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    //add last online info after user has been authenticated
    public function authenticated()
    {
        $currentTime = Carbon::now()->toDateTimeString();
        GlobalSettings::where('value_key','last_online')->update(['value' => $currentTime]);
    }

    //add last offline info after user has been logout
    public function loggedOut()
    {
        $currentTime = Carbon::now()->toDateTimeString();
        GlobalSettings::where('value_key','last_offline')->update(['value' => $currentTime]);
    }
}
