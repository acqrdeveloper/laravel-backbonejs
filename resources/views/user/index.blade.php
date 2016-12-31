@extends('layouts.master')
@section('custom_styles')
@endsection
@section('content')

    <div>
        <table class=" table table-hover">
            <tbody id="midiv">

            </tbody>
        </table>
    </div>


    @include('template/user_template')
@section('custom_scripts')
    <script src="{{ asset('js/user_controller.js') }}"></script>
    {{--    <script src="{{ asset('js/models/user_model.js') }}"></script>--}}
    {{--    <script src="{{ asset('js/collections/users_collection.js') }}"></script>--}}
    <script src="{{ asset('js/views/user_view.js') }}"></script>
    <script src="{{ asset('js/utils.js') }}"></script>
@endsection
@endsection