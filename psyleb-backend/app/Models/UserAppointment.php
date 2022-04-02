<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAppointment extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'name',
        'datetime',
        'city',
        'is_pending',
        'client_id',
        'provider_id',
        // 'location_id'
    ];

    public function providerAppointment(){
        return $this->belongsTo(User::class, 'provider_id');
    }

    public function clientAppointment(){
        return $this->belongsTo(User::class, 'client_id');
    }

    // public function appointmentLocation(){
    //     return $this->belongsTo(UserLocation::class, 'location_id');
    // }

    // public function appointmentCity(){
    //     return $this->belongsTo(UserLocation::class, 'city');
    // }
}
