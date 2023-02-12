//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded
class Shadow {
  // this constructor is called when we define new Creature(...)
  constructor(_x, _y) {
    this.location = new createVector(_x, _y);  // Location of shape
    this.startVelocity = new createVector(random(-2,2),random(-2,2));  // Velocity of shape
    this.velocity=this.startVelocity;
    this.diameter;
    this.color = color(0);
    this.outline = color(0);
    this.speedLimit;
    this.overBox = false;
    this.locked = false;
    this.catchPhrase;
    this.imageUri;
    this.normalOff=random(1);
    this.emergencyOff=random(1);

  }

  caught(){
    let d = dist(this.location.x, this.location.y, mouseX, mouseY);
    this.normalOff = this.normalOff + 0.01;
    
    this.emergencyOff=this.emergencyOff + 0.4;
    let n= fract(noise(this.normalOff));
    let e = fract(noise(this.emergencyOff));
    if (d<this.diameter/2) {
      this.overBox = true;
      if (!this.locked) {
        this.outline=color(255);
        this.color= color(234, 143, 234,e*255);
      }
    } else {
      this.outline= color(54, 47, 217);
      this.color= color(n*255, 241, 223,200);
      
      this.overBox = false;
    }
  }


  update() {

    // Add velocity to the location.
    this.location.add(this.velocity);

  
    // Bounce off edges
    if (this.location.x > width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y = this.velocity.y * -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1; 
    }
  
    // Display circle at location vector
    //noStroke();
    strokeWeight(2);
    stroke(this.outline);
    fill(this.color);
    circle(this.location.x,this.location.y,this.diameter);
  }
}

let shadows = [];
let seacreatures;
let pg;
let bubble;

function preload() {
  bubble = loadImage('bubble.png');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element
  pg = createGraphics(0.6*width, 0.6*width);
  

  fetch("./json/sea.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    seacreatures = data.seacreatures;

    //set the object properties
    drawSetting();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

  //create the shadow list
  for(let i = 0; i < 40; i++){
    let c = new Shadow(random(width), random(height));
    shadows.push(c);
  }

  

}

function draw() {
  background(224, 245, 231);

  //pg.background(100);
  imageMode(CENTER);
  image(pg,width/2,height/2);
  stroke(255);
  strokeWeight(3);

  pg.push();
  pg.translate(pg.width/2,pg.height/2);
  pg.noFill();
  pg.rectMode(CENTER);
  //use this rectangle to show the border of pg
  //pg.rect(pg.width/2,pg.height/2,pg.width,pg.height);
  pg.imageMode(CENTER);

  //textFont('Segoe UI Semibold');
  stroke(54, 47, 217);
  fill(54, 47, 217);
  textSize(map(width,0,1500,66,46));
  //textFont('Segoe UI Black');
  textFont('Lucida Console');
  textAlign(LEFT,TOP);
  text("Sea Creatures in \nAnimal Crossing: New Horizons",width*0.04,height*0.35,width*0.01);
  textFont('Segoe UI Semilight');
  textSize(map(width,0,1500,50,30));
  //textSize(30);
  noStroke();
  textAlign(RIGHT,TOP);
  fill(234, 143, 234);
 
  text("Press on the running sea creatures to catch them! \nPlease refer to this bar chart via the link at the bottom to have a look of the value of each creature and the corresponding shadow size.\nEnjoy your fisher time!",width*0.98-map(width,0,1500,400,250),height*0.12,map(width,0,1500,400,250));
  let a = createA('https://cheerlizz.github.io/SeaCreatures-in-AnimalCrossing/', "Here is the link \n(You need to open link in a new tab if using a laptop)");
  a.position(width*0.85,height*0.9);
  image(bubble,width/2,height/2,0.8*width,0.8*width);

for(let i = 0; i < 40; i++){

    //update the status

    shadows[i].caught();
    shadows[i].update();

    if(mouseIsPressed === true){
      if (shadows[i].overBox) {
        shadows[i].locked = true;
        shadows[i].color = color(234, 143, 234);

        push();
        
        let angle = random(2*PI);
        pg.rotate(angle);
        let spot = new createVector(random(0,0.35*pg.width),random(0,0.35*pg.height));
        pg.image(shadows[i].imageUri,spot.x,spot.y,0.8*shadows[i].diameter,0.8*shadows[i].diameter);
        //the center of pg
        // pg.fill(angle%255,0,0);
        // pg.circle(0,0,50);
        pop();
        //rectMode(CENTER);

        //calculate the size of catchPhrase
        let rectX = width/5;
        let rectY =0.3*rectX;
        //noFill();
        fill(16, 161, 157);
        strokeWeight(4);
        stroke(54, 47, 217);
        rect(width*0.2-rectX/8,height*0.65-rectX/8,rectX*1.2,rectY*1.4);
        fill(54, 47, 217);
        //fill(255, 191, 0);
        noStroke();
        textAlign(LEFT);
        textSize(16);
        textFont('Lucida Console');
        text(shadows[i].catchPhrase,width*0.2,height*0.65,rectX);
      } else {
        shadows[i].locked = false;
      } 
    }
    else{
      shadows[i].locked = false;
    }
      

  }

  pg.pop();
  
console.log("im fast",shadows[33].velocity.x);
}


function drawSetting(){
  //set the shadow size
  for(let i = 0; i < seacreatures.length; i++){
    if(seacreatures[i].shadow=="Smallest"){
      shadows[i].diameter=20;
    }
    else if(seacreatures[i].shadow=="Small"){
      shadows[i].diameter=50;
    }
    else if(seacreatures[i].shadow=="Medium"){
      shadows[i].diameter=80;
    }
    else if(seacreatures[i].shadow=="Large"){
      shadows[i].diameter=120;
    }
    else if(seacreatures[i].shadow=="Largest"){
      shadows[i].diameter=160;
    }  
    
    //set the speed
    if(seacreatures[i].speed=="Stationary"){
      shadows[i].velocity.x=0;
      shadows[i].velocity.y=0;
    }
    else if(seacreatures[i].speed=="Very slow"){
      shadows[i].velocity.x=shadows[i].startVelocity.x*0.5;
      shadows[i].velocity.y=shadows[i].startVelocity.y*0.5;
    }
    else if(seacreatures[i].speed=="Slow"){
      shadows[i].velocity.x=shadows[i].startVelocity.x*0.8;
      shadows[i].velocity.y=shadows[i].startVelocity.y*0.8;
    }
    else if(seacreatures[i].speed=="Medium"){
      shadows[i].velocity.x=shadows[i].startVelocity.x*1.1;
      shadows[i].velocity.y=shadows[i].startVelocity.y*1.1;
    }
    else if(seacreatures[i].speed=="Fast"){
      shadows[i].velocity.x=shadows[i].startVelocity.x*1.5;
      shadows[i].velocity.y=shadows[i].startVelocity.y*1.5;
    }

    //set the img
    img = loadImage(seacreatures[i].image_uri);
    shadows[i].catchPhrase= seacreatures[i].catchphrase;
    shadows[i].imageUri=img;
    console.log("the speed of i",shadows[i].velocity.x);

  }
   
}



