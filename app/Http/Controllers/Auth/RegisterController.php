<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Tenant;
use PHPUnit\Exception;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }


    protected function index(){
        return Inertia::render('auth/register',['title'=> 'Register']);
    }
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(Request $request)
    {

        $this->validate($request,[
            'company_name' => ['required'],

            'password' => ['required','min:5'],
        ]);

        $response = $this->create_digital_ocean_domain($request['username']);
        if($response){
            $database_cluster  = $this->get_digital_ocean_database_cluster();
            $database_response = $this->create_digital_ocean_database( $database_cluster->id,$request['username']);

            if($database_response){

                if(isset($database_response->message)){
                    return 1;
                }
                else{

                    $data = array(
                        'company_name' =>  $request['company_name'],
                        'username' =>  $request['username'],
                        'database' =>  $database_response->db->name,
                        'domain' =>  $request['username'].".".env("MAIN_DOMAIN"),
                        'password' =>  Hash::make($request['password']),
                        'email' =>  $request['email'],
                    );
                    $create_tenant =  Tenant::create($data);

                    if($create_tenant){
//                        Artisan::call('tenants:artisan "migrate --database=tenant"');
                        //return redirect()->to('http://'.$data['domain'].'/login')->with('type_alert', 'success')->with('msg', 'Account Created.');
                        return Inertia::location('http://'.$request['username'].".".env("MAIN_DOMAIN").'/db/migration/create');
//                        return redirect()->to('http://'.$request['username'].".".env("MAIN_DOMAIN").'/login');
                    }
                }

            }


        }
        else{

        }



        // return TenantUsers::create([
        //     'name' => $data['name'],
        //     'email' => $data['email'],
        //     'password' => Hash::make($data['password']),
        // ]);
    }
     /**
     * Create Digital Ocean A record for subdomain.
     *
     * @param  array  $data
     *
     */
    private function create_digital_ocean_domain($username){

        $curl = curl_init();
        curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api.digitalocean.com/v2/domains/'.env('DIGITAL_OCEAN_DOMAIN').'/records',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS =>'{
                    "type": "A",
                    "name": "'.$username.'",
                    "data": "'.env('DIGITAL_OCEAN_DROPLET').'",
                    "priority": null,
                    "port": null,
                    "ttl": 3600,
                    "weight": null,
                    "flags": null,
                    "tag": null
                }',
                CURLOPT_HTTPHEADER => array(
                    'Authorization: Bearer '.env('DIGITAL_OCEAN_TOKEN'),
                    'Content-Type: application/json'
                ),
        ));
        $response = json_decode(curl_exec($curl));
        curl_close($curl);
        return $response;
    }


     /**
     * Create Digital Ocean Database.
     *
     * @param  array  $data
     *
     */
    private function create_digital_ocean_database($cluster_id,$username){

        $curl = curl_init();
        curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api.digitalocean.com/v2/databases/'.$cluster_id.'/dbs',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS =>'{
                    "name": "'.$username.'"
                  }',
                CURLOPT_HTTPHEADER => array(
                    'Authorization: Bearer '.env('DIGITAL_OCEAN_TOKEN'),
                    'Content-Type: application/json'
                ),
        ));
        $response = json_decode(curl_exec($curl));
        curl_close($curl);
        return $response;
    }

    /**
     * Get Digital Ocean Database Cluster.
     *
     * @param  array  $data
     *
     */
    private function get_digital_ocean_database_cluster(){
        $return = array();
        $curl = curl_init();
        curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api.digitalocean.com/v2/databases',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'GET',

                CURLOPT_HTTPHEADER => array(
                    'Authorization: Bearer '.env('DIGITAL_OCEAN_TOKEN'),
                    'Content-Type: application/json'
                ),
        ));
        $response = json_decode(curl_exec($curl));
        curl_close($curl);

        for ($i = 0; $i < count($response->databases) ; $i++){
            if($response->databases[$i]->name == env('DIGITAL_OCEAN_DATABASE_CLUSTER')){
                $return = $response->databases[$i];
                break;
            }
        }

        return $return;
    }


    public function create_migration(){


        try{
            Artisan::call('tenants:artisan "migrate --database=tenant --seed"');
            //Artisan::call('tenants:artisan "migrate --database=tenant --seed"');
            return response()
                ->json(['status' => '200', 'message' => 'Migration Created.']);
        }catch (Exception $e){
            return  response()
                ->json(['status' => '400', 'message' => 'Migration failed.']);
        }


    }
}
