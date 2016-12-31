<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\UserInterface;
use App\Http\Requests\UserRequest;
use App\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use PDOException;

class UserController extends Controller implements UserInterface
{
//    function create()
//    {
//        return view('user.create');
//    }
//
//    function store(UserRequest $request)
//    {
//        // Primero comprobaremos si estamos recibiendo todos los campos.
//if (!$request)
//{
//    // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
//return response()->json(['errors' => array(['code' => 422, 'message' => 'Faltan datos necesarios para el proceso de alta.'])], 422);
//}
//
//// Insertamos una fila en Fabricante con create pasándole todos los datos recibidos.
//// En $request->all() tendremos todos los campos del formulario recibidos.
//$nuevoFabricante = User::create($request->all());
//
//// Más información sobre respuestas en http://jsonapi.org/format/
//// Devolvemos el código HTTP 201 Created – [Creada] Respuesta a un POST que resulta en una creación. Debería ser combinado con un encabezado Location, apuntando a la ubicación del nuevo recurso.
//return response()->json(['status' => 'ok', 'data' => $nuevoFabricante], 201);
//}
//

    function jsonIndex()
    {
        // TODO: Implement index() method.
        $data = User::all();
//        return view('user.index')->with('Users', $dataList);
        return $data;
    }

    function index()
    {
        // TODO: Implement index() method.
        return view('user.index');
    }

    function getAllById($id)
    {
        $data = User::findOrFail($id);
        return $data;
    }


    function create()
    {
        // TODO: Implement create() method.
        return view('user.create');
    }

    function store(UserRequest $request)
    {
        // TODO: Implement store() method.
        try {
            if ($request) {
                $dataStore = User::create($request->all());
                return response()->json(['status' => 'ok', 'data' => $dataStore], 201);
            }
        } catch (PDOException $e) {
            return response()->json(['errors' => ['code' => 422, 'message' => 'Faltan datos necesarios para el proceso de alta.']], 422);
        }
    }

    function show($id)
    {
        // TODO: Implement show() method.
    }

    function edit($id)
    {
        // TODO: Implement edit() method.
        return view('user.edit');
    }

    function update(UserRequest $request, $id)
    {
        // TODO: Implement update() method.
    }

    function destroy($id)
    {
        // TODO: Implement destroy() method.
    }
}
