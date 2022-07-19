<?php

namespace App\Http\Controllers\apps;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;
use Artisan;
use Auth;
use Hash;
use Illuminate\Support\Facades\Route;
use App\Models\globalSettings;

use App\Mail\MailtrapExample;
use Illuminate\Support\Facades\Mail;
use Ifsnop\Mysqldump as IMysqldump;

class GlobalOptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        /* GET PERMISSION OF THIS MODULES */
        $getRoute = Route::getFacadeRoot()->current()->uri();
        $optionArray = $this->getPermissions($getRoute);
        /* GET PERMISSION OF THIS MODULES */

        $total_tables = count(DB::select('SHOW TABLES'));

        $gOpt = GlobalSettings::pluck('value', 'value_key');

        $props = array(
            'title' => 'Settings',
            'sub_title' => 'Edit',
            'globalOpt' => $gOpt,
            'total_tables' => $total_tables,
            'getPermission' => $optionArray,
        );

        return inertia::render('apps/globalOption/index', $props);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // unset($request['_method']);
        $data=$request->all();
        foreach($data as $key=> $val){
            // globalSettings::where('value_key',$key)->update(['value_key'=>$key,'value'=>$val]);
            globalSettings::updateOrCreate(
                [
                    'value_key' => $key,
                ],
                [
                    'value_key'=>$key,
                    'value'=>$val
                ]
            );
        }

        return redirect()->route('settings.index')->with('type_alert','success')->with('msg','Record updated successfully!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\GlobalOption  $globalOption
     * @return \Illuminate\Http\Response
     */
    public function show(GlobalOption $globalOption)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\GlobalOption  $globalOption
     * @return \Illuminate\Http\Response
     */
    public function edit(GlobalOption $globalOption)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GlobalOption  $globalOption
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GlobalOption  $globalOption
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        //
    }

    public function SendTestEmail(Request $request)
    {
        $email_address = $request->email_test;
        $globalOpt = GlobalSettings::pluck('value', 'value_key');

        $mailConfig = array(
            'transport' => 'smtp',
            'host'       => $globalOpt['email_smtp_host'],
            'port'       => $globalOpt['email_smtp_port'],
            'from'       => array('address' => $globalOpt['email_smtp_user'], 'name' => $globalOpt['email_smtp_user']),
            'username'   => $globalOpt['email_smtp_user'],
            'password'   => $globalOpt['email_smtp_password'],
        );

        config(['mail.mailers.smtp' => $mailConfig]);

        $mailStatus = Mail::to($email_address)->send(new MailtrapExample());

        if (Mail::failures()) {
            return redirect()->route('settings.index')->with('type_alert', 'danger')->with('msg', 'Something went wrong!');
        }

        return redirect()->route('settings.index')->with('type_alert', 'success')->with('msg','Test email sent successfully!');
    }

    public function ClearCache()
    {
        Artisan::call('cache:clear');
        return redirect()->route('settings.index')->with('type_alert', 'success')->with('msg', Artisan::output());

    }

    public function CreateBackup()
    {
        try {
            $db = env('DB_DATABASE');
            $user = env('DB_USERNAME');
            $password = env('DB_PASSWORD');

            $file= storage_path('app/backup/database.sql');

            $dump = new IMysqldump\Mysqldump("mysql:host=localhost;dbname=$db", "$user", "$password");
            $dump->start($file);

            return redirect()->route('settings.index')->with('type_alert', 'success')->with('msg', 'Database Backup created sucessfully!');
        } catch (\Exception $e) {
            echo 'mysqldump-php error: ' . $e->getMessage();
            return redirect()->route('settings.index')->with('type_alert', 'success')->with('msg', $e->getMessage());
        }
    }

    public function DownloadBackup()
    {

        $file= storage_path('app/backup/database.sql');

        if(!is_file($file)){
            return redirect()->route('settings.index')->with('type_alert', 'danger')->with('msg', 'File Not Found!');
        }

        $headers = [
          'Content-Type' => 'application/sql',
        ];

        return response()->download($file, 'database.sql', $headers);
    }

    public function EmptyDatabase(Request $request)
    {
        $password_super_admin = $request->password_reset;
        if (Hash::check($password_super_admin, Auth::user()->password)) {

            $tables =
            array(
                'email_auto_responders',
                'roles',
                'sms_responders',
            );
            foreach ($tables as $table) {
                DB::table($table)->delete();
            }
            return redirect()->route('settings.index')->with('type_alert', 'success')->with('msg', 'Database reset succesful!');
        }else{
            return redirect()->route('settings.index')->with('type_alert', 'danger')->with('msg', 'Operation failed!');
        }

    }

    public function ServerInfo()
    {
        return phpinfo();
    }
}
