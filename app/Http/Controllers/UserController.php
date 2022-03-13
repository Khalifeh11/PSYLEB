<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserAppointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    // public function getUserConnections(){
    //     return response()->json(array("connections" => auth()->user()->connections()));
    // }

    public function getUserAppointments(){
        return response()->json(array("Appointments" => auth()->user()->clientAppointments));
    }

    public function getProviderAppointments(){
        return response()->json(array("Appointments" => auth()->user()->providerAppointments));
    }
}
