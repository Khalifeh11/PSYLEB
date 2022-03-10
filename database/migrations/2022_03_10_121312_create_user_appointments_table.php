<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_appointments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->datetime('date');
            $table->foreignId('provider_id')
            ->constrained('users')
            ->onDelete('cascade');
            $table->foreignId('client_id')
            ->constrained('users')
            ->onDelete('cascade');
            $table->foreignId('location_id')
            ->constrained('locations')
            ->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_appointments');
    }
}
