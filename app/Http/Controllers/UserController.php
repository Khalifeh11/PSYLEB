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
    
    // getting logs from client side
    public function getMyLogs(){
        return response()->json(array("logs" => auth()->user()->logs));
    }

    // getting appointments from client side
    public function getUserAppointments(){
        return response()->json(array("Appointments" => auth()->user()->clientAppointments));
    }

    // getting appointments from provider side
    public function getProviderAppointments(){
        return response()->json(array("Appointments" => auth()->user()->providerAppointments));
    }
}
