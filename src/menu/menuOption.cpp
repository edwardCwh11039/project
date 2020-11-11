#include "menuOption.h"

/* ******************************************** */

menuOption::menuOption(std::string sText, int iXPos, int iYPos) {
	this->sText = sText;
	this->iXPos = iXPos;
	this->iYPos = iYPos;
}


menuOption::~menuOption() {}

std::string menuOption::getText() {
	return sText;
}

void menuOption::setText(std::string sText) {
	this->sText = sText;
}

int menuOption::getXPos() {
	return iXPos;
}

int menuOption::getYPos() {
	return iYPos;
}