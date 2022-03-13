<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\AppointmentController;



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
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function () {
    Route::get('/connections', [UserController::class, 'getUserConnections']);   
    Route::get('/appointments', [UserController::class, 'getUserAppointments']);
    Route::get('/provider-appointments', [UserController::class, 'getProviderAppointments']);       
    Route::get('/logs', [UserController::class, 'getMyLogs']); 
    Route::get('/clientLogs/{id}', [UserController::class, 'getClientLogs']); 
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'logs'
], function () {
    Route::post('/addLog', [LogsController::class, 'addLog']);   
    Route::delete('/removeLog', [LogsController::class, 'removeLog']);     
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'appointment'
], function () {
    Route::post('/request', [AppointmentController::class, 'requestAppointment']);  
    Route::delete('/remove/{id}', [AppointmentController::class, 'removeAppointment']);
    Route::get('/approve/{id}', [AppointmentController::class, 'approveAppointment']);   
});