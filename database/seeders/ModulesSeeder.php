<?php

namespace Database\Seeders;

use App\Models\ModuleOptions;
use App\Models\ModulePermission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Modules;

class ModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modules')->truncate();
        DB::table('modules_options')->truncate();

        $this->dashboard();
        $this->app();
        $this->products();

        $modules_options = ModuleOptions::all();
        foreach ($modules_options as $modules_option) {
            ModulePermission::insert([
                'module_id' => $modules_option->module_id,
                'module_option_id' =>$modules_option->id,
                'role_id'=>1
            ]);
        }

    }

    private function dashboard()
    {

        $record = Modules::create(['name' => 'Home', 'slug' => '', 'parent_id' => 0, 'have_child' => 0, 'icon_class' => 'i-Home1', 'sort_by' => 1.00]);
        $this->create_action_by_module($record->id, 1, [
            'name' => 'View',
            'key' => 'view',
            'module_id' => $record->id
        ]);

        $child_record = Modules::create(['name' => 'View Website', 'slug' => '', 'parent_id' => $record->id, 'have_child' => 0, 'icon_class' => 'i-Favorite-Window', 'sort_by' => 1.10]);
        $this->create_action_by_module($child_record->id);

        $child_record = Modules::create(['name' => 'Dashboard', 'slug' => 'home', 'parent_id' => $record->id, 'have_child' => 0, 'icon_class' => 'i-Statistic', 'sort_by' => 1.20]);
        $this->create_action_by_module($child_record->id);


    }


    private function app()
    {

        $record = Modules::create(['name' => 'App', 'slug' => 'app', 'parent_id' => 0, 'have_child' => 1, 'icon_class' => 'fa fa-wrench', 'sort_by' => 2.00]);
        $this->create_action_by_module($record->id, 1, [
            'name' => 'View',
            'key' => 'view',
            'module_id' => $record->id
        ]);


        $child_record = Modules::create(['name' => 'Users', 'slug' => 'users', 'parent_id' => $record->id, 'have_child' => 0, 'icon_class' => 'i-Add-User', 'sort_by' => 2.10]);
        $this->create_action_by_module($child_record->id);


        $child_record = Modules::create(['name' => 'Roles', 'slug' => 'roles', 'parent_id' => $record->id, 'have_child' => 0, 'icon_class' => 'i-Conference', 'sort_by' => 2.20]);
        $this->create_action_by_module($child_record->id);


        $child_record = Modules::create(['name' => 'Settings', 'slug' => 'settings', 'parent_id' => $record->id, 'have_child' => 0, 'icon_class' => 'i-Gear', 'sort_by' => 2.30]);
        $this->create_action_by_module($child_record->id);


    }


    private function products()
    {

        $record = Modules::create(['name' => 'Products', 'slug' => '', 'parent_id' => 0, 'have_child' => 0, 'icon_class' => 'i-File-Horizontal-Text', 'sort_by' => 1.00]);
        $this->create_action_by_module($record->id, 1, [
            'name' => 'View',
            'key' => 'view',
            'module_id' => $record->id
        ]);


        $child_record = Modules::create(['name' => 'Categories', 'slug' => 'products/categories', 'parent_id' => $record->id, 'have_child' => 0, 'icon_class' => 'i-Favorite-Window', 'sort_by' => 1.10]);
        $this->create_action_by_module($child_record->id);

        $child_record = Modules::create(['name' => 'Items', 'slug' => 'products/items', 'parent_id' => $record->id, 'have_child' => 0, 'icon_class' => 'i-Favorite-Window', 'sort_by' => 1.10]);
        $this->create_action_by_module($child_record->id);

    }

    private function create_action_by_module($module_id, $type = 0, $custom = array())
    {

        if ($type == 0) {
            DB::table('modules_options')->insert([
                [
                    'name' => 'View',
                    'key' => 'view',
                    'module_id' => $module_id
                ],
                [
                    'name' => 'Add',
                    'key' => 'add',
                    'module_id' => $module_id
                ],
                [
                    'name' => 'Edit',
                    'key' => 'edit',
                    'module_id' => $module_id
                ],
                [
                    'name' => 'Delete',
                    'key' => 'delete',
                    'module_id' => $module_id
                ]]);
        } else {
            DB::table('modules_options')->insert([$custom]);
        }
    }
}
