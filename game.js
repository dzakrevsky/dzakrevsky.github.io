var canv = document.getElementById('canvas');
var	ctx  = canv.getContext('2d');
var x;
var y;

canv.addEventListener("mousedown", doMouseDown, false);

var map = 
        [
            ["024","024","024","024","024","003","047","047","047","047","047","047","004","024","024","024","024","024"],
            ["024","024","024","024","024","025","299","001","001","001","001","002","023","024","024","024","024","024"],
            ["024","024","024","024","024","025","023","024","024","024","024","025","023","024","024","024","024","024"],
            ["024","024","024","024","024","025","023","024","024","024","024","025","023","024","024","024","024","024"],
            ["024","024","024","024","024","025","023","024","024","024","024","025","023","024","024","024","024","024"],
            ["024","003","047","047","047","048","023","024","024","024","024","025","023","024","024","024","024","024"],
            ["024","025","299","001","001","001","027","024","024","024","024","025","023","024","024","024","024","024"],
            ["024","025","023","024","024","024","024","024","024","024","024","025","046","047","047","047","047","047"],
            ["024","025","023","024","024","024","024","024","024","024","024","026","001","001","001","001","001","001"],
            ["024","025","023","024","024","024","024","024","024","024","024","024","024","024","024","024","024","024"],
            ["024","024","024","024","024","024","024","024","024","024","024","024","024","024","024","024","024","024"],
        ]

var unique = ["024","003","047","004","025","023","299","001","002","048","027","046","026","180","249","245"]

var towers = []

images = []
var imgNum = 0;
for (var i=0;i<unique.length;i++) {
 	var img = new Image();
	img.src = 'C:/Users/Lolkek/Desktop/assets/PNG/Default_size/towerDefense_tile'+unique[i]+'.png';

	img.onload = function() {
		imgNum++;
		images.push({name: this.src, image: this});
		if (imgNum==unique.length) {
			drawAll();
		} 
	}
}
function drawAll() {
	ctx.clearRect(0,0,1152,704)
	drawMap();
	drawTower();
	drawSquare();
	drawEnemy();
	requestAnimationFrame(drawAll);
}

function drawMap() {
	for (var x=0;x<11;x++) {
 		for (var y=0;y<18;y++) {
 			for (var re=0;re<images.length;re++) {
 				if (images[re].name=='file:///C:/Users/Lolkek/Desktop/assets/PNG/Default_size/towerDefense_tile'+map[x][y]+'.png') {
 					ctx.drawImage(images[re].image,64*y,64*x,64,64);
 				}
 			}
						
		}
	}
}

function mouseMove(event) {
	x=Math.trunc(event.clientX/64);
	y=Math.trunc(event.clientY/64);
}

function drawSquare() {
	ctx.beginPath();
	ctx.lineWidth="1";
	ctx.strokeStyle="black";
	ctx.rect(64*x, 64*y, 64, 64);
	ctx.stroke();
}

function doMouseDown(event) {
	if (map[y][x]=="024"){
		for (var i = 0; i < towers.length; i++) {
			if (towers[i].x == x && towers[i].y == y)
				return
		}
		towers.push({x: x, y: y});

	}
}

function drawTower() {

	tower1 = getImage('file:///C:/Users/Lolkek/Desktop/assets/PNG/Default_size/towerDefense_tile180.png');
	
	for (var f = 0; f < towers.length; f++) {
		ctx.drawImage(tower1,64*towers[f].x, 64*towers[f].y, 64, 64);
	}
	
	tower2 = getImage('file:///C:/Users/Lolkek/Desktop/assets/PNG/Default_size/towerDefense_tile249.png');

	for (var g = 0; g < towers.length; g++) {
				ctx.drawImage(tower2,64*towers[g].x, 64*towers[g].y-25, 64, 64);	
			}		
}

function getImage(name) {
	for (var i = 0; i < images.length; i++)
		if(images[i].name==name)
			return images[i].image
}

var enemyX=95;
var enemyY=580;

var directionX = 1;
var directionY = 0;

var enemyMany = 0;

function drawEnemy() {
	enemy1 = getImage('file:///C:/Users/Lolkek/Desktop/assets/PNG/Default_size/towerDefense_tile245.png');
	ctx.drawImage(enemy1,enemyX,enemyY,64,64);
	
	if (enemyY > 365) {
		directionX = 0;
		directionY = -1;
	}

	if (enemyY <= 365) {
		directionX = 1;
		directionY = 0;	
	}

	if (enemyX > 350) {
		directionX = 0;
		directionY = -1;	
	}

	if (enemyY < 35) {
		directionX = 1;
		directionY = 0;	
	}

	if (enemyX > 725) {
		directionX = 0;
		directionY = 1;	
	}

	if (enemyY > 470 && enemyX > 710) {
		directionX = 1;
		directionY = 0;	
	}
	/*if (enemyX==219)
		enemyY++
	else
		enemyX++
	if (enemyY==258)
		enemyX+=0.13
	if(enemyX>550)
		return
	if(enemyX>550)
		enemyY++*/

	enemyX += directionX;
	enemyY += directionY;

	console.log(enemyY,enemyX)
	if (enemyY <= 480)  {
		enemy1 = getImage('file:///C:/Users/Lolkek/Desktop/assets/PNG/Default_size/towerDefense_tile245.png');
		ctx.drawImage(enemy1,enemyX,enemyY+100,64,64);
	}


}