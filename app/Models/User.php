<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'dob',
        'occupation',
        'education',
        'gender',
        'user_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }

    public function connections1()
    {
        return $this->hasMany(UserConnection::class, 'user_id1', 'id');
    }

    public function connections2()
    {
        return $this->hasMany(UserConnection::class, 'user_id2', 'id');
    }

    public function clientAppointments()
    {
        return $this->hasMany(UserAppointment::class, 'client_id');
    }

    public function providerAppointments()
    {
        return $this->hasMany(UserAppointment::class, 'provider_id');
    }

    public function messagesSent()
    {
        return $this->hasMany(UserMessage::class, 'sender_id', 'id');
    }

    public function messagesReceived()
    {
        return $this->hasMany(UserMessage::class, 'receiver_id', 'id');
    }

    public function userLocation()
    {
        return $this->hasOne(UserLocation::class);
    }

    public function logs()
    {
        return $this->hasMany(UserLog::class, 'user_id');
    }
}
