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
            $user = Auth::user()->id;
            $validator = Validator::make($request->all(), [
                'mood' => 'between:1,5|integer',
                'notes' =>'string|max:500',
                'hours_slept' => 'integer|nullable',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
        }else{
            $log = UserLog::create(array_merge($validator->validated(), ["user_id" => $user]));

            return response()->json([
                'message' => 'New log entered!',
                'log' => $log,
            ], 201);
        }
    }

    public function removeLog($id){

        $log = UserLog::find($id);
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

    public function logsChart(){
        $user = Auth::user()->id;
        $logs = UserLog::where('user_id', $user)->groupBy('mood')->get(['mood', \DB::raw('count(mood) as count')]);

        return response()->json([
            'logs' => $logs
        ], 200);
       
    }
}
