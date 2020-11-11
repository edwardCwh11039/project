#pragma once
#include "header.h"
#include "menuManager.h"

class config
{
private:
static img* 
public:
	config();
	~config();

	static int SCREEN_WIDTH, SCREEN_HEIGHT;
	static bool key_Space;
	static int keyID_S, keyID_A, keyID_D,keyID_Space, keyID_Shift;
	static string getKeyString(int keyID);
	static bool canMoveBackward;
};
