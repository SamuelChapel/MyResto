@extends('layouts.template')

@section('head')
    <script src="./assets/js/cartBourse.js" defer></script>
    <script src="{{asset("assets/js/api.js")}}" defer></script>
@endsection

@section('content')
    <form method="post" action={{route("boursePost")}} id="cart-form">
        @csrf
        <div id="cart" class="hidden">
            <img src="./assets/img/shopping-cart.png" alt="panier" id="cart-img">
            <span id="cart-number">0</span>
            <ul id="cart-list" class="hidden">
            </ul>
        </div>
    </form>
    <div id="contentTitle">
        <h2>Bourse aux repas</h2>
    </div>

    @if(session()->has("resMade"))
        <p>{{session()->get("resMade")}}</p>
    @endif
    <div id="menus">
        @foreach($repasBourse as $date => $res)

            @foreach($res as $repas)
                @foreach($repas as $rep)
                    <div class="menuBox menu {{$rep[0]->RepasDate}} {{$rep[0]->Moment}}">
                        <div id="menu-number">{{$rep[0]->nb}}</div>
                        <table>
                            <thead>
                            <tr>
                                <th colspan="2">{{$date}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td rowspan="{{count($rep)}}">{{ $rep[0]->Moment }}</td>
                                <td class="plat">{{ $rep[0]->plat }}</td>
                            </tr>
                            @for($i = 1; $i < count($rep); $i++)
                                <tr>
                                    <td class="plat">{{ $rep[$i]->plat }}</td>
                                </tr>
                            @endfor
                            <tr><td colspan="2">{{$rep[0]->Prix}} &euro;</td></tr>
                            </tbody>
                        </table>
                        <div>
                            <input type="button" value="Ajouter" class="btn-res valid"
                                   data-res="{{$rep[0]->Id_Formule}}" data-prix="{{$rep[0]->Prix}}"
                                   data-date="{{$rep[0]->RepasDate}}" data-moment="{{$rep[0]->Moment}}">
                        </div>
                    </div>
                @endforeach
            @endforeach
        @endforeach
    </div>
@endsection
