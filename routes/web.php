<?php


use App\Http\Controllers\auth\RegisterController;
use App\Http\Controllers\apps\BranchesController;
use App\Http\Controllers\apps\LocationController;
use App\Http\Controllers\doubling\BrokerPaymentsController;
use App\Http\Controllers\doubling\InwardsController;
use App\Http\Controllers\commerce\PurchaseOrdersController;
use App\Http\Controllers\commerce\UnassignedPurchasesController;
use App\Http\Controllers\commerce\ShipmentsController;
use App\Http\Controllers\commerce\SaleOrdersController;
use App\Http\Controllers\doubling\OutwardsController;
use App\Http\Controllers\management\BrokersController;
use App\Http\Controllers\management\CustomersController;
use App\Http\Controllers\management\SuppliersController;
use App\Http\Controllers\others\GatePassesController;
use App\Http\Controllers\others\StoreInController;
use App\Http\Controllers\others\StoreOutController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\apps\UsersController;
use App\Http\Controllers\apps\RolesController;
use App\Http\Controllers\apps\GlobalOptionController;
use App\Http\Controllers\apps\EmailAutoRespondersController;
use App\Http\Controllers\apps\SmsResponderController;
use App\Http\Controllers\apps\MerchantProfileController;

use App\Http\Controllers\apps\CurrenciesController;
use App\Http\Controllers\apps\locationTypeController;
use App\Http\Controllers\catalogs\BrandsController;
use App\Http\Controllers\catalogs\ProductsController;
use App\Http\Controllers\catalogs\CountsController;
use App\Http\Controllers\catalogs\ItemsController;

use App\Http\Controllers\management\UnitsController;
use Inertia\Inertia;

