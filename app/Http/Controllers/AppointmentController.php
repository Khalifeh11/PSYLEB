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

            $now = date('Y-m-d');
            $validator = Validator::make($request->all(), [
                'name' => 'between:0,100|string',
                'date' =>'date_format:Y-m-d|after_or_equal:'. $now,
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
        }else{
            $Appointment = UserAppointment::create(array_merge($validator->validated(),["client_id" => auth()->user()->id], ["provider_id"=> $request->provider_id], ["location_id"=> $request->location_id]));

            return response()->json([
                'message' => 'Appointment requested',
                'appointment' => $Appointment,
            ], 201);
        }
   
    }

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
}
