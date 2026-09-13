<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        Room::create([
            'name' => 'Chambre Classique',
            'type' => 'Classique',
            'price' => 35000,
            'description' => 'Lit double, bureau, climatisation et vue sur la ville.',
            'status' => 'libre',
        ]);

        Room::create([
            'name' => 'Suite Lounge',
            'type' => 'Suite',
            'price' => 55000,
            'description' => 'Coin salon, kitchenette et espace de travail séparé.',
            'status' => 'libre',
        ]);

        Room::create([
            'name' => 'Chambre Supérieure',
            'type' => 'Supérieure',
            'price' => 45000,
            'description' => 'Literie premium, tête de lit capitonnée et coin bureau.',
            'status' => 'libre',
        ]);
    }
}