<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('layouts.master');
});

Route::get('create','UserController@create')->name('rCreate');
Route::post('create','UserController@store')->name('rStore');

Route::get('index','UserController@index')->name('rIndex');
Route::get('jsonIndex','UserController@jsonIndex')->name('rJsonIndex');
Route::get('allId/{id}','UserController@getAllById')->name('rAllId');