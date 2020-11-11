#pragma once
#include "header.h"

class game
{
private:
	SDL_Window* window;
	SDL_Renderer* renderer;
	SDL_Event* event;

	//input
	static bool move_Pressed,  key_S, key_W, key_A, key_D, key_Shift;
	static bool key_A_Pressed, key_Menu_Pressed, key_D_Pressed;
	bool dir;

	void Input();
	void MouseInput();
	void InputPlayer();
	void InputMenu();
public:

	static bool quitGame;
	static bool mouse_Left_Pressed, mouse_Right_Pressed;
	static int mouse_X, mouse_Y;
	game();
	~game();

	void gameLoop();

	void Update();
	void Draw();

	void resetMove();
	static void resetKeys();
};

