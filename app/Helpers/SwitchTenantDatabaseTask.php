<?php 
namespace App\Helpers;

use Spatie\Multitenancy\Models\Tenant;
use Spatie\Multitenancy\Tasks\SwitchTenantTask;

class SwitchTenantDatabaseTask implements SwitchTenantTask
{
    public function __construct(protected ?string $originalPrefix = null)
    {   
       
        $this->originalPrefix ??= config('cache.prefix');
    }

    public function makeCurrent(Tenant $tenant): void
    { 
        $this->setCachePrefix("tenant_{$tenant->id}");
    }

    public function forgetCurrent(): void
    {
        $this->setCachePrefix($this->originalPrefix);
    }

    protected function setCachePrefix(string $prefix): void
    {
        config()->set('cache.prefix', $prefix);

        $storeName = config('cache.default');

        app('cache')->forgetDriver($storeName);
    }
}