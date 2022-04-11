<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\UserReviewController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
| 

*/

Route::group(['middleware' => ['auth:api']], function ($router) {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::group(['prefix' => 'user'], function () {
        Route::get('/profile', [AuthController::class, 'userProfile']); 
        Route::post('/edit-profile', [UserController::class, 'editProfile']); 

        Route::post('/addPicture', [UserController::class, 'addPicture']); 


        // to get all providers on the map
        Route::get('/providers', [UserController::class, 'getProviders']); 


        // to get my providers
        Route::get('/myProviders', [UserController::class, 'getMyProviders']); 

        Route::get('/allUsers', [UserController::class, 'getAllUsers']); 


        Route::get('/myClients', [UserController::class, 'getMyClients']); 
        
        
        Route::post('/add-picture', [userController::class, 'addPicture']);    


        Route::get('/search/{key}', [UserController::class, 'SearchUsers']); 
        Route::get('/connections', [UserController::class, 'getUserConnections']);   
        Route::get('/appointments', [UserController::class, 'getUserAppointments']);

        Route::get('/pendingAppointments', [UserController::class, 'getUserPendingAppointments']);

        Route::get('/provider-appointments', [UserController::class, 'getProviderAppointments'])
        ;
        Route::get('/logs', [UserController::class, 'getMyLogs']); 
        
        Route::get('/clientLogs/{id}', [UserController::class, 'getClientLogs']); 

        

        // get provider reviews from client side
        Route::get('/providerReviews', [UserController::class, 'getProviderReviews']);

        // get my reviews as a provider
        Route::get('/myReviews', [UserController::class, 'getMyReviews']);

        Route::post('/addReview', [UserReviewController::class, 'addReview']);
        Route::delete('/deleteReview', [UserReviewController::class, 'deleteReview']);


    });

    Route::group(['prefix' => 'logs'], function () {
        Route::post('/addLog', [LogsController::class, 'addLog']);   
        Route::delete('/remove/{id}', [LogsController::class, 'removeLog']);  
        Route::get('/chart', [LogsController::class, 'logsChart']);   
    });

    Route::group(['prefix' => 'appointment'], function () {
        Route::post('/request', [AppointmentController::class, 'requestAppointment']);  
        Route::delete('/remove/{id}', [AppointmentController::class, 'removeAppointment']);
        Route::get('/approve/{id}', [AppointmentController::class, 'approveAppointment']);
        Route::delete('/decline/{id}', [AppointmentController::class, 'declineAppointment']);      
    });
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);  
    
});







