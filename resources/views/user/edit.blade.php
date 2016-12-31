@extends('layouts.master')
@section('custom_styles')
@endsection
@section('content')
    <div class="container-fluid">
        <div class="col-sm-6 col-sm-offset-3">
            {{--<form id="frmCreate" action="" role="form" class="form-horizontal">--}}
            {!! Form::open(['route'=>'rStore','method'=>'POST','class'=>'form-horizontal']) !!}
            <div class="panel panel-default">
                <div class="panel-body ">
                    <div class="panel-heading panel-primary">
                        <label class="text-primary">FORM EDIT</label>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="form-group-sm">
                        <label class="control-label">name</label>
                        <input name="name" type="text" class="form-control input-sm">
                    </div>
                    <div class="form-group-sm">
                        <label class="control-label">lastname</label>
                        <input name="lastname" type="text" class="form-control input-sm">
                    </div>
                    <div class="row">
                        <div class="form-group-sm col-sm-6">
                            <label class="control-label">age</label>
                            <input name="age" type="text" class="form-control input-sm">
                        </div>
                        <div class="form-group-sm col-sm-6">
                            <label class="control-label">direction</label>
                            <input name="direction" type="text" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="form-group-sm">
                        <label class="control-label">email</label>
                        <input name="email" type="text" class="form-control input-sm">
                    </div>
                    <div class="form-group-sm">
                        <label class="control-label">password</label>
                        <input name="password" type="text" class="form-control input-sm">
                    </div>
                </div>
                <div class="panel-body text-right">
                    <button type="submit" class="btn btn-sm btn-default myBtnHoverPrimary"><i
                                class="glyphicon glyphicon-floppy-saved myBtnHoverPrimary"></i> save
                    </button>
                    <button class="btn btn-sm btn-default myBtnHoverDanger"><i
                                class="glyphicon glyphicon-remove myBtnHoverDanger"></i> cancel
                    </button>
                </div>
            </div>
            {!! Form::close() !!}
            {{--</form>--}}
        </div>
    </div>
@section('custom_scripts')
@endsection
@endsection