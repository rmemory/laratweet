<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::group(['middleware' => ['auth']], function() {
	Route::get('/', 'TimelineController@index');
	Route::get('/home', 'TimelineController@index');
	Route::post('posts', 'PostController@create');

	Route::get('/users/{user}', 'UserController@index');
});
