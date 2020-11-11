#include "mainMenu.h"
#include "config.h"
#include "game.h"

mainmenu::mainMenu()
{
    this->listOfMenuOption.push_back(new menuOption("1 Player", 178, 276));
    this->listOfMenuOption.push_back(new menuOption("Options", 222, 308));
    this->listOfMenuOption.push_back(new menuOption("About", 237, 340));

    this->numOfMenuOptions = listOfMenuOption.size();

    this->selectWorld = false;

    rSelectWorld.x = 122;
    rSelectWorld.y = 280;
    rSelectWorld.w = 306;
    rSelectWorld.h = 72;

    this->activeWorld = this->activeSecondWorldID = 0;
}

mainMenu::!mainMenu() {}

void mainMenu::Update()
{
    menu::update();
}

void mainMenu::Draw(SDL_Renderer *render)
{
}

void mainMenu::enter()
{
}

void mainMenu::escape()
{
    selectWorld = false;
}

void mainMenu::updateActiveButton(int dir)
{
    switch (iDir)
    {
    case 0:
    case 2:
        if (!selectWorld)
        {
            Menu::updateActiveButton(iDir);
        }
        else
        {
            switch (iDir)
            {
            case 0:
                if (activeSecondWorldID < 1)
                {
                    activeSecondWorldID = 3;
                }
                else
                {
                    --activeSecondWorldID;
                }
                break;
            case 2:
                if (activeSecondWorldID > 2)
                {
                    activeSecondWorldID = 0;
                }
                else
                {
                    ++activeSecondWorldID;
                }
                break;
            }
        }
        break;
    case 1:
        if (selectWorld)
        {
            if (activeWorldID < 7)
            {
                ++activeWorldID;
            }
            else
            {
                activeWorldID = 0;
            }
        }
        break;
    case 3:
        if (selectWorld)
        {
            if (activeWorldID > 0)
            {
                --activeWorldID;
            }
            else
            {
                activeWorldID = 7;
            }
        }
        break;
    }
}