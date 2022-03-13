<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAppointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
        'is_pending',
        'provider_id',
        'client_id',
        'location_id'
    ];

    public function providerAppointment(){
        return $this->belongsTo(User::class, 'provider_id');
    }

    public function clientAppointment(){
        return $this->belongsTo(User::class, 'client_id');
    }

    public function appointmentLocation(){
        return $this->belongsTo(UserLocation::class, 'location_id');
    }
}
