@extends('layouts.template')

@section('content')
    @if ($errors->any())
        <div>
            <div><p>Quelque chose s'est mal passé</p></div>

            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div id="login-container">
        <div id="loginBox">
            <form method="POST" action="{{ route('register') }}">
                @csrf

                <div>
                    <label for="token">Jeton
                        <input type="text" name="token" value="{{ old('token') }}" required autofocus>
                    </label>
                </div>

                <div>
                    <label for="Prenom">Prénom
                        <input type="text" name="Prenom" value="{{ old('Prenom') }}" required>
                    </label>
                </div>

                <div>
                    <label for="Nom">Nom
                        <input type="text" name="Nom" value="{{ old('Nom') }}" required>
                    </label>
                </div>
                <div>
                    <label for="email">Email
                        <input type="email" name="email" value="{{ old('email') }}" required>
                    </label>
                </div>

                <div>
                    <label for="password">Mot de passe
                        <input type="password" name="password" required/>
                    </label>
                </div>

                <div>
                    <label for="password_confirmation">Confirmation
                        <input type="password" name="password_confirmation" required>
                    </label>
                </div>

                <div id="btConnexion">
                    <a href="{{ route('login') }}">Déjà enregistré ?</a>
                    <button type="submit">S'inscrire</button>
                </div>
            </form>
        </div>
    </div>
@endsection
