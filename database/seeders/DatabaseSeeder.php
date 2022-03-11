<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(30)->create();
        // \App\Models\UserLocation::factory(30)->create();
        // \App\Models\UserAppointment::factory(10)->create();
        // \App\Models\UserConnection::factory(10)->create();
        \App\Models\UserMessage::factory(10)->create();

    }
}
