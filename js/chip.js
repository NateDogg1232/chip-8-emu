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
function chipInit(drawfunct, errorhand) {
	draw = drawfunct;
	errorhandler = errorhand;
	init = true;
	screenbuffer = new Array(64);
	for (let i = 0; i < 64; i++)
		screenbuffer[i] = new Array(32);
}

//Load a program. Takes a hex string
function loadProgram(programStr) {
	program = new Array(0);
	for (let i = 0; i < programStr.length / 6; i++) {
		//Convert the hex code to the program
		//Anything at the end of it must be padded by zeroes
		program.push(parseInt(programStr.substr(i * 6, 6), 16));
	}
	resetComputer();
}

//Resets the computer to the default state
function resetComputer() {

}
