<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Bravia',
            'email' => 'admin@bravia.tg',
            'password' => Hash::make('admin1234'),
            'role' => 'admin',
        ]);

        $this->call(RoomSeeder::class);
    }
}