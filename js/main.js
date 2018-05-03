//The main JS file to wrap the libraries



chipInit(draw, error);
//Get our main drawing canvas
var canvas = document.getElementById("maincanvas").getContext("2d");
//And fill the whole thing with black
canvas.fillStyle="#000000";
canvas.fillRect(0,0,512,256);

function draw(x, y, bit) {
	if (bit)
		canvas.fillStyle="#FFFFFF";
	else
		canvas.fillStyle="#000000";
	canvas.fillRect(x*8,y*8,8,8);
}

function error() {

}
