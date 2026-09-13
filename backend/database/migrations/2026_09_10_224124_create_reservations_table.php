<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->unsignedInteger('number_of_guests')->default(1);
            $table->string('payment_status')->default('en_attente'); // en_attente, payé
            $table->string('reservation_status')->default('confirmée'); // confirmée, annulée
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};