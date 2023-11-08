<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Integer;

class Reservations extends Model
{
    use HasFactory;

    public static function getMenusAvailableForUser(string $matricule, string $dateDebut, string $dateFin): array
    {
        return DB::select("SELECT m.RepasDate, m.Id_Moment, m.Moment, m.Id_Plat_Entree, m.Entree, m.Id_Plat_Principal,
         m.Plat, m.Id_Plat_Accompagnement, m.Accompagnement, m.Id_Plat_Fromage, m.Fromage, m.Id_Plat_Dessert, m.Dessert
        FROM v_affichermenu m
        LEFT JOIN (SELECT RepasDate, Id_Moment FROM Reservation WHERE Matricule = ?) r
        ON r.Id_Moment = m.Id_Moment AND r.RepasDate = m.RepasDate
            WHERE m.RepasDate BETWEEN ? AND ?
            AND r.Id_Moment IS NULL", [$matricule, $dateDebut, $dateFin]);
    }

    public static function getTodayMenus(): array
    {
        return DB::select("SELECT m.RepasDate, m.Id_Moment, m.Moment, m.Id_Plat_Entree, m.Entree, m.Id_Plat_Principal,
         m.Plat, m.Id_Plat_Accompagnement, m.Accompagnement, m.Id_Plat_Fromage, m.Fromage, m.Id_Plat_Dessert, m.Dessert FROM v_affichermenu m WHERE RepasDate >= CURDATE() LIMIT 2");
    }

    public static function getReservations(string $matricule, string $dateDebut = '01-01-2020'): array
    {
        return DB::select("SELECT r.RepasDate, r.Id_Moment, M2.Nom as Moment, r.Prix, me.Nom as NomPlat
                                 FROM Reservation r
                                 JOIN Moment M2 on r.Id_Moment = M2.Id_Moment
                                 JOIN FormuleType ft on r.Id_Formule = ft.Id_Formule
                                 JOIN (SELECT m.RepasDate, m.Id_Moment, ps.Id_Sorte, p.Nom FROM Menu m
                                       JOIN PlatSorte ps on m.Id_Plat = ps.Id_Plat
                                       JOIN Plat p on m.Id_Plat = p.Id_Plat) me
                                 ON me.RepasDate = r.RepasDate AND r.Id_Moment = me.Id_Moment AND me.Id_Sorte = ft.Id_Sorte
                                 WHERE Matricule = ? AND r.RepasDate >= ?
                                 ORDER BY r.RepasDate, r.Id_Moment, ft.Id_Sorte", [$matricule, $dateDebut]);
    }

    public static function getFormula(): array
    {
        return DB::select("SELECT Id_Formule, Nom, Prix FROM Formule");
    }

    public static function setReservation(string $matricule, int $Id_Formule, int $Id_Moment, string $RepasDate,
                                          float  $Prix): bool
    {
        return DB::insert("INSERT INTO Reservation (Matricule, Id_Formule, Id_Moment, RepasDate, EstEnBourse, HorodatePassage, Prix)
                              VALUES (?, ?, ?, ?, 0, null, ?)",
            [$matricule, $Id_Formule, $Id_Moment, $RepasDate, $Prix]);
    }

    public static function updateReservation(string $matricule, int $Id_Formule, int $Id_Moment, string $RepasDate):
    bool
    {
        return DB::update("UPDATE Reservation SET Id_Formule = ? WHERE Matricule = ? AND RepasDate = ? AND Id_Moment = ? ",
            [$Id_Formule, $matricule, $RepasDate, $Id_Moment]);
    }



    /**
     * @param string $matricule
     * @param string $dateDebut
     * @return array
     */
    public static function getMealsExchange(string $matricule, string $dateDebut): array
    {
        return DB::select("SELECT r.RepasDate, mo.Nom as Moment, ft.Id_Formule,r.Id_Moment, me.plat, r.Prix,
                                (SELECT Count(r2.Matricule) FROM Reservation r2 WHERE r2.RepasDate = r.RepasDate AND r2.Id_Moment = r.Id_Moment AND ft.Id_Formule = r2.Id_Formule) as nb
                                FROM Reservation r
                                LEFT JOIN (SELECT RepasDate, Id_Moment FROM Reservation WHERE Matricule = ?) r3 USING (RepasDate, Id_Moment)
                                        JOIN Moment mo on r.Id_Moment = mo.Id_Moment
                                        JOIN FormuleType ft on r.Id_Formule = ft.Id_Formule
                                JOIN (SELECT m.RepasDate, m.Id_Moment, ps.Id_Sorte, p.Nom as plat FROM Menu m
                                        JOIN PlatSorte ps on m.Id_Plat = ps.Id_Plat
                                        JOIN Plat p on m.Id_Plat = p.Id_Plat
                                        ORDER BY m.RepasDate, m.Id_Moment, ps.Id_Sorte) me
                                ON me.RepasDate = r.RepasDate AND r.Id_Moment = me.Id_Moment AND me.Id_Sorte = ft.Id_Sorte
                                WHERE EstEnBourse = 1 AND r3.RepasDate IS NULL AND r.RepasDate >= ?
                                GROUP BY r.RepasDate, mo.Nom, r.Id_Moment, me.plat, ft.Id_Formule, r.Prix
                                ORDER BY r.RepasDate, r.Id_Moment, ft.Id_Formule, me.Id_Sorte", [$matricule, $dateDebut]);
    }

    public static function getReservationInMealExchange(string $matricule, string $date, string $moment, float $prix)
    {
        return DB::select("SELECT r.Matricule, r.RepasDate, r.Id_Moment, r.Id_Formule, r.EstEnBourse, r.Prix
                                FROM Reservation r
                                LEFT JOIN (SELECT * FROM Reservation WHERE Matricule = ?) r2 USING (RepasDate, Id_Moment)
                                JOIN Moment m on r.Id_Moment = m.Id_Moment
                                WHERE r.EstEnBourse = 1 AND r2.RepasDate IS NULL AND r.RepasDate = ?
                                AND m.Nom = ? AND r.Prix = ?", [$matricule, $date, $moment, $prix]);
    }

    public static function updateReservationInMealExchange(string $newMatricule, string $date, string $id_moment,
                                                           string $oldMatricule)
    {
        return DB::update("UPDATE Reservation SET Matricule = ?, EstEnBourse = 0 WHERE Matricule = ? AND RepasDate = ? AND Id_Moment = ?",
            [$newMatricule, $oldMatricule, $date, $id_moment]);
    }
}
