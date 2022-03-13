<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserLog;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class LogsController extends Controller
{
        public function addLog(Request $request){
            $validator = Validator::make($request->all(), [
                'mood' => 'between:0,5|integer',
                'notes' =>'string|max:500',
                'sleep' => 'integer|between:0,24'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
        }else{
            $log = UserLog::create(array_merge($validator->validated(), ["user_id" => auth()->user()->id]));

            return response()->json([
                'message' => 'New log entered!',
                'log' => $log,
            ], 201);
        }
    }

    public function removeLog(Request $request){

        $log = UserLog::find($request->id);
        if ($log->user_id == Auth::user()->id){
            
            $log->delete();

            return response()->json([
                'message'=> 'log succesfully deleted',
                'log' => $log
            ], 201);
        }else{
            return response()->json([
                'message' => "This log doesn't belong to you"
            ], 401);
        }   
    }
}