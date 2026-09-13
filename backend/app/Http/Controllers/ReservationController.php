<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    // GET /api/reservations — réservations du client connecté
    public function index(Request $request)
    {
        $reservations = $request->user()
            ->reservations()
            ->with('room')
            ->latest()
            ->get();

        return response()->json($reservations);
    }

    // POST /api/reservations — créer une réservation
    public function store(Request $request)
    {
        $data = $request->validate([
            'room_id' => ['required', 'exists:rooms,id'],
            'check_in_date' => ['required', 'date', 'after_or_equal:today'],
            'check_out_date' => ['required', 'date', 'after:check_in_date'],
            'number_of_guests' => ['required', 'integer', 'min:1'],
        ]);

        $room = Room::findOrFail($data['room_id']);

        $isAvailable = !$room->reservations()
            ->where('reservation_status', 'confirmée')
            ->where('check_in_date', '<', $data['check_out_date'])
            ->where('check_out_date', '>', $data['check_in_date'])
            ->exists();

        if (!$isAvailable) {
            return response()->json([
                'message' => 'Cette chambre n\'est plus disponible sur ces dates.',
            ], 422);
        }

        $reservation = Reservation::create([
            'user_id' => $request->user()->id,
            'room_id' => $room->id,
            'check_in_date' => $data['check_in_date'],
            'check_out_date' => $data['check_out_date'],
            'number_of_guests' => $data['number_of_guests'],
            'payment_status' => 'en_attente',
            'reservation_status' => 'confirmée',
        ]);

        return response()->json($reservation->load('room'), 201);
    }

    // PUT /api/reservations/{id}/pay — simulation du paiement
    public function pay(Request $request, Reservation $reservation)
    {
        if ($reservation->user_id !== $request->user()->id) {
            abort(403);
        }

        $reservation->update(['payment_status' => 'payé']);

        return response()->json($reservation);
    }

    // GET /api/admin/reservations — toutes les réservations (admin)
    public function all(Request $request)
    {
        $this->authorizeAdmin($request);

        $reservations = Reservation::with(['user', 'room'])->latest()->get();

        return response()->json($reservations);
    }

    // PUT /api/admin/reservations/{id} — valider / annuler / clôturer (admin)
    public function updateStatus(Request $request, Reservation $reservation)
    {
        $this->authorizeAdmin($request);

        $data = $request->validate([
            'reservation_status' => ['required', 'string', 'in:confirmée,annulée'],
        ]);

        $reservation->update($data);

        // Si la réservation est annulée ou terminée, on peut libérer la chambre
        if ($data['reservation_status'] === 'annulée') {
            $reservation->room->update(['status' => 'libre']);
        }

        return response()->json($reservation);
    }

    private function authorizeAdmin(Request $request): void
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Accès réservé aux administrateurs.');
        }
    }
}