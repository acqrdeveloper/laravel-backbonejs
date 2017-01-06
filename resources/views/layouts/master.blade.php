<!doctype html>
<html lang="en">
<head>
    <title>app-Laravel</title>
    <meta charset="UTF-8">
    <meta name="description" content="Laravel">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Store CSRF token for AJAX calls -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {{ csrf_field() }}

    <link rel="stylesheet" href="">
    <!-- Dependencias -->
    <script src="{{ asset('bower_components/jquery/dist/jquery.js') }}"></script>
    <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.js') }}"></script>
    <!-- Custom Styles and Scripts -->
{{--    <link rel="stylesheet" href="{{ asset('css/sb-admin-2.css') }}">--}}
    <link rel="stylesheet" href="{{ asset('css/custom_styles.css') }}">
{{--    <link rel="stylesheet" href="{{ asset('css/main.min.css') }}">--}}
{{--    <link rel="stylesheet" href="{{ asset('bower_components/fontawesome/css/font-awesome.css') }}">--}}

    <link rel="stylesheet" href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.css') }}">
    <link href="{{ asset('/js/lib/toastr/build/toastr.css') }}" rel="stylesheet">

    <script src="{{ asset('/js/lib/requirejs/require.js') }}" data-main="{{ asset('js/main.js') }}"></script>
    @yield('custom_styles')
</head>
<body data-rooturl="{{ Request::root() }}">
<br>
<div class="col-xs-12 col-sm-8 col-sm-offset-2 text-center" id="content-bar-message">
    <div id="bar-message" class="hidden"></div>
</div>
<div class="container" id="page-content">
    @include('layouts.notifications_request')
    @include('layouts.notifications_flash')
    @yield('content')
</div>
@yield('custom_scripts')
</body>
</html>




