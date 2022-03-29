<?php

namespace App\Http\Controllers;

use App\Models\UserReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;


class UserReviewController extends Controller
{

    public function addReview(Request $request)
    {   $client = Auth::user()->id;
        $validator = Validator::make($request->all(), [
            'text' => 'required|string|max:500',
            'provider_id' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }else{
            $review = UserReview::create(array_merge($validator->validated(), ["client_id" => $client]));

            return response()->json([
                'message' => 'New review entered!',
                'review' => $review,
            ], 201);
        }
    }

    public function deleteReview(Request $request)
    {
        $review = UserReview::find($request->id);
        $review->delete();
        return response()->json([
            'success' => true,
            'message' => 'Review deleted',
            'review' => $review
    ], 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserReview  $userReview
     * @return \Illuminate\Http\Response
     */
    public function show(UserReview $userReview)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserReview  $userReview
     * @return \Illuminate\Http\Response
     */
    public function edit(UserReview $userReview)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserReview  $userReview
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserReview $userReview)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserReview  $userReview
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserReview $userReview)
    {
        
    }
}
