<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;


class UserLogFactory extends Factory
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
            'mood'=>$this->faker->numberBetween(0,5),
            'notes'=>$this->faker->text($maxNbChars = 200),
            'sleep'=>$this->faker->numberBetween(0,12),
            'user_id'=>$this->faker->unique()->randomElement($users)
        ];
    }
}
