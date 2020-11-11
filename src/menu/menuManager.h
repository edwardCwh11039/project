#pragma once

#include "mainMenu.h"

class menuManager
{
private:
    mainMenu* mainMenu;

public:
    menuManager();
    ~menuManager();

    enum gameState{
        eMainMenu,
    }
    gameState currentGameState;

    void Update();
    void Draw(SDL_Renderer* renderer);

    void setBackgroundColor(SDL_Renderer* render);

    void enter();
    void escape();
    void setKey(int keyID);
	void keyPressed(int iDir);

	void resetActiveOptionID(gameState ID);

	int getViewID();
	void setViewID(gameState viewID);

	void setActiveOption(SDL_Renderer* rR);

};

