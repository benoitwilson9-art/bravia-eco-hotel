<?php

namespace Tests\Feature;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_un_client_peut_reserver_une_chambre_disponible(): void
    {
        $user = User::factory()->create(['role' => 'client']);
        $room = Room::create([
            'name' => 'Chambre Test',
            'type' => 'Classique',
            'price' => 30000,
            'status' => 'libre',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/reservations', [
            'room_id' => $room->id,
            'check_in_date' => now()->addDay()->toDateString(),
            'check_out_date' => now()->addDays(3)->toDateString(),
            'number_of_guests' => 2,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('reservations', [
            'room_id' => $room->id,
            'user_id' => $user->id,
            'reservation_status' => 'confirmée',
        ]);
    }

    public function test_une_chambre_deja_reservee_sur_les_memes_dates_est_refusee(): void
    {
        $user = User::factory()->create(['role' => 'client']);
        $autreUser = User::factory()->create(['role' => 'client']);
        $room = Room::create([
            'name' => 'Chambre Test',
            'type' => 'Classique',
            'price' => 30000,
            'status' => 'libre',
        ]);

        Reservation::create([
            'user_id' => $autreUser->id,
            'room_id' => $room->id,
            'check_in_date' => now()->addDay()->toDateString(),
            'check_out_date' => now()->addDays(3)->toDateString(),
            'number_of_guests' => 1,
            'payment_status' => 'payé',
            'reservation_status' => 'confirmée',
        ]);

        Sanctum::actingAs($user);

        $response = $this->postJson('/api/reservations', [
            'room_id' => $room->id,
            'check_in_date' => now()->addDay()->toDateString(),
            'check_out_date' => now()->addDays(2)->toDateString(),
            'number_of_guests' => 1,
        ]);

        $response->assertStatus(422);
    }
}