<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href={{asset("assets/css/style.css")}}>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.js"
            integrity="sha512-Lii3WMtgA0C0qmmkdCpsG0Gjr6M0ajRyQRQSbTF6BsrVh/nhZdHpVZ76iMIPvQwz1eoXC3DmAg9K51qT5/dEVg=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script defer src="assets/js/script.js"></script>
    @yield('head')
    <title>My Resto</title>
</head>

<body>

<input type="button" id="myBtn" title="Go to top" value="&uarr;">

<header>
    <h1>My Resto</h1>
    <div>
        <div id="log-infos">
            @auth
                {{ auth()->user()->Prenom }} - Solde : {{ session('solde') ?? 0 }} &euro;
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <input type="submit" class="btn-deco" value="Se déconnecter">
                </form>
            @endauth
        </div>
        <nav id="navList">
            @auth
            <a href={{ route('home') }} >Dashboard</a>
            <a href={{ route('reservations') }}>Réserver</a>
            <a href={{ route('bourse') }}>Bourse</a>
            @endauth
        </nav>
    </div>
</header>
<main>
    @yield('content')
</main>
<footer>
    <div>&copy; 2022 - Samuel CHAPEL</div>
</footer>
</body>

</html>
