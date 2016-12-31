<?php
/**
 * Created by PhpStorm.
 * User: QuispeRoque
 * Date: 18/12/16
 * Time: 07:47
 */

namespace App\Http\Interfaces;


use App\Http\Requests\UserRequest;

interface UserInterface
{
    function  index();
    function create();
    function store(UserRequest $request);
    function show($id);
    function edit($id);
    function update(UserRequest $request,$id);
    function destroy($id);
}