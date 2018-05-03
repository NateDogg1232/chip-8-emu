//The Chip-8 emulator library.

//Requires the base-64

var draw;
var errorhandler;
var init = false;

var program;

var ram;

var regs;

//Specifically the I register
var ir;

//Instruction pointer
var ip;

//Stack pointer
var sp;

var stack;

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
	ram = new Array(4096);
	stack = new Array(16);
	sp = 0;
	regs = new Array(16);
	//Start of
	ip = 512;
}

//Load a program. Takes a hex string
function loadProgram(programStr) {
	program = new Array(0);
	for (let i = 0; i < programStr.length / 2; i++) {
		//Convert the hex code to the program
		//Anything at the end of it must be padded by zeroes
		//512 is the start of most programs
		ram[i+512] = parseInt(programStr.substr(i * 2, 2), 16));
	}
	resetComputer();
}

function tick() {
	//Start running through the program
	//This variable is for ease of use. Writing out the whole thing takes too darn long
	var o = ram[ip] | ram[ip + 1];
	if (o == 0xE0) {
		//CLS 0xE0		CLS
		clearScreen();
		ip+=2;
	} else if (o == 0xEE) {
		//RET 0xEE		RET
		ip = pop();
	} else if (o & 0x1000 == 0x1000) {
		//JP 0x1nnn		JP addr
		ip = o & 0xFFF;
	} else if (o & 0x2000 == 0x2000) {
		//CALL 0x2nnn	CALL addr
		push(ip);
		ip = 0 & 0xFF;
	} else if (o & 0x3000 == 0x3000) {
		//SE 0x3xkk		SE Vx, byte
		if (regs[o & 0xF00 >> 16] == (o & 0xFF)) {
			ip+=2;
		}
	} else if (o & 0x4000 == 0x4000) {
		//SNE 0x4xkk		SNE Vx, byte
	   if (regs[o & 0xF00 >> 16] != (o & 0xFF)) {
		   ip+=2;
	   }
   } else if (o & 0x5000 == 0x5000) {
	   //SE 0x5xy0			SE Vx, Vy
	   if (regs[o & 0xF00 >> 16] == regs[o & 0xF0 >> 8]) {
		   ip+=2;
	   }
   } else if (o & 0x6000 == 0x6000) {
	   //LD 0x6xkk			LD Vx, byte
	   regs[o & 0xF00 >> 16] = o & 0xFF;
   }
}

function push(value) {
	stack[sp] = value;
	sp++;
	if (sp > 15) {
		//TODO: Stack overflow
	}
}

function pop() {
	let ret = stack[sp];
	sp--;
	if (sp < 0) {
		//TODO: Stack underflow
	}
}

//Resets the computer to the default state
function resetComputer() {
	screenbuffer = new Array(64);
	for (let i = 0; i < 64; i++)
		screenbuffer[i] = new Array(32);
}
