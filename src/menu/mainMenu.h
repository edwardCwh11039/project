#pragma once
#include "menu.h"
class mainMenu : public menu
{
private:
	bool selectWorld;
	int activeWorldID, activeSecondWorldID;

	SDL_Rect rSelectWorld;
public:
	mainMenu();
	~mainMenu();

	void Update();
	void Draw(SDL_Renderer* render);

	void enter();
	void escape();

	void updateActiveButton(int dir);
};
