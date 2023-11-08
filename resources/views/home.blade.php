@extends('layouts.template')

@section('head')
    <script src="{{asset("assets/js/api.js")}}" defer></script>
    <script src="{{asset("assets/js/home.js")}}" defer></script>
    <link rel="stylesheet" href={{asset("assets/css/dashboard.css")}}>
@endsection

@section('content')
    <div id="dashboard">
        <nav id="home-nav"><a href="#dashboard-reservations">Reservations</a><a
                href="#dashboard-historique">Historique</a><a href="#dashboard-infos">Nutrition</a></nav>
        <div><p>Bonjour {{ auth()->user()->Prenom }} {{ auth()->user()->Nom }}.</p>
            <p> Vous avez {{session('solde')}} &euro; sur votre compte</p></div>
        <h2>Réservations</h2>
        <div id="dashboard-reservations">
            @foreach($reservations as $date => $res)
                <article class="reservations">
                    <table>
                        <thead>
                        <tr>
                            <th colspan="2">{{$date}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($res as $repas)
                            <tr>
                                <td rowspan="{{count($repas)}}">{{ $repas[0]->Moment }}</td>
                                <td class="plat">{{ $repas[0]->NomPlat }}</td>
                            </tr>
                            @for($i = 1; $i < count($repas); $i++)
                                <tr>
                                    <td class="plat">{{ $repas[$i]->NomPlat }}</td>
                                </tr>
                            @endfor
                        @endforeach
                        </tbody>
                    </table>
                </article>
            @endforeach
        </div>
        <h2>Historique des transactions</h2>
        <div id="dashboard-historique">
            <section class="historique">
                <table>
                    <thead>
                    <tr>
                        <th colspan="3">Crédits</th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach(array_reverse($transactions) as $t)
                        <tr>
                            <td>{{ $t->Date }}</td>
                            <td>{{ $t->Montant }}</td>
                            <td>{{ $t->Type }}</td>
                        </tr>
                    @endforeach
                </table>
            </section>
            <section class="historique">
                <table>
                    <thead>
                    <tr>
                        <th colspan="3">Débits</th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Moment</th>
                        <th>Montant</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach(array_reverse($transacRes) as $day)
                        @foreach($day as $r)
                            <tr>
                                <td>{{ $r[0]->RepasDate }}</td>
                                <td>{{ $r[0]->Moment }}</td>
                                <td>{{ $r[0]->Prix }} &euro;</td>
                            </tr>
                        @endforeach
                    @endforeach
                    </tbody>
                </table>
            </section>
        </div>
        <h2>Infos nutritionnelles</h2>
        <div id="dashboard-infos">

            <section id="infos-nutritionnelles">

            </section>
        </div>
    </div>

@endsection
