#pragma once

#include "header.h"

class img
{
private:
	SDL_Texture* tIMG;
	SDL_Rect rRect;

public:
	img(void);
	img(std::string fileName, SDL_Renderer* rR);
	~img(void);

	void Draw(SDL_Renderer * rR, int iXOffset, int iYOffset);
	void Draw(SDL_Renderer * rR, int iXOffset, int iYOffset, bool bRoate);
	void DrawVert(SDL_Renderer * rR, int iXOffset, int iYOffset);
	void Draw(SDL_Renderer * rR, SDL_Rect rCrop, SDL_Rect rRect);

	/* ----- get & set ----- */
	SDL_Texture* getIMG();
	void setIMG(std::string fileName, SDL_Renderer* rR);
	SDL_Rect getRect();
};