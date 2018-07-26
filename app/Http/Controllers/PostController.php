<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
	public function create(Request $request, Post $post) {
		
		// Create post
		$createdPost = $request->user()->posts()->create([
			'body' => $request->body,
		]);

		// Return response of the just created post, with the user
		// information as well
		return response()->json($post->with('user')->find($createdPost->id));
	}
}
