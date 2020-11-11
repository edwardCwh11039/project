#include "config.h"

int config::SCREEN_WIDTH = 800;
int config::SCREEN_HEIGHT = 450;

bool config::key_Space = false;

int config::keyID_A = 0;
int config::keyID_D = 0;
int config::keyID_S = 0;
int config::keyID_Space = 0;
int config::keyID_Shift = 0;

bool config::canMoveBackward = true;

config::config(){}

config::~config()
{
}

string config::getKeyString(int keyID)
{
	if (keyID >= 97 && keyID <= 122) {
		return std::string(1, '0' + (keyID - 32) - 48);
	}

	if (keyID >= 48 && keyID <= 57) {
		return std::string(1, '0' + (keyID - 32) - 48);
	}

	switch (keyID) {
	case SDLK_ESCAPE:
		return "ESCAPE";
	case SDLK_SPACE:
		return "SPACE";
	case SDLK_LSHIFT:
		return "LSHIFT";
	case SDLK_RSHIFT:
		return "RSHIFT";
	case SDLK_UP:
		return "UP";
	case SDLK_DOWN:
		return "DOWN";
	case SDLK_RIGHT:
		return "RIGHT";
	case SDLK_LEFT:
		return "LEFT";
	case SDLK_LCTRL:
		return "LCTRL";
	case SDLK_RCTRL:
		return "RCTRL";
	}

	return "NONE";
}