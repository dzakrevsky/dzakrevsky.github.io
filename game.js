var canv = document.getElementById('canvas');
var	ctx  = canv.getContext('2d');
var x;
var y;

canv.addEventListener("mousedown", doMouseDown, false);

var enemy = []

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

var images = []

var imgNum = 0;
for (var i=0;i<unique.length;i++) {
 	var img = new Image();
	img.src = 'assets/PNG/Default_size/towerDefense_tile'+unique[i]+'.png';
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
 			map_image = getImage('towerDefense_tile'+map[x][y]+'.png');
 			ctx.drawImage(map_image,64*y,64*x,64,64);			
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

	tower1 = getImage('towerDefense_tile180.png');
	
	for (var f = 0; f < towers.length; f++) {
		ctx.drawImage(tower1,64*towers[f].x, 64*towers[f].y, 64, 64);
	}
	
	tower2 = getImage('towerDefense_tile249.png');

	for (var g = 0; g < towers.length; g++) {
				ctx.drawImage(tower2,64*towers[g].x, 64*towers[g].y-25, 64, 64);	
			}		
}

function getImage(name) {
	for (var i = 0; i < images.length; i++) {
		names = images[i].name.split('/')
		if(names[names.length - 1]==name)
			return images[i].image
	}
}

enemy.push({x: 125, y: 580})

var directionX = 1;
var directionY = 0;

var enemyMany = 0;

function enemyRotate(enemy, x, y, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); 
    ctx.rotate(rotation);
    ctx.drawImage(enemy, -enemy.width / 2, -enemy.height / 2);
} 

function drawEnemy() {
	var rotate = 0;
	enemyMany++
	if (enemyMany == 150){
		enemy.push({x: 125, y: 580})
		enemyMany = 0
	}
	enemy1 = getImage('towerDefense_tile245.png');

	for (var i = 0; i < enemy.length; i++) {
		if (enemy[i].y > 300) {
			directionX = 0;
			directionY = -1;
			
		}

		if (enemy[i].y <= 385) {
			directionX = 1;
			directionY = 0;	
			rotate = Math.PI/2;
		}

		if (enemy[i].x > 380) {
			directionX = 0;
			directionY = -1;	
			rotate = 0;
		
		}

		if (enemy[i].y < 65) {
			directionX = 1;
			directionY = 0;	
			rotate = Math.PI/2;
		}

		if (enemy[i].x > 773) {
			directionX = 0;
			directionY = 1;	
			rotate = Math.PI;
		}

		if (enemy[i].y> 510 && enemy[i].x > 710) {
			directionX = 1;
			directionY = 0;	
			rotate = Math.PI/2;
		}
		enemy[i].x += directionX;
		enemy[i].y += directionY;


		enemyRotate(enemy1, enemy[i].x, enemy[i].y, 1, rotate);
		rotate = 0;
		//ctx.drawImage(enemy1,enemy[i].x,enemy[i].y,64,64);
		ctx.setTransform(1,0,0,1,0,0);
	}

	}	

