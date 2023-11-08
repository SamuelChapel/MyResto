<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class API extends Model
{
    use HasFactory;

    public static function getDishIngredients(string $dish){
        return DB::select("SELECT C.Id_Ingredient as id, I.Nom as nom, C.IngQtPlat as quantite, IU.Nom as unite FROM Plat P
                                JOIN Compose C ON P.Id_Plat = C.Id_Plat
                                JOIN Ingredient I ON C.Id_Ingredient = I.Id_Ingredient
                                JOIN IngUnite  IU ON I.Id_IngUnite = IU.Id_IngUnite
                                WHERE P.Nom LIKE ?", [$dish]);
    }

    /**
     * Method for retrieving ingredients and their quantities for an employee according to his reservations,
     * grouped by month
     *
     * @param string $matricule
     * @return array
     */
    public static function getIngredientsByMonth(string $matricule): array
    {
        return DB::select("SELECT DATE_FORMAT(r.RepasDate, '%Y %m') as month, me.Nom as ingredient,
                                                    sum(me.quantite) as quantite, me.unite
                                 FROM Reservation r
                                 JOIN Moment M2 on r.Id_Moment = M2.Id_Moment
                                 JOIN FormuleType ft on r.Id_Formule = ft.Id_Formule
                                 JOIN (SELECT m.RepasDate, m.Id_Moment, ps.Id_Sorte, i.Nom, c.IngQtPlat as quantite,
                                              iu.Nom as unite FROM Menu m
                                       JOIN PlatSorte ps on m.Id_Plat = ps.Id_Plat
                                       JOIN Plat p on m.Id_Plat = p.Id_Plat
                                       JOIN Compose c on p.Id_Plat = c.Id_Plat
                                       JOIN Ingredient i on c.Id_Ingredient = i.Id_Ingredient
                                       JOIN IngUnite iu on i.Id_IngUnite = iu.Id_IngUnite) me
                                 ON me.RepasDate = r.RepasDate AND r.Id_Moment = me.Id_Moment AND me.Id_Sorte = ft.Id_Sorte
                                 WHERE Matricule = ?
                                 GROUP BY month, ingredient
                                 ORDER BY month, ingredient", [$matricule]);
    }
}
