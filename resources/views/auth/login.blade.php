@extends('layouts.template')

@section('content')
    <div id="login-container">
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

        <div id="loginBox">
            <form method="POST" action="{{ route('login') }}">
                @csrf
                <div>
                    <label for="email">Email
                        <input type="email" name="email" value="{{ old('email') }}" required autofocus>
                    </label>
                </div>
                <div>
                    <label for="password">Mot de passe
                        <input type="password" name="password" required>
                    </label>
                </div>
                <div id="btConnexion">
                    <a href={{ route('register') }}>S'enregistrer</a>
                    <input type="submit" value="Connexion">
                </div>
            </form>
        </div>
    </div>

    <div id="menus">
        @foreach($todayMenus as $menu)
            <div class="menuBox">
                <table>
                    <thead>
                    <tr>
                        <th colspan="2">{{$date}}</th>
                    </tr>

                    </thead>
                    <tbody>
                    <tr>
                        <td rowspan="5">{{ $menu->Moment }}</td>
                        <td>{{ $menu->Entree }}</td>
                    </tr>
                    <tr>
                        <td>{{ $menu->Plat }}</td>
                    </tr>
                    <tr>
                        <td>{{ $menu->Accompagnement }}</td>
                    </tr>
                    <tr>
                        <td>{{ $menu->Fromage }}</td>
                    </tr>
                    <tr>
                        <td>{{ $menu->Dessert }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        @endforeach
    </div>
@endsection
