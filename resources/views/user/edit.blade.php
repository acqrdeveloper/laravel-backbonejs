@extends('layouts.'.$parentLayout)
@section('custom_styles')
@endsection
@section('content')
    <div class="container-fluid">
        <div class="col-sm-6 col-sm-offset-3">
            <form  action="{{ route('rUpdateUser',$data->id) }}" class="form-horizontal action-edit" method="post">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="_method" value="PUT">
                {{ csrf_field() }}

                <div class="panel panel-default">
                    <div class="panel-body ">
                        <div class="panel-heading panel-primary">
                            <label class="text-primary">FORM EDIT</label>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="form-group-sm">
                            <label class="control-label">name</label>
                            <input name="name" type="text" class="form-control input-sm " value="{{ $data->name }}">
                        </div>
                        <div class="form-group-sm">
                            <label class="control-label">lastname</label>
                            <input name="lastname" type="text" class="form-control input-sm"
                                   value="{{ $data->lastname }}">
                        </div>
                        <div class="form-group-sm">
                            <label class="control-label">email</label>
                            <input name="email" type="text" class="form-control input-sm" value="{{ $data->email }}">
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
                                    <button type="submit" name="submit"
                                            class="btn btn-sm btn-default myBtnHoverPrimary"><i
                                                class="glyphicon glyphicon-floppy-saved myBtnHoverPrimary"></i> update
                                    </button>
                                    <button type="reset" class="btn btn-sm btn-default myBtnHoverDanger">cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@section('custom_scripts')
@endsection
@endsection