use App\Mail\MailtrapExample;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::middleware([ 'auth','permissions','tenant'])->group(function () {

    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index']);




    /* ------ Users ------ */
    Route::get('users/records_data', [UsersController::class, 'records_data'])->name('users.records_data')->withoutMiddleware('permissions');
    Route::get('users/trash_list', [UsersController::class, 'trash_index'])->name('users.trash_index');
    Route::post('users/multi_delete', [UsersController::class, 'multi_delete'])->name('users.multi_delete');
    Route::post('users/multi_restore', [UsersController::class, 'multi_restore'])->name('users.multi_restore');
    Route::post('users/multi_purge', [UsersController::class, 'multi_purge'])->name('users.multi_purge');
    Route::resource('users', UsersController::class);

    /* ------ Roles ------ */
    Route::get('roles/records_data', [RolesController::class, 'records_data'])->name('roles.records_data')->withoutMiddleware('permissions');;
    Route::get('roles/trash_list', [RolesController::class, 'trash_index'])->name('roles.trash_index');
    Route::post('roles/multi_delete', [RolesController::class, 'multi_delete'])->name('roles.multi_delete');
    Route::post('roles/multi_restore', [RolesController::class, 'multi_restore'])->name('roles.multi_restore');
    Route::post('roles/multi_purge', [RolesController::class, 'multi_purge'])->name('roles.multi_purge');
    Route::resource('roles', RolesController::class);


    /* ------ Global Options ------ */
    Route::post('empty_database', [GlobalOptionController::class, 'EmptyDatabase'])->name('empty_database');
    Route::post('server_info', [GlobalOptionController::class, 'ServerInfo'])->name('server_info');
    Route::post('create_backup', [GlobalOptionController::class, 'CreateBackup'])->name('create_backup');
    Route::get('download_backup', [GlobalOptionController::class, 'DownloadBackup'])->name('download_backup')->withoutMiddleware('permissions');
    Route::post('clear_cache', [GlobalOptionController::class, 'ClearCache'])->name('clear_cache');
    Route::post('send_email', [GlobalOptionController::class, 'SendTestEmail'])->name('send_email');
    Route::resource('settings', GlobalOptionController::class);


    /* ------ EMAIl Auto Responders ------ */
    Route::get('email_responder/records_data', [EmailAutoRespondersController::class, 'records_data'])->name('email_responder.records_data')->withoutMiddleware('permissions');
    Route::get('email_responder/trash_list', [EmailAutoRespondersController::class, 'trash_index'])->name('email_responder.trash_index');
    Route::post('email_responder/multi_delete', [EmailAutoRespondersController::class, 'multi_delete'])->name('email_responder.multi_delete');
    Route::post('email_responder/multi_restore', [EmailAutoRespondersController::class, 'multi_restore'])->name('email_responder.multi_restore');
    Route::post('email_responder/multi_purge', [EmailAutoRespondersController::class, 'multi_purge'])->name('email_responder.multi_purge');
    Route::resource('email_responder', EmailAutoRespondersController::class);

    /* ------ SMS Auto Responders ------ */
    Route::get('sms_responders/records_data', [SmsResponderController::class, 'records_data'])->name('sms_responders.records_data')->withoutMiddleware('permissions');
    Route::get('sms_responders/trash_list', [SmsResponderController::class, 'trash_index'])->name('sms_responders.trash_index');
    Route::post('sms_responders/multi_delete', [SmsResponderController::class, 'multi_delete'])->name('sms_responders.multi_delete');
    Route::post('sms_responders/multi_restore', [SmsResponderController::class, 'multi_restore'])->name('sms_responders.multi_restore');
    Route::post('sms_responders/multi_purge', [SmsResponderController::class, 'multi_purge'])->name('sms_responders.multi_purge');
    Route::resource('sms_responders', SmsResponderController::class);

    /* ------ SMS Auto Responders ------ */

    /* ------ MERCHANT PROFILE  ------ */
    Route::resource('merchant_profile', MerchantProfileController::class);
    /* ------ MERCHANT PROFILE  ------ */






    /* ------ CURRENCY ------ */
    Route::get('currencies/records_data', [CurrenciesController::class, 'records_data'])->name('currencies.records_data')->withoutMiddleware('permissions');
    Route::get('currencies/trash_list', [CurrenciesController::class, 'trash_index'])->name('currencies.trash_index');
    Route::post('currencies/multi_delete', [CurrenciesController::class, 'multi_delete'])->name('currencies.multi_delete');
    Route::post('currencies/multi_restore', [CurrenciesController::class, 'multi_restore'])->name('currencies.multi_restore');
    Route::post('currencies/multi_purge', [CurrenciesController::class, 'multi_purge'])->name('currencies.multi_purge');
    Route::resource('currencies', CurrenciesController::class);
    /* ------ CURRENCY ------ */

    /* ------ LOCATION TYPE ------ */
    Route::get('location_type/records_data', [locationTypeController::class, 'records_data'])->name('location_type.records_data')->withoutMiddleware('permissions');
    Route::get('location_type/trash_list', [locationTypeController::class, 'trash_index'])->name('location_type.trash_index');
    Route::post('location_type/multi_delete', [locationTypeController::class, 'multi_delete'])->name('location_type.multi_delete');
    Route::post('location_type/multi_restore', [locationTypeController::class, 'multi_restore'])->name('location_type.multi_restore');
    Route::post('location_type/multi_purge', [locationTypeController::class, 'multi_purge'])->name('location_type.multi_purge');
    Route::resource('location_type', locationTypeController::class);
    /* ------ LOCATION TYPE ------ */


    /* ------ LOCATION  ------ */
    Route::get('locations/records_data', [LocationController::class, 'records_data'])->name('locations.records_data')->withoutMiddleware('permissions');
    Route::get('locations/trash_list', [LocationController::class, 'trash_index'])->name('locations.trash_index');
    Route::post('locations/multi_delete', [LocationController::class, 'multi_delete'])->name('locations.multi_delete');
    Route::post('locations/multi_restore', [LocationController::class, 'multi_restore'])->name('locations.multi_restore');
    Route::post('locations/multi_purge', [LocationController::class, 'multi_purge'])->name('locations.multi_purge');
    Route::resource('locations', LocationController::class);
    /* ------ LOCATION  ------ */


    /* ------ BRANCHES  ------ */
    Route::get('branches/records_data', [BranchesController::class, 'records_data'])->name('branches.records_data')->withoutMiddleware('permissions');
    Route::get('branches/trash_list', [BranchesController::class, 'trash_index'])->name('branches.trash_index');
    Route::post('branches/multi_delete', [BranchesController::class, 'multi_delete'])->name('branches.multi_delete');
    Route::post('branches/multi_restore', [BranchesController::class, 'multi_restore'])->name('branches.multi_restore');
    Route::post('branches/multi_purge', [BranchesController::class, 'multi_purge'])->name('branches.multi_purge');
    Route::resource('branches', BranchesController::class);
    /* ------ BRANCHES  ------ */


//    Catalogs
    Route::group(['prefix' => 'catalogs', 'as' => 'catalogs.'], function () {
        Route::get('brands/records_data', [BrandsController::class, 'records_data'])->name('brands.records_data');
        Route::get('brands/trash_index', [BrandsController::class, 'trash_index'])->name('brands.trash_index');
        Route::post('brands/multi_delete', [BrandsController::class, 'multi_delete'])->name('brands.multi_delete');
        Route::post('brands/multi_restore', [BrandsController::class, 'multi_restore'])->name('brands.multi_restore');
        Route::post('brands/multi_purge', [BrandsController::class, 'multi_purge'])->name('brands.multi_purge');
        Route::resource('brands', BrandsController::class);


        Route::get('products/records_data', [ProductsController::class, 'records_data'])->name('products.records_data');
        Route::get('products/trash_index', [ProductsController::class, 'trash_index'])->name('products.trash_index');
        Route::post('products/multi_delete', [ProductsController::class, 'multi_delete'])->name('products.multi_delete');
        Route::post('products/multi_restore', [ProductsController::class, 'multi_restore'])->name('products.multi_restore');
        Route::post('products/multi_purge', [ProductsController::class, 'multi_purge'])->name('products.multi_purge');
        Route::resource('products', ProductsController::class);


        Route::get('counts/records_data', [CountsController::class, 'records_data'])->name('counts.records_data');
        Route::get('counts/trash_index', [CountsController::class, 'trash_index'])->name('counts.trash_index');
        Route::post('counts/multi_delete', [CountsController::class, 'multi_delete'])->name('counts.multi_delete');
        Route::post('counts/multi_restore', [CountsController::class, 'multi_restore'])->name('counts.multi_restore');
        Route::post('counts/multi_purge', [CountsController::class, 'multi_purge'])->name('counts.multi_purge');
        Route::resource('counts', CountsController::class);


        Route::get('items/records_data', [ItemsController::class, 'records_data'])->name('items.records_data');
        Route::get('items/trash_index', [ItemsController::class, 'trash_index'])->name('items.trash_index');
        Route::post('items/multi_delete', [ItemsController::class, 'multi_delete'])->name('items.multi_delete');
        Route::post('items/multi_restore', [ItemsController::class, 'multi_restore'])->name('items.multi_restore');
        Route::post('items/multi_purge', [ItemsController::class, 'multi_purge'])->name('items.multi_purge');
        Route::post('items/check_name', [ItemsController::class, 'check_name'])->name('items.check_name');
        Route::resource('items', ItemsController::class);
    });


    //    Managements
    Route::group(['prefix' => 'management', 'as' => 'management.'], function () {
        Route::get('units/records_data', [UnitsController::class, 'records_data'])->name('units.records_data');
        Route::get('units/trash_index', [UnitsController::class, 'trash_index'])->name('units.trash_index');
        Route::post('units/multi_delete', [UnitsController::class, 'multi_delete'])->name('units.multi_delete');
        Route::post('units/multi_restore', [UnitsController::class, 'multi_restore'])->name('units.multi_restore');
        Route::post('units/multi_purge', [UnitsController::class, 'multi_purge'])->name('units.multi_purge');
        Route::resource('units', UnitsController::class);


        Route::get('customers/records_data', [CustomersController::class, 'records_data'])->name('customers.records_data');
        Route::get('customers/trash_index', [CustomersController::class, 'trash_index'])->name('customers.trash_index');
        Route::post('customers/multi_delete', [CustomersController::class, 'multi_delete'])->name('customers.multi_delete');
        Route::post('customers/multi_restore', [CustomersController::class, 'multi_restore'])->name('customers.multi_restore');
        Route::post('customers/multi_purge', [CustomersController::class, 'multi_purge'])->name('customers.multi_purge');
        Route::resource('customers', CustomersController::class);


        Route::get('suppliers/records_data', [SuppliersController::class, 'records_data'])->name('suppliers.records_data');
        Route::get('suppliers/trash_index', [SuppliersController::class, 'trash_index'])->name('suppliers.trash_index');
        Route::post('suppliers/multi_delete', [SuppliersController::class, 'multi_delete'])->name('suppliers.multi_delete');
        Route::post('suppliers/multi_restore', [SuppliersController::class, 'multi_restore'])->name('suppliers.multi_restore');
        Route::post('suppliers/multi_purge', [SuppliersController::class, 'multi_purge'])->name('suppliers.multi_purge');
        Route::resource('suppliers', SuppliersController::class);


        Route::get('brokers/records_data', [BrokersController::class, 'records_data'])->name('brokers.records_data');
        Route::get('brokers/trash_index', [BrokersController::class, 'trash_index'])->name('brokers.trash_index');
        Route::post('brokers/multi_delete', [BrokersController::class, 'multi_delete'])->name('brokers.multi_delete');
        Route::post('brokers/multi_restore', [BrokersController::class, 'multi_restore'])->name('brokers.multi_restore');
        Route::post('brokers/multi_purge', [BrokersController::class, 'multi_purge'])->name('brokers.multi_purge');
        Route::resource('brokers', BrokersController::class);
    });


    //    Commerce
    Route::group(['prefix' => 'commerce', 'as' => 'commerce.'], function () {
        Route::get('purchase_orders/records_data', [PurchaseOrdersController::class, 'records_data'])->name('purchase_orders.records_data');
        Route::get('purchase_orders/trash_index', [PurchaseOrdersController::class, 'trash_index'])->name('purchase_orders.trash_index');
        Route::post('purchase_orders/multi_delete', [PurchaseOrdersController::class, 'multi_delete'])->name('purchase_orders.multi_delete');
        Route::post('purchase_orders/multi_restore', [PurchaseOrdersController::class, 'multi_restore'])->name('purchase_orders.multi_restore');
        Route::post('purchase_orders/multi_purge', [PurchaseOrdersController::class, 'multi_purge'])->name('purchase_orders.multi_purge');
        Route::post('purchase_orders/update_status', [PurchaseOrdersController::class, 'update_status'])->name('purchase_orders.update_status');
        Route::resource('purchase_orders', PurchaseOrdersController::class);


        Route::get('sale_orders/records_data', [SaleOrdersController::class, 'records_data'])->name('sale_orders.records_data');
        Route::get('sale_orders/trash_index', [SaleOrdersController::class, 'trash_index'])->name('sale_orders.trash_index');
        Route::post('sale_orders/multi_delete', [SaleOrdersController::class, 'multi_delete'])->name('sale_orders.multi_delete');
        Route::post('sale_orders/multi_restore', [SaleOrdersController::class, 'multi_restore'])->name('sale_orders.multi_restore');
        Route::post('sale_orders/multi_purge', [SaleOrdersController::class, 'multi_purge'])->name('sale_orders.multi_purge');
        Route::resource('sale_orders', SaleOrdersController::class);


        Route::get('unassigned_purchases/records_data', [UnassignedPurchasesController::class, 'records_data'])->name('unassigned_purchases.records_data');
        Route::get('unassigned_purchases/trash_index', [UnassignedPurchasesController::class, 'trash_index'])->name('unassigned_purchases.trash_index');
        Route::post('unassigned_purchases/multi_delete', [UnassignedPurchasesController::class, 'multi_delete'])->name('unassigned_purchases.multi_delete');
        Route::post('unassigned_purchases/multi_restore', [UnassignedPurchasesController::class, 'multi_restore'])->name('unassigned_purchases.multi_restore');
        Route::post('unassigned_purchases/multi_purge', [UnassignedPurchasesController::class, 'multi_purge'])->name('unassigned_purchases.multi_purge');
        Route::resource('unassigned_purchases', UnassignedPurchasesController::class);


        Route::get('shipments/records_data', [ShipmentsController::class, 'records_data'])->name('shipments.records_data');
        Route::get('shipments/trash_index', [ShipmentsController::class, 'trash_index'])->name('shipments.trash_index');
        Route::post('shipments/multi_delete', [ShipmentsController::class, 'multi_delete'])->name('shipments.multi_delete');
        Route::post('shipments/multi_restore', [ShipmentsController::class, 'multi_restore'])->name('shipments.multi_restore');
        Route::post('shipments/multi_purge', [ShipmentsController::class, 'multi_purge'])->name('shipments.multi_purge');
        Route::resource('shipments', ShipmentsController::class);
    });


    //    Doubling
    Route::group(['prefix' => 'doubling', 'as' => 'doubling.'], function () {
        Route::get('inwards/records_data', [InwardsController::class, 'records_data'])->name('inwards.records_data');
        Route::get('inwards/trash_index', [InwardsController::class, 'trash_index'])->name('inwards.trash_index');
        Route::post('inwards/multi_delete', [InwardsController::class, 'multi_delete'])->name('inwards.multi_delete');
        Route::post('inwards/multi_restore', [InwardsController::class, 'multi_restore'])->name('inwards.multi_restore');
        Route::post('inwards/multi_purge', [InwardsController::class, 'multi_purge'])->name('inwards.multi_purge');
        Route::post('inwards/get_purchase_order', [InwardsController::class, 'get_purchase_order'])->name('inwards.get_purchase_order');
        Route::resource('inwards', InwardsController::class);


        Route::get('outwards/records_data', [OutwardsController::class, 'records_data'])->name('outwards.records_data');
        Route::get('outwards/trash_index', [OutwardsController::class, 'trash_index'])->name('outwards.trash_index');
        Route::post('outwards/multi_delete', [OutwardsController::class, 'multi_delete'])->name('outwards.multi_delete');
        Route::post('outwards/multi_restore', [OutwardsController::class, 'multi_restore'])->name('outwards.multi_restore');
        Route::post('outwards/multi_purge', [OutwardsController::class, 'multi_purge'])->name('outwards.multi_purge');
        Route::post('outwards/get_purchase_order', [OutwardsController::class, 'get_purchase_order'])->name('outwards.get_purchase_order');
        Route::resource('outwards', OutwardsController::class);


        Route::get('broker_payments/records_data', [BrokerPaymentsController::class, 'records_data'])->name('broker_payments.records_data');
        Route::get('broker_payments/trash_index', [BrokerPaymentsController::class, 'trash_index'])->name('broker_payments.trash_index');
        Route::post('broker_payments/multi_delete', [BrokerPaymentsController::class, 'multi_delete'])->name('broker_payments.multi_delete');
        Route::post('broker_payments/multi_restore', [BrokerPaymentsController::class, 'multi_restore'])->name('broker_payments.multi_restore');
        Route::post('broker_payments/multi_purge', [BrokerPaymentsController::class, 'multi_purge'])->name('broker_payments.multi_purge');
        Route::post('broker_payments/get_purchase_order', [BrokerPaymentsController::class, 'get_purchase_order'])->name('broker_payments.get_purchase_order');
        Route::resource('broker_payments', BrokerPaymentsController::class);
    });


    //    Others
    Route::group(['prefix' => 'others', 'as' => 'others.'], function () {
        Route::get('gate_passes/records_data', [GatePassesController::class, 'records_data'])->name('gate_passes.records_data');
        Route::get('gate_passes/trash_index', [GatePassesController::class, 'trash_index'])->name('gate_passes.trash_index');
        Route::post('gate_passes/multi_delete', [GatePassesController::class, 'multi_delete'])->name('gate_passes.multi_delete');
        Route::post('gate_passes/multi_restore', [GatePassesController::class, 'multi_restore'])->name('gate_passes.multi_restore');
        Route::post('gate_passes/multi_purge', [GatePassesController::class, 'multi_purge'])->name('gate_passes.multi_purge');
        Route::resource('gate_passes', GatePassesController::class);


        Route::get('store_in/records_data', [StoreInController::class, 'records_data'])->name('store_in.records_data');
        Route::get('store_in/trash_index', [StoreInController::class, 'trash_index'])->name('store_in.trash_index');
        Route::post('store_in/multi_delete', [StoreInController::class, 'multi_delete'])->name('store_in.multi_delete');
        Route::post('store_in/multi_restore', [StoreInController::class, 'multi_restore'])->name('store_in.multi_restore');
        Route::post('store_in/multi_purge', [StoreInController::class, 'multi_purge'])->name('store_in.multi_purge');
        Route::post('store_in/get_items_by_unit', [StoreInController::class, 'get_items_by_unit'])->name('store_in.get_items_by_unit');
        Route::resource('store_in', StoreInController::class);

        Route::get('store_out/records_data', [StoreOutController::class, 'records_data'])->name('store_out.records_data');
        Route::get('store_out/trash_index', [StoreOutController::class, 'trash_index'])->name('store_out.trash_index');
        Route::post('store_out/multi_delete', [StoreOutController::class, 'multi_delete'])->name('store_out.multi_delete');
        Route::post('store_out/multi_restore', [StoreOutController::class, 'multi_restore'])->name('store_out.multi_restore');
        Route::post('store_out/multi_purge', [StoreOutController::class, 'multi_purge'])->name('store_out.multi_purge');
        Route::post('store_out/get_items_by_unit', [StoreOutController::class, 'get_items_by_unit'])->name('store_out.get_items_by_unit');
        Route::resource('store_out', StoreOutController::class);
    });

});


