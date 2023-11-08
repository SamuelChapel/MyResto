<?php

use App\Http\Controllers\APIController;
use App\Http\Controllers\ReservationsController;
use App\Http\Controllers\SalarieController;
use App\Models\API;
use App\Models\Reservations;
use App\Models\Salarie;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/home', fn() => SalarieController::home())->name('home')->middleware('auth');

Route::get('/reservations', fn() => ReservationsController::reservations())->name('reservations')->middleware('auth');

Route::post('/reservations', [ReservationsController::class, 'reservationsPost'])->name('reservationsPost')->middleware('auth');

Route::get('/bourse', fn() => ReservationsController::mealExchange())->name('bourse')->middleware('auth');
Route::post('/bourse', [ReservationsController::class, 'mealExchangePost'])->name('boursePost')->middleware('auth');

Route::get('/plat/{plat}', fn($plat) => response()->json(API::getDishIngredients($plat)));

Route::get('/res', fn() => response()->json(APIController::reservations()))->middleware('auth');

Route::fallback(fn() => to_route('home'))->middleware('auth');

// Route::get('/genToken', fn() => view('generateToken'))->name('genToken');
