#pragma once
#include "header.h"
#include "MenuOption.h"
#include <vector>
class menu
{
public:
	menu();
	~menu(void);

	std::vector<MenuOption*> lMO;

	// ----- ID aktywnego buttona
	int activeMenuOption;
	int numOfMenuOptions;

	virtual void Update();
	virtual void Draw(SDL_Renderer* render);

	// ----- 0 = TOP, 1 = RIGHT, 2 = BOTTOM, 3 = LEFT
	virtual void updateActiveButton(int dir);
};