Route::get('/clear', function () {
//    var_dump(DB::connection());die;
//    return "Cleared!";

//    Artisan::call('storage:link');
//
//    Artisan::call('config:cache');
//    Artisan::call('view:clear');
//    Artisan::call('route:clear');
//    Artisan::call('route:cache');
    Artisan::call('config:clear');
    Artisan::call('config:cache');
    Artisan::call('cache:clear');

//    Artisan::call('optimize');
    return "Cleared!";
});

Route::get('/register', [RegisterController::class, 'index'])->withoutMiddleware('auth');
Route::post('/register/create', [RegisterController::class, 'create'])->name('register_create')->withoutMiddleware('auth');
Route::get('setcookie', function(){
    Session::setId($_GET['id']);
    Session::start();
    return redirect()->to('/home');
});
Route::get('/db/migration/create', function(){

        $urlParts = parse_url(request()->getHttpHost());


        $row = DB::select("SELECT COUNT(*) as tables FROM information_schema.tables WHERE table_schema = '". str_replace(".localhost", "", $urlParts["host"])."'");;
        $total_tables = $row[0]->tables;

        if ($total_tables == 0){

            return Inertia::render('auth/create_migration',['title'=> 'Register']);

        }
        else{
            return redirect()->to('/home');
        }
});


Route::post('/db/migration/create', [RegisterController::class, 'create_migration'])->withoutMiddleware('auth');
