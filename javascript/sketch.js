let par = [];
let colors = [];
let num = 300;
let isPlaying = true;

function setup() {
  createCanvas(960, 540);

  colors[0] = color(224, 172, 103,random(30,50));
  colors[1] = color(24, 87, 91);
  for (let i = 0; i < num; i++) {
    par.push(new Par(random(width), random(height)));
  }
  background(50);
  
  playButton = createButton("Play");
  playButton.style("background-color", "#4CAF50");
  playButton.style("color", "white");
  playButton.style("font-size", "20px");
  playButton.style("padding", "10px 20px");
  playButton.style("border", "0");
  playButton.position(width/2- 110, height+ 10);
  playButton.mousePressed(play);
  
  playButton.mouseOver(function() {
    playButton.style("background-color", "#3e8e41");
  });
  playButton.mouseOut(function() {
    playButton.style("background-color", "#4CAF50");
  });
  
  
  pauseButton = createButton("Pause");
  pauseButton.style("background-color", "#f44336");
  pauseButton.style("color", "white");
  pauseButton.style("font-size", "20px");
  pauseButton.style("padding", "10px 20px");
  pauseButton.style("border", "0");
  pauseButton.position(width/2-10, height+ 10);
  pauseButton.mousePressed(pause);
  
   pauseButton.mouseOver(function() {
   pauseButton.style("background-color", "#d32f2f");
  });
   pauseButton.mouseOut(function() {
   pauseButton.style("background-color", "#f44336");
  });

  saveButton = createButton("Save");
  saveButton.style("background-color", "#4C36F4");
  saveButton.style("color", "white");
  saveButton.style("font-size", "20px");
  saveButton.style("padding", "10px 20px");
  saveButton.style("border", "0");
  saveButton.position(width/2+ 110, height+ 10);
  saveButton.mousePressed(save1);
  
  saveButton.mouseOver(function() {
  saveButton.style("background-color", "#31289F");
  });
  saveButton.mouseOut(function() {
  saveButton.style("background-color", "#4C36F4");
  });
}

function draw() {
  if (isPlaying) {
  for (let j = par.length - 1; j > 0; j--) {
    par[j].update();
    par[j].show();
    if (par[j].finished()) {
      par.splice(j, 1.5);
      background(0, 0, 0, 0);
    }
  }
	
	for (let i = par.length; i < num; i++) {
    par.push(new Par(random(width), random(height)));
  } 
}
}



function Par(x, y) {
  this.x = x;
  this.y = y;
  this.pos = createVector(this.x, this.y);

  this.life = random(10);
  this.c = color(random(colors));
  this.ff = 10;

  this.update = function () {
    this.ff = noise(this.pos.x / 150, this.pos.y / 100) * TWO_PI; // Flow Field
    let mainP = 1200;
    let changeDir = TWO_PI / mainP; // location
    let roundff = round((this.ff / TWO_PI) * mainP); 
    this.ff = changeDir * roundff; // new location
    
    if (this.ff < 6 && this.ff > 3) {
      this.c = colors[0];
      stroke(this.c);
      this.pos.add(tan(this.ff)*random(1,3), tan(this.ff));
    } else {
      this.c = colors[1];
      stroke(this.c);
      this.pos.sub(sin(this.ff)*random(0.1,1), cos(this.ff));
    }
  };

  this.show = function () {
    noFill();
    strokeWeight(random(1.25));
    let lx = 20;
    let ly = 20;
    let px = constrain(this.pos.x, lx, width - lx);
    let py = constrain(this.pos.y, ly, height - ly);
    point(px, py);
  };

  this.finished = function () {
    this.life -= random(random(random(random()))) / 10;
	this.life = constrain(this.life, 0, 1);
    if (this.life == 0) {
      return true;
    } else {
      return false;
    }
  };
}

function play() {
  isPlaying = true;
 
}

function pause() {
  isPlaying = false;
  
}

function save1() {
  saveCanvas("environment", "png");
  
}