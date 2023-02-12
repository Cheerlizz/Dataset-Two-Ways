//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded
class Shadow {
  // this constructor is called when we define new Creature(...)
  constructor(_x, _y) {
    this.location = new createVector(_x, _y);  // Location of shape
    this.velocity = new createVector(random(-2,2),random(-2,2));  // Velocity of shape
    this.diameter;
    this.color = color(0);
    this.outline = color(0);
    this.speedLimit;
    this.overBox = false;
    this.locked = false;
    this.catchPhrase;
    this.imageUri;

  }

  caught(){
    let d = dist(this.location.x, this.location.y, mouseX, mouseY);
    if (d<this.diameter/2) {
      this.overBox = true;
      if (!this.locked) {
        this.outline=color(255);
        this.color= color(244, 122, 158);
      }
    } else {
      this.outline= color(156, 39, 176);
      this.color= color(244, 122, 158);
      this.overBox = false;
    }
  }


  update() {


    //this.velocity.limit(this.speedLimit);
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
    strokeWeight(4);
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
  pg = createGraphics(0.5*width, 0.5*width);
  

  fetch("./json/sea.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    seacreatures = data.seacreatures;

    //using no Loop? you can just call your function once the data is loaded
    //drawChart();
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

  push();
  //pg.translate(pg.width/2,pg.height/2);
  pg.noFill();
  pg.rectMode(CENTER);
  pg.rect(pg.width/2,pg.height/2,pg.width,pg.height);
  pg.imageMode(CENTER);

  //textFont('Segoe UI Semibold');
  textSize(32);
  textFont('Segoe UI Black');
  text("Sea Creatures in Animal Crossing: New Horizons",100,60,300,200);
  textFont('Segoe UI Semibold');
  textSize(12);
  text("This graph compares two features of each sea creature in the social simulation video game, Animal Crossing: New Horizons.",100,200,300,200);
  text("How to read: The height of each bar represents the selling price, and the color stands for the shadow in the water, the darker the bar, the larger the shadow of this creature in the water.",100,250,300,200);
  image(bubble,width/2,height/2,0.8*width,0.8*width);

for(let i = 0; i < 40; i++){

    //set the size of each creature

    shadows[i].caught();
    shadows[i].update();

    if(mouseIsPressed === true){
      if (shadows[i].overBox) {
        shadows[i].locked = true;
        shadows[i].color = color(255,0,0);
        let token=floor(random(4));

        // if(token==0){
        //   pg.image(shadows[i].imageUri,0,0,shadows[i].diameter,shadows[i].diameter,0,0,320,320);
        // }
        // else if(token==1){
        //   pg.image(shadows[i].imageUri,pg.width/2,0,shadows[i].diameter,shadows[i].diameter, 320,0,320,320);
        // }
        // else if(token==2){
        //   pg.image(shadows[i].imageUri,0,pg.height/2,shadows[i].diameter,shadows[i].diameter, 0,320,320,320);
        // }
        // else{
        //   pg.image(shadows[i].imageUri,pg.width/2,pg.height/2,shadows[i].diameter,shadows[i].diameter,320,320,320,320);
        // }
        push();
        noLoop();
        //pg.translate(pg.width/6,pg.height/6);
        //let time = millis();
        //pg.rotate(time / 1000);
        //rotateZ(time / 1234);
        //pg.image(shadows[i].imageUri,random(0.3*pg.width,0.8*pg.width),random(0.3*pg.height,0.8*pg.height),shadows[i].diameter,shadows[i].diameter);
        let spot = new createVector(random(0,pg.width),random(0,pg.height));
        pg.image(shadows[i].imageUri,spot.x,spot.y,shadows[i].diameter,shadows[i].diameter);
        //console.log("pg.width",pg.width);
        //console.log(spot.x,spot.y);

        //pg.fill(time%255,0,0);
        pg.circle(0,0,50);
        pop();
        
        //image(shadows[i].imageUri,shadows[i].location.x,shadows[i].location.y, 50, 50);
        //image(shadows[i].imageUri,random(width),random(height), shadows[i].diameter, shadows[i].diameter);
        // text(shadows[i].catchPhrase,100,400,300,200);
        //circle(shadows[i].location.x,shadows[i].location.y,100);
      } else {
        shadows[i].locked = false;
      }
    }
    else{
      shadows[i].locked = false;
    }


  }

  pop();
  

}

// function mousePressed() {
//   for(let i=0; i<seacreatures.length; i++){
    
    

//   }
// }

// function mouseReleased() {

//   for(let i=0; i<seacreatures.length; i++){
    
//   }
  
// }


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
      shadows[i].velocity.x*=0.5;
      shadows[i].velocity.y*=0.5;
    }
    else if(seacreatures[i].speed=="Slow"){
      shadows[i].velocity.x*=0.8;
      shadows[i].velocity.y*=0.8;
    }
    else if(seacreatures[i].speed=="Medium"){
      shadows[i].velocity.x*=1.1;
      shadows[i].velocity.y*=1.1;
    }
    else if(seacreatures[i].speed=="Fast"){
      shadows[i].velocity.x*=1.5;
      shadows[i].velocity.y*=1.5;
    }

    //set the img
    img = loadImage(seacreatures[i].image_uri);
    shadows[i].catchPhrase= seacreatures[i].catchphrase;
    shadows[i].imageUri=img;


  }
   
}



