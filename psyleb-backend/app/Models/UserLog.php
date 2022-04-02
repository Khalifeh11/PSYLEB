<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class UserLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'mood',
        'notes',
        'hours_slept',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
