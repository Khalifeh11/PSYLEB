<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\UserLocation;


class UserAppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::all()->pluck('id')->toArray();
        $location = UserLocation::all()->pluck('id')->toArray();

        return [
            'name' => 'Appointment',
            'date' => $this->faker->date(),
            'is_pending' => $this->faker->numbderBetween(0, 1),
            'provider_id' =>$this->faker->unique()->randomElement($users),
            'client_id'=>$this->faker->unique()->randomElement($users),
            'location_id'=>$this->faker->unique()->randomElement($location),
        ];
    }
}
