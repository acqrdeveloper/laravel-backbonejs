@extends('layouts.master')
@section('custom_styles')
@endsection
@section('content')


    <h1>HOLA</h1>
    <form id="add">
        <label>Title</label>
        <input id="title" type="text"/>
        <label>Price</label>
        <input id="price" type="text"/>
        <input type="submit" value="save"/>
    </form>

    <form id="filter">
        <label>Less Than</label>
        <input type="text" id="less-than"/>
        <input type="submit" value="Filter"/>
    </form>


    <a href="#" id="clear-filter">Clear Filter</a>
    <h1>here table</h1>
    <table class="table table-striped">
        <tbody id="idTbody">

        </tbody>
    </table>
    </div>

    <div id="yourcart">


    </div>
@section('custom_scripts')
    <?php
    require_once base_path() . "/resources/views/templates/user.tpl.php";
    ?>
@endsection
@endsection