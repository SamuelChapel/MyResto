<?php

namespace App\Http\Controllers;

use App\Lib\DateHelper;
use App\Models\Reservations;
use App\Models\Salarie;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SalarieController extends Controller
{
    public static function home(): View
    {
        $matricule = auth()->user()->Matricule;

        $solde = Salarie::getBalanceByUser($matricule);
        session()->put('solde', $solde);

        $dates = DateHelper::getDaysBetweenNowAndEndOfWeek();
        $reservations = Reservations::getReservations($matricule, $dates[0]);

        foreach ($reservations as $res) {
            $res->RepasDate = Carbon::make($res->RepasDate)->isoFormat('dddd D MMMM YYYY');
        }

        $result = [];
        foreach ($reservations as $element) {
            $result["$element->RepasDate"]["$element->Id_Moment"][] = $element;
        }

        $transacRes = Reservations::getReservations($matricule);

        $transacResult = [];
        foreach ($transacRes as $element) {
            $transacResult["$element->RepasDate"]["$element->Id_Moment"][] = $element;
        }

        $transactions = Salarie::getTransactionsForUser($matricule);

        return view('home', ['reservations' => $result, 'transactions' => $transactions, 'transacRes' => $transacResult]);
    }

    public static function login(): View
    {
        $todayMenus = Reservations::getTodayMenus();
        $date = Carbon::make($todayMenus[0]->RepasDate)->isoFormat('dddd D MMMM YYYY');
        return view('auth.login', ['todayMenus' => $todayMenus, 'date' => $date]);
    }


}
