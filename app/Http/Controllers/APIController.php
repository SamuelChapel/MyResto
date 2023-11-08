<?php

namespace App\Http\Controllers;

use App\Models\API;
use Illuminate\Http\Request;

class APIController extends Controller
{
    public static function reservations(): array
    {
        $monthIng = API::getIngredientsByMonth(auth()->user()->Matricule);

        $result = [];
        foreach ($monthIng as $element) {
            $result["$element->month"][] = $element;
        }

        return $result;
    }
}
