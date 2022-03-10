<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
        'provider_id',
        'client_id',
        'location_id'
    ];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
