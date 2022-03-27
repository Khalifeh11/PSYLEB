<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserAppointment;
use App\Models\UserLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    // public function getUserConnections(){
    //     return response()->json(array("connections" => auth()->user()->connections()));
    // }

    // get providers api (to be used when fetching locations on map)

    public function getProviders(){
        $providers = UserLocation::join('users','users.id','=','user_locations.user_id')
        ->where('user_type', '=', 2)
        ->get(['users.*','user_locations.*']);
        return response()
        ->json(["Providers" => $providers]);

    }
    // getting logs from client side
    public function getMyLogs(){
        $user = Auth::user();
        $logs = $user->logs()->get();
        return response()
                    ->json(["logs" => $logs]);
    }

    // getting client logs from provider side
    // have to add connection condition between them
    public function getClientLogs($id){
        $client = User::find($id);
        $logs = $client->logs()->get();
        return response()
                    ->json(["logs" => $logs]);
    }

    // getting appointments from client side
    public function getUserAppointments(){
        $user = Auth::user();
        $appointments = $user->clientAppointments()->get();
        return response()
                    ->json(["appointments" => $appointments]);
    }

    // getting appointments from provider side
    public function getProviderAppointments(){
        $user = Auth::user();
        $appointments = $user->providerAppointments()->get();
        return response()
                    ->json(["Appointments" => $appointments]);
    }

    public function SearchUsers($key){
        $search = '%' . $key . '%';
        
        $result = User::where(function($query) use ($search){            
            $query->where('first_name', 'like', $search)
                  ->orWhere('last_name', 'like', $search);
                })->where('user_type', '=', 2)->get();
                          
        return response()   
                ->json(["providers" => $result]);
    }

}
