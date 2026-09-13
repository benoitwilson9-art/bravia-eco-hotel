<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $query = Room::query();

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }

        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        // Filtre de disponibilité : exclut les chambres réservées sur la période demandée
        if ($request->filled('check_in') && $request->filled('check_out')) {
            $checkIn = $request->check_in;
            $checkOut = $request->check_out;

            $query->whereDoesntHave('reservations', function ($q) use ($checkIn, $checkOut) {
                $q->where('reservation_status', 'confirmée')
                    ->where('check_in_date', '<', $checkOut)
                    ->where('check_out_date', '>', $checkIn);
            });
        }

        return response()->json($query->paginate(9));
    }

    public function show(Room $room)
    {
        return response()->json($room->load(['reviews.user']));
    }

    public function store(Request $request)
    {
        $this->authorizeAdmin($request);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:libre,occupée,nettoyage'],
        ]);

        $room = Room::create($data);

        return response()->json($room, 201);
    }

    public function update(Request $request, Room $room)
    {
        $this->authorizeAdmin($request);

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'type' => ['sometimes', 'string', 'max:255'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', 'string', 'in:libre,occupée,nettoyage'],
        ]);

        $room->update($data);

        return response()->json($room);
    }

    public function destroy(Request $request, Room $room)
    {
        $this->authorizeAdmin($request);

        $room->delete();

        return response()->json(['message' => 'Chambre supprimée.']);
    }

    private function authorizeAdmin(Request $request): void
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Accès réservé aux administrateurs.');
        }
    }
}