<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('an_items', function (Blueprint $table) {
            $table->id();
            $table->char('name',150)->index()->index();
            $table->char('barcode',150)->index()->nullable();
            $table->text('description')->nullable();
            $table->char('size',70)->nullable();
            $table->double('packs')->default(0)->nullable();
            $table->double('pieces')->index()->default(0)->nullable();
            $table->integer('category_id')->nullable();
            $table->tinyInteger('status')->default(1)->index();
            $table->timestamps();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('an_items');
    }
}
