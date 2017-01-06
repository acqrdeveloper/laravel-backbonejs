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


Route::get('/', 'UserController@index')->name('rIndexUser');
Route::get('index', 'UserController@index')->name('rIndexUser');
Route::get('create', 'UserController@create')->name('rCreateUser');
Route::get('show/{id}', 'UserController@show')->name('rShowUser');
Route::get('edit/{id}', 'UserController@edit')->name('rEditUser');
Route::post('store', 'UserController@store')->name('rStoreUser');
Route::put('update/{id}', 'UserController@update')->name('rUpdateUser');
Route::delete('delete/{id}', 'UserController@destroy')->name('rDeleteUser');