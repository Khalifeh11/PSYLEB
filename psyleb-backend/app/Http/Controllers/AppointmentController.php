<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\UserAppointment;
use App\Models\User;



class AppointmentController extends Controller
{
        public function requestAppointment(Request $request){

            $valid = $this->appt_validation($request->all());
            if ($valid->fails()) {
                return response()->json($valid->errors(), 422);
            }else{
                    $appointment = new UserAppointment;
                    $appointment->name = $request->name;
                    $appointment->date = $request->date;
                    $appointment->client_id = Auth::user()->id;
                    $appointment->provider_id = $request->provider_id;
                    $appointment->location_id = $request->location_id;
                    $appointment->save();

                    
                    return response()->json([
                        'message' => 'Appointment requested',
                        'appointment' => $appointment,
                    ], 201);
                }
    }
    // removing an appointment from client side
    public function removeAppointment($id){

        $appointment = UserAppointment::find($id);
        if ($appointment->client_id == Auth::user()->id){
            
            $appointment->delete();

            return response()->json([
                'message'=> 'appointment succesfully deleted',
                'appointment' => $appointment
            ], 201);
        }else{
            return response()->json([
                'message' => "This appointment doesn't belong to you"
            ], 401);
        }   
    }

    // approving appointment from provider side
    public function approveAppointment($id){

        $appointment = UserAppointment::find($id);
        if ($appointment->provider_id == Auth::user()->id){
            
            $appointment->update(['is_pending' => 0]);

            return response()->json([
                'message'=> 'appointment succesfully approved',
                'appointment' => $appointment
            ], 201);
        }else{
            return response()->json([
                'message' => "This appointment doesn't belong to you"
            ], 401);
        }   
    }
    // delcine appointment from provider side
    public function declineAppointment($id){

        $appointment = UserAppointment::find($id);
        if ($appointment->provider_id == Auth::user()->id){
            
            $appointment->delete();

            return response()->json([
                'message'=> 'appointment declined',
                'appointment' => $appointment
            ], 201);
        }else{
            return response()->json([
                'message' => "This appointment doesn't belong to you"
            ], 401);
        }   
    }

    private function appt_validation(array $request){
            $now = date('Y-m-d');
            return Validator::make($request, [
                'name' => 'between:0,100|string',
                'date' =>'date_format:Y-m-d|after_or_equal:'. $now,
            ]);
    }
}
