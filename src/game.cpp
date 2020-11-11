#include "game.h"
#include "config.h"

bool game::mouse_Left_Pressed = false;
bool game::mouse_Right_Pressed = false;
int game::mouse_X = 0;
int game::mouse_Y = 0;
bool game::quitGame = false;

bool game::move_Pressed = false;
bool game::key_Menu_Pressed = false;
bool game::key_S = false;
bool game::key_W = false;
bool game::key_A = false;
bool game::key_D = false;
bool game::key_Shift = false;
bool game::key_A_Pressed = false;
bool game::key_D_Pressed = false;

void game::Input()
{
}

void game::MouseInput()
{
}

game::game()
{
	this->quitGame = false;
	SDL_Init(SDL_INIT_VIDEO | SDL_INIT_TIMER | SDL_INIT_AUDIO);

	window = SDL_CreateWindow("game", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, config::SCREEN_WIDTH, config::SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
	if (window == NULL) {
		quitGame = true;
	}

	renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);
	event = new SDL_Event();

	this->key_Menu_Pressed = this->move_Pressed = this->key_S = this->key_W = this->key_A = this->key_D = this->key_Shift = false;
	this->key_A_Pressed = this->key_D_Pressed = this->dir = false;
	this->mouse_X = this->mouse_Y = 0;

	config::keyID_A = SDLK_a;
	config::keyID_S = SDLK_s;
	config::keyID_D = SDLK_d;
	config::keyID_Space = SDLK_SPACE;
	config::keyID_Shift = SDLK_LSHIFT;
}

game::~game()
{
	delete event;
	SDL_DestroyRenderer(renderer);
	SDL_DestroyWindow(window);
}

void game::gameLoop()
{
	while (!quitGame && event->type != SDL_QUIT) {
		//clear screen
		SDL_PollEvent(event);
		SDL_RenderClear(renderer);

		//display new render
		SDL_RenderPresent(renderer);
	}
}

void game::Update()
{
}

void game::Draw()
{
}

void game::resetMove()
{
	this->key_A_Pressed = this->key_D_Pressed = false;
}

void game::resetKeys()
{
	move_Pressed = key_Menu_Pressed = key_S = key_W = key_A = key_D = config::key_Space = key_Shift = key_A_Pressed = key_D_Pressed = false;
}