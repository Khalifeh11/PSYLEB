<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserAppointment;
use App\Models\UserLocation;
use App\Models\UserReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    

    public function getAllUsers () {
        $users = User::all();
        return response()->json($users, 200);
    }



    public function getProviders(){
        // $providers = UserLocation::join('users','users.id','=','user_locations.user_id')
        // ->where('user_type', '=', 2)
        // ->groupBy('user_locations.user_id')
        // ->get(['users.*', 'user_locations.*']);
        $providers = User::join('user_locations', 'users.id', '=', 'user_locations.user_id')->where('user_type', '=', 2)->get(['users.*', 'user_locations.*']);


        // $providers = User::join('user_locations', 'users.id', '=','user_locations.user_id')
        // ->join('user_reviews', 'users.id', '=','user_reviews.provider_id')
        // ->where('user_type', '=', 2)
        // ->get(['user_locations.*', 'user_reviews.*', 'users.*']);
        return response()
        ->json(["Providers" => $providers]);

    }

    public function getMyProviders(){
        $user = Auth::user();
        // $providers = UserAppointment::join('users','users.id','=','user_appointments.provider_id')->where('client_id', '=', $user->id)->where('user_type', '=', 2)->get(['users.*']);
        $providers = User::join('user_appointments','users.id','=','user_appointments.provider_id')->where('client_id', '=', $user->id)->where('user_type', '=', 2)->distinct()->get(['users.*', 'users.id as user_id']);

     return response()
    ->json(["MyProviders" => $providers]);
    }

    // gets providers reviews from client side
    public function getProviderReviews(Request $request){
        $provider = $request->provider_id;
        $reviews = UserReview::where('provider_id', '=', $provider)
        ->join('users','users.id','=','user_reviews.client_id')
        ->get(['users.first_name', 'users.last_name','user_reviews.*']);

        return response()
                    ->json(["reviews" => $reviews]);
    }


    public function getMyClients(){
        $user = Auth::user();
        $clients = User::join('user_appointments','users.id','=','user_appointments.client_id')->where('provider_id', '=', $user->id)->where('user_type', '=', 1)->distinct()->get(['users.*']);

     return response()
    ->json(["MyClients" => $clients]);
}


    // getting logs from client side
    public function getMyLogs(){
        //wrap code in try catch
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
        $appointments = UserAppointment::join('users','users.id','=','user_appointments.provider_id')
        ->where('client_id', '=', $user->id)
        ->get(['users.first_name', 'users.last_name', 'users.email', 'users.occupation', 'users.profile_pic' ,'user_appointments.*']);
        return response()
                    ->json(["appointments" => $appointments]);
    }

    public function getUserPendingAppointments(){
        $user = Auth::user();
        $pending_appointments = UserAppointment::where('is_pending', '=', 1)
        ->join('users','users.id','=','user_appointments.provider_id')
        ->where('client_id', '=', $user->id)
        ->get(['users.first_name', 'users.last_name','user_appointments.*']);
        return response()
                    ->json(["Pending" => $pending_appointments]);
    }


    // getting appointments from provider side
    public function getProviderAppointments(){
        $user = Auth::user();
        $appointments = $user->providerAppointments()->join('users','users.id','=','user_appointments.client_id')->get(['users.first_name', 'users.last_name', 'users.profile_pic','user_appointments.*']);
        // $appointments = UserAppointment::join('users','users.id','=','user_appointments.provider_id')
        // ->where('provider_id', '=', $user->id);
        return response()
                    ->json(["appointments" => $appointments]);
    }

    public function getProviderPendingAppointments(){
        $user = Auth::user();
        $appointments = $user->providerAppointments()->where('is_pending', '=', 1)->join('users','users.id','=','user_appointments.client_id')->get(['users.first_name', 'users.last_name','user_appointments.*']);
        // join('users','users.id','=','user_appointments.client_id')->get(['users.first_name', 'users.last_name','user_appointments.*']);
        return response()
                    ->json(["appointments" => $appointments]);
    }
   


    

    // get my reviews as a provider
    public function getMyReviews(){
        $user = Auth::user();
        $reviews = UserReview::where('provider_id', '=', $user->id)
        ->join('users','users.id','=','user_reviews.client_id')
        ->get(['users.first_name', 'users.last_name','users.profile_pic','user_reviews.*']);

        return response()
                    ->json(["reviews" => $reviews]);
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

        
    public function addPicture(Request $request){

        $image = $request->image;  // your base64 encoded
        $imageName = "random(".rand(10,1000).")".'.'.'jpeg';
        $path=public_path();
        \File::put($path. '/images/' . $imageName, base64_decode($image));
        $user_id = auth()->user()->id;
        $user = User::find($user_id);
        $user->profile_pic = '/images/'.$imageName;
        $user->save();
        return response()->json($user, 200);
    }

    public function editProfile(Request $request){
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => 'string|email|max:255',
            // 'password' => 'string|confirmed|min:6',
            'bio'=>'string|max:255|nullable',
            'phone_number'=>'string|max:20',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user->update(array_merge(
                    $validator->validated()
                    // ['password' => bcrypt($request->password)]
                ));
        return response()->json([
            'message' => 'User successfully updated',
            'user' => $user
        ], 201);
    }

}
