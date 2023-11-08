<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Rules\Token;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Support\Facades\DB;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param array $input
     * @return \App\Models\User
     */
    public function create(array $input): User
    {
        $matricule = DB::table('users')->max('id') + 1;

        // dd($input);

        Validator::make($input, [
            'Nom' => ['required', 'string', 'max:255'],
            'Prenom' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'token' => new Token(),
        ])->validate();

        DB::delete("DELETE FROM token WHERE uid = ?", [$input['token']]);

        return User::create([
            'Matricule' => sprintf('%04d', $matricule),
            'Nom' => strtoupper($input['Nom']),
            'Prenom' => ucfirst($input['Prenom']),
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'EstActif' => 1,
            'Id_Grade' => 1,
        ]);
    }
}
