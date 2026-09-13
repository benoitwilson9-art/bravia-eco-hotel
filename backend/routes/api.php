<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

// Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Chambres — lecture publique
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{room}', [RoomController::class, 'show']);
Route::get('/rooms/{room}/reviews', [ReviewController::class, 'index']);

// Routes protégées (connexion requise)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::put('/reservations/{reservation}/pay', [ReservationController::class, 'pay']);

    Route::post('/reviews', [ReviewController::class, 'store']);

    // Routes admin (chambres)
    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{room}', [RoomController::class, 'update']);
    Route::delete('/rooms/{room}', [RoomController::class, 'destroy']);

    // Routes admin (réservations)
    Route::get('/admin/reservations', [ReservationController::class, 'all']);
    Route::put('/admin/reservations/{reservation}', [ReservationController::class, 'updateStatus']);
});