<?php

namespace App\Http\Controllers;

use App\Models\Reservations;
use App\Models\Salarie;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Carbon\CarbonInterface;
use Carbon\Exceptions\BadComparisonUnitException;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\DB;
use App\Lib\DateHelper;

class ReservationsController extends Controller
{
    /**
     * Reservation GET page
     *
     * @return View
     */
    public static function reservations(): View
    {
        $solde = Salarie::getBalanceByUser(auth()->user()->Matricule);
        session()->put('solde', $solde);

        $daysReservations = DateHelper::getWeekDays();
        session()->put('daysReservations', $daysReservations);

        $reservations = Reservations::getMenusAvailableForUser(auth()->user()->Matricule, $daysReservations[0],
            $daysReservations[1]);

        session()->put('reservations', $reservations);

        Reservations::getFormula();
        session()->put('formules', Reservations::getFormula());

        $dateRes = [];
        foreach ($reservations as $res) {
            $dateRes[] = Carbon::make($res->RepasDate)->isoFormat('dddd D MMMM YYYY');
        }

        return view('reservations', ['reservations' => $reservations, 'dateRes' => $dateRes, 'formules' =>
        session('formules')]);
    }

    public static function reservationsPost(Request $request): RedirectResponse|Redirector
    {
        $i = 0;

        $menus = session('reservations');
        $formules = Reservations::getFormula();

        $dates = session('daysReservations');
        $reservations = Reservations::getReservations(dd(auth()->user()->Matricule,$dates[0], $dates[1]));

        $oldSolde = Salarie::getBalanceByUser(auth()->user()->Matricule);
        $newSolde = $oldSolde;

        $count = [0, 0];

        while ($request->get($i) != null) {
            $data = explode(" ", $request->get($i));

            $menu = current(array_filter($menus, fn($r) => $r->RepasDate == $data[0] && $r->Moment == $data[1]));

            $form = current(array_filter($formules, fn($f) => $f->Nom == $data[2]));

            $res = current(array_filter($reservations, fn($r) => $r->RepasDate == $data[0] && $r->Moment == $data[1]));

            if ($res != null && $newSolde > ($form->Prix - $res->Prix)) {
                $nb = Reservations::updateReservation(auth()->user()->Matricule, $form->Id_Formule, $menu->Id_Moment,
                    $menu->RepasDate);

                $nb != 0 ? $count[0] += $nb : $count[1]++;

                $newSolde -= $form->Prix - $res->Prix;
            } else if ($res == null && $newSolde > $form->Prix) {
                $nb = Reservations::setReservation(auth()->user()->Matricule, $form->Id_Formule, $menu->Id_Moment,
                    $menu->RepasDate, $form->Prix);

                $nb != 0 ? $count[0] += $nb : $count[1]++;

                $newSolde -= $form->Prix;
            }

            $i++;
        }

        $message = "";
        $total = $oldSolde - $newSolde;
        if($count[0] > 0) $message = "${count[0]} réservations bien effectuée" . ($count[0] > 1 ? "s" : "") . ".";
        if($count[1] > 0) $message .= " ${count[1]} réservations non validées.";
        if($total > 0) $message .= " Le montant total des réservations est de ${total}€";
        session()->flash("resMade", $message);

        $solde = Salarie::getBalanceByUser(auth()->user()->Matricule);
        session()->put('solde', $solde);

        return redirect(route('reservations'));
    }

    public static function mealExchange(): View
    {
        $solde = Salarie::getBalanceByUser(auth()->user()->Matricule);
        session()->put('solde', $solde);

        $repasBourse = Reservations::getMealsExchange(auth()->user()->Matricule, CarbonImmutable::now());

        $dateBourse = [];
        foreach ($repasBourse as $res) {
            $dateBourse[] = Carbon::make($res->RepasDate)->isoFormat('dddd D MMMM YYYY');
        }

        $result = [];
        foreach ($repasBourse as $element) {
            $result[Carbon::make($element->RepasDate)->isoFormat('dddd D MMMM YYYY')]["$element->Id_Moment"]["$element->Id_Formule"][] = $element;
        }
        session()->put('repasBourse', $result);

        // dd($result);
        return view('bourse', ['repasBourse' => session('repasBourse'), 'dateBourse' => $dateBourse]);
    }

    public static function mealExchangePost(Request $request)
    {
        $i = 0;
        while ($request->get($i) != null) {
            $data = explode(" ", $request->get($i));

            $res = Reservations::getReservationInMealExchange(auth()->user()->Matricule, $data[0], $data[1], $data[2]);

            if($res > 0){
                Reservations::updateReservationInMealExchange(auth()->user()->Matricule, $res[0]->RepasDate,
                    $res[0]->Id_Moment, $res[0]->Matricule);
            }
            $i++;
        }

        return redirect(route('bourse'));
    }
}
