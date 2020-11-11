#pragma once
#include "header.h"
#include "menuOption.h"
#include <vector>
class menu
{
public:
	menu();
	~menu(void);

	std::vector<MenuOption*> listOfMenuOption;

	int activeMenuOption;
	int numOfMenuOptions;

	virtual void Update();
	virtual void Draw(SDL_Renderer* render);

	virtual void updateActiveButton(int dir);
};
