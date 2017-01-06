@extends('layouts.'.$parentLayout)
@section('custom_styles')
@endsection
@section('content')
    <div class="container-fluid" data-form="deleteForm">
        <input name="_token" type="hidden" value="{{ csrf_token() }}">
        <br>
        <div class="col-sm-6 col-sm-offset-3">
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-12 text-center">
                        <h1>{{ strtoupper($data->name) }}</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <br>
                <div class="text-center">
                </div>
                <br>
                <br>
                <p class="text-justify text-muted text-uppercase">{{ $data->lastname }}</p>
                <br>
                <br>
            </div>
            <div class="panel-body row ">
                <div class="col-sm-6 text-left">
                    <a href="{{ route('rIndexUser') }}" class="btn btn-sm btn-default myBtnHoverSuccess"><span
                                class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;list</a>
                    <a href="{{ route('rCreateUser') }}" class="btn btn-sm btn-default myBtnHoverInfo"><span
                                class="glyphicon glyphicon-plus"></span>&nbsp;add</a>
                </div>
                <div class="col-sm-6 text-right">
                    <a href="{{ route('rEditUser',$data->id) }}" class="btn btn-sm btn-default"><span
                                class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;edit</a>

                    <form method="POST" class="action-delete" action="{{ route('rDeleteUser',$data->id) }}"
                          style="display:inline;">
                        <input type="hidden" name="_method" value="DELETE"/>
                        {{ csrf_field() }}
                        <button type="submit" title="Delete the product"
                                class="glyphicon glyphicon-remove btn btn-sm btn-default myBtnHoverDanger"></button>
                    </form>
                </div>
                @include('layouts.firma')
            </div>
        </div>
    </div>
@section('custom_scripts')
@endsection
@endsection