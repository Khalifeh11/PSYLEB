<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class UserLocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::all()->pluck('id')->toArray();
        return [
            'lat'=>$this->faker->latitude(-90, 90),
            'lng'=>$this->faker->longitude(-90, 90),
            'city'=>$this->faker->city(),
            'street'=>$this->faker->streetName(),
            'building'=>$this->faker->buildingNumber(),
            'floor'=>$this->faker->numberBetween(1,10),
            'user_id'=>$this->faker->unique()->randomElement($users),
        ];
    }
}
