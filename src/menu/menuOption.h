#pragma once
#include <string>
class menuOption
{
private:
	std::string sText;
	int iXPos, iYPos;

public:
	menuOption(std::string sText, int iXPos, int iYPos);
	~menuOption();

	std::string getText();
	void setText(std::string sText);

	int getXPos();
	int getYPos();
};
