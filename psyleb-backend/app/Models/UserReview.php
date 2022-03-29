<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserReview extends Model
{
    use HasFactory;
    
        /**
        * The attributes that are mass assignable.
        *
        * @var array<int, string>
        */
        protected $fillable = [
            'text',
            'client_id',
            'provider_id',
        ];

        public function fromUser(){
            return $this->belongsTo(User::class, "client_id");
        }

        public function toUser()
        {
            return $this->belongsTo(User::class, "provider_id");
        }


}
