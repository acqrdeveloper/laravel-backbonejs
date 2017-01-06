<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\UserInterface;
use App\Http\Requests\UserRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Intervention\Image\Facades\Image;
use PDOException;

class UserController extends Controller implements UserInterface
{
    // TODO: Implement create() method.
    function create(Request $request)
    {
        return $this->goview('user.create', $request);
    }

    // TODO: Implement index() method.
    function index(Request $request)
    {
        $data = User::all();
        return $this->goview('user.index', $request)->with('data', $data);
    }

    function saveImage($image, $path, $requestImage)
    {
        //todo >> Guardar Original
        $dateFormat = date("dmyhis");
        //todo >> Cambiar de tamaño
        $image->resize(240, 200);
        $image->save($path . $dateFormat . '_' . $requestImage->getClientOriginalName());
        $setImage = $dateFormat . '_' . $requestImage->getClientOriginalName();
        return $setImage;
    }

    // TODO: Implement store() method.
    function store(UserRequest $request)
    {
        try {
            $user = new User();
            $user->fill($request->only($user->getFillable()));
            $user->save();
            flash('created successfully', 'success');
            return redirect()->route('rIndexUser');
        } catch (PDOException $e) {
            return redirect()->back()->withErrors(['errors' => $e->getMessage()]);
        }
    }

    // TODO: Implement show() method.
    function show(Request $request, $id)
    {
        $data = User::findOrFail($id);
        return $this->goview('user.show', $request)->with('data', $data);
    }

    // TODO: Implement edit() method.
    function edit(Request $request, $id)
    {
        try {
            $data = User::findOrFail($id);
            return $this->goview('user.edit', $request)->with('data', $data);
        } catch (PDOException $e) {
            return redirect()->back()->withErrors('msg_errors', $e->getMessage() . ' - ' . $e->getLine());
        }
    }

    // TODO: Implement update() method.
    function update(UserRequest $request, $id)
    {
        try {
            $data = User::findOrFail($id);
            $data->fill($request->only($data->getFillable()));
            $data->save();
            flash("updated successfully", "success");
            return redirect()->route('rIndexUser');
        } catch (PDOException $e) {
            return redirect()->back()->withErrors('msg_errors', $e->getMessage() . ' - ' . $e->getLine());
        }
    }

    // TODO: Implement destroy() method.
    function destroy($id)
    {
        try {
            User::destroy($id);
            flash("deleted successfully", "success");
            return redirect()->route('rIndexUser');
        } catch (PDOException $e) {
            return redirect()->back()->withErrors('msg_errors', $e->getMessage() . ' - ' . $e->getLine());
        }
    }
}
