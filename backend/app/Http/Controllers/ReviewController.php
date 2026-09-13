<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Room;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // GET /api/rooms/{room}/reviews
    public function index(Room $room)
    {
        return response()->json($room->reviews()->with('user')->latest()->get());
    }

    // POST /api/reviews
    public function store(Request $request)
    {
        $data = $request->validate([
            'room_id' => ['required', 'exists:rooms,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        $review = Review::create([
            'user_id' => $request->user()->id,
            'room_id' => $data['room_id'],
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
        ]);

        return response()->json($review->load('user'), 201);
    }
}