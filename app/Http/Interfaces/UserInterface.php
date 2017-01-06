<?php
/**
 * Created by PhpStorm.
 * User: QuispeRoque
 * Date: 18/12/16
 * Time: 07:47
 */

namespace App\Http\Interfaces;


use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;

interface UserInterface
{
    function index(Request $request);

    function create(Request $request);

    function store(UserRequest $request);

    function show(Request $request, $id);

    function edit(Request $request, $id);

    function update(UserRequest $request, $id);

    function destroy($id);
}