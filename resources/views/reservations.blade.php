@extends('layouts.template')

@section('head')
    <script src="./assets/js/jquery-3.6.0.js"></script>
    <script src="./assets/js/cart.js" defer></script>
    <script src="{{asset("assets/js/api.js")}}" defer></script>
@endsection

@section('content')
    <form method="post" action={{route("reservationsPost")}} id="cart-form">
        @csrf
        <div id="cart" class="hidden">
            <img src="./assets/img/shopping-cart.png" alt="panier" id="cart-img">
            <span id="cart-number">0</span>
            <ul id="cart-list" class="hidden">
            </ul>
        </div>
    </form>
    <div id="contentTitle">
        <h2>Réservations</h2>
    </div>

    @if(session()->has("resMade"))
        <p>{{session()->get("resMade")}}</p>
    @endif
    <div id="menus">
    @for($i=0; $i< count($reservations); $i++)
            <div class="menuBox" id="menu {{$reservations[$i]->RepasDate}} {{$reservations[$i]->Moment}}">
                    <table>
                        <thead>
                        <tr>
                            <th colspan="2">{{$dateRes[$i]}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td rowspan="5">{{ $reservations[$i]->Moment }}</td>
                            <td class="plat" id="Entree{{$i}}">{{ $reservations[$i]->Entree }}</td>
                        </tr>
                        <tr>
                            <td class="plat" id="Plat{{$i}}">{{ $reservations[$i]->Plat }}</td>
                        </tr>
                        <tr>
                            <td class="plat" id="Accompagnement{{$i}}">{{ $reservations[$i]->Accompagnement }}</td>
                        </tr>
                        <tr>
                            <td class="plat" id="Fromage{{$i}}">{{ $reservations[$i]->Fromage }}</td>
                        </tr>
                        <tr>
                            <td class="plat" id="Dessert{{$i}}">{{ $reservations[$i]->Dessert }}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div>
                        <label>
                            <select name="formule" class="select-formule" id="formule {{$i}}">
                                <option value="{{$i}} En-Cas {{$formules[0]->Prix}} &euro;">En-Cas {{$formules[0]->Prix}} &euro;</option>
                                <option value="{{$i}} Court {{$formules[1]->Prix}} &euro;">Court {{$formules[1]->Prix}} &euro;</option>
                                <option value="{{$i}} Complète {{$formules[2]->Prix}} &euro;">Complète
                                    {{$formules[2]->Prix}} &euro;</option>
                                <option value="{{$i}} Complète++ {{$formules[3]->Prix}} &euro;" selected>Complète ++
                                    {{$formules[3]->Prix}}
                                    &euro;</option>
                            </select>
                        </label>
                        <input type="button" value="Ajouter" class="btn-res valid" data-res="{{$i}}"
                        data-date="{{$reservations[$i]->RepasDate}}" data-moment="{{$reservations[$i]->Moment}}">
                    </div>
            </div>
        @endfor
    </div>
@endsection
