@extends('layouts.template')

@section('content')
<?php
    for($i=0;$i<20;$i++){
        $token = openssl_random_pseudo_bytes(10);
        $token = bin2hex($token);
        echo $token . '<br>';
    }
?>

@endsection
