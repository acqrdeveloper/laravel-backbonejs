@extends('layouts.'.$parentLayout)
@section('custom_styles')
@endsection
@section('content')
    <div class="container-fluid">
        <div class="col-sm-10 col-sm-offset-1">
            <div class="panel panel-warning">
                <div class="panel-body bg-warning">
                    <div class="col-sm-6 form-inline">
                        <label for="">app:</label>
                        <span class="text-primary">Aplication CRUD - create.read.update.delete</span>
                    </div>
                    <div class="col-sm-6 form-inline">
                        <label>backend:</label>
                        <span class="text-danger">Php<small>&nbsp;7.0.13</small>&nbsp;|&nbsp;Laravel<small>&nbsp;5.3</small></span>
                        <br>
                        <label>frontend:</label>
                        <span class="text-danger">Jquery<small>&nbsp;11.0</small>&nbsp;|&nbsp;Backbonejs<small>&nbsp;5.3</small></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="col-sm-6  text-left">
                            <br>
                            <a href="{{ route('rCreateUser') }}" class="btn btn-sm btn-default myBtnHoverInfo"><span
                                        class="glyphicon glyphicon-plus"></span>&nbsp;add user</a>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        @include('layouts.firma')
                    </div>
                </div>
            </div>
            <br>
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="table">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th width="5%">ID</th>
                                <th width="15%">NAME</th>
                                <th width="20%">LASTNAME</th>
                                <th width="20%">EMAIL</th>
                                <th width="20%">FECHA</th>
                                <th width="20%" class="text-center">ACCION</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($data as $value)
                                <tr>
                                    <td width="5%">{{ $value->id }}</td>
                                    <td width="15%">{{ $value->name }}</td>
                                    <td width="20%">{{ $value->lastname }}</td>
                                    <td width="20%">{{ $value->email }}</td>
                                    <td width="20%">{{ $value->created_at }}</td>
                                    <td width="20%" class="text-center">
                                        <a href="{{ route('rEditUser',$value->id) }}"
                                           class="btn btn-sm btn-default myBtnHoverSuccess "><span
                                                    class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;edit</a>
                                        <a href="{{ route('rShowUser',$value->id) }}"
                                           class="btn btn-sm btn-default myBtnHoverInfo"><span
                                                    class="glyphicon glyphicon-oil"></span>&nbsp;&nbsp;see</a>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@section('custom_scripts')
@endsection
@endsection