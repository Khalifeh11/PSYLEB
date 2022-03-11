<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class UserMessageFactory extends Factory
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
            'sender_id'=>$this->faker->unique()->randomElement($users),
            'receiver_id'=>$this->faker->unique()->randomElement($users),
            'body'=>$this->faker->realText($maxNbChars = 200, $indexSize = 2),
        ];
    }
}
