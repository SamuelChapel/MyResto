<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Salarie extends Model
{
    use HasFactory;

    /**
     * @param string $matricule
     * @return string
     */
    public static function getBalanceByUser(string $matricule): string
    {
        return DB::select('SELECT Solde FROM v_soldesalarie WHERE Matricule = ?', [$matricule])[0]->Solde;
    }

    public static function getTransactionsForUser(string $matricule): array
    {
        return DB::select("SELECT t.Horodate as Date, t.Montant, tp.Nom as Type FROM Transaction t
                                 JOIN TypePaiement tp ON t.Id_TypePaiement = tp.Id_TypePaiement
                                 WHERE Matricule = ?
                                 ORDER BY t.Horodate", [$matricule]);
    }
}
