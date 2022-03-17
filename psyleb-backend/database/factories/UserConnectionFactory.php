<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;


class UserConnectionFactory extends Factory
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
            'user1_id'=>$this->faker->unique()->randomElement($users),
            'user2_id'=>$this->faker->unique()->randomElement($users),
        ];
    }
}
