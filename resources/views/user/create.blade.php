@extends('layouts.'.$parentLayout)
@section('custom_styles')
@endsection
@section('content')
    <div class="container-fluid">
        @include('layouts.notifications_flash')

        <div class="col-sm-6 col-sm-offset-3">
            {!! Form::open(['route'=>'rStoreUser','method'=>'POST','class'=>'form-horizontal','files'=>true]) !!}

            <div class="panel panel-default">
                <div class="panel-body ">
                    <div class="panel-heading panel-primary">
                        <label class="text-primary">FORM CREATE</label>
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
                    <div class="form-group-sm">
                        <label class="control-label">email</label>
                        <input name="email" type="text" class="form-control input-sm">
                    </div>
                    <div class="form-group-sm">
                        <label class="control-label">load image</label>
                        <div class="col-sm-12">
                            <div class="row">
                                <label for="idImage" class="btn btn-sm btn-default btn-block">
                                    <input id="idImage" name="image" type="file" class="input-sm">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-body text-right row">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="col-sm-6 text-left">
                                <a href="{{ route('rIndexUser') }}"
                                   class="btn btn-sm btn-default myBtnHoverSuccess"><i
                                            class="glyphicon glyphicon-floppy-saved"></i> List</a>
                            </div>
                            <div class="col-sm-6 text-right">
                                <button type="submit" class="btn btn-sm btn-default myBtnHoverPrimary"><i
                                            class="glyphicon glyphicon-floppy-saved myBtnHoverPrimary"></i> save
                                </button>
                                <button type="reset" class="btn btn-sm btn-default myBtnHoverDanger"><i
                                            class="glyphicon glyphicon-remove myBtnHoverDanger"></i> cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!! Form::close() !!}
        </div>
        <br>
    </div>
@section('custom_scripts')
@endsection
@endsection