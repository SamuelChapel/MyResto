<?php
namespace App\Lib;

use Carbon\Carbon;
use Carbon\CarbonImmutable;

class DateHelper{
    public static function getWeekDays(): array
    {
        $now = CarbonImmutable::now();
        if ($now < Carbon::today()->weekday(3)->addHours(8)) {
            $monday = Carbon::today()->endOfWeek()->addDay()->setTime(0, 0, 0, 0);
            $friday = Carbon::today()->endOfWeek()->addDays(5)->setTime(0, 0, 0, 0);
        } else {
            $monday = Carbon::today()->endOfWeek()->addDay(8)->setTime(0, 0, 0, 0);
            $friday = Carbon::today()->endOfWeek()->addDays(12)->setTime(0, 0, 0, 0);
        }

        return [$monday, $friday];
    }

    public static function getDaysBetweenNowAndEndOfWeek(): array
    {
        return [Carbon::today(), CarbonImmutable::today()->startOfWeek()->addDays(4)->setTime(0, 0, 0, 0)];
    }
}
