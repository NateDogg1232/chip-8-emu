//The Chip-8 emulator library.

//Requires the base-64 

var draw;
var errorhandler;
var init = false;

var program;

var screenbuffer;

//Takes two arguments: Drawfunct, which is the function that the library will use to draw
//pixels and errorhand which is the function which handles any errors that occur in the library
//This 	drawing function will take three arguments. This function's syntax is as follows:
//draw(x,y,pixelset)
//where x and y are integer values and pixelset is a boolean. True is white and false is black.

//TODO:  Figure out how to do the error handler
function init(drawfunct, errorhand) {
	draw = drawfunct;
	errorhandler = errorhand;
	init = true;
	screenbuffer =
}

//Load a program. Takes a base64 string
function loadProgram(program) {
	program =
}

//Resets the computer to the default state
function resetcomputer() {

}
