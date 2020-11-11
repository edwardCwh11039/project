#include "menu.h"
#include "config.h"

menu::menu()
{
    this->activeMenuOption = 0;
}

menu::~menu()
{
}

void menu::Update()
{
}

void menu::Draw(SDL_Renderer *render)
{
}

void menu::updateActiveButton(int dir)
{
    switch (dir)
    {
    case 0:
        if (activeMenuOption - 1 < 0)
        {
            activeMenuOption = numOfMenuOptions - 1;
        }
        else
        {
            --activeMenuOption;
        }
        break;
    case 2:
        if (activeMenuOption + 1 >= numOfMenuOptions)
        {
            activeMenuOption = 0;
        }
        else
        {
            ++activeMenuOption;
        }
        break;
    default:
        break;
    }
}