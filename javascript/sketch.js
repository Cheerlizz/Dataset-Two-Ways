//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let seacreatures;

function setup() {
  createCanvas(1520, 750);

  //no animation / interaction chart
  noLoop();

  fetch("./json/sea.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    seacreatures = data.seacreatures;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(224, 245, 231);
  //textFont('Segoe UI Semibold');
  textSize(32);
  //text("Sea Creatures in ",100,40,300,200);
  textFont('Segoe UI Black');
  text("Sea Creatures in Animal Crossing: New Horizons",100,60,300,200);
  textFont('Segoe UI Semibold');
  textSize(12);
  text("This graph compares two features of each sea creature in the social simulation video game, Animal Crossing: New Horizons.",100,200,300,200);
  text("How to read: The height of each bar represents the selling price, and the color stands for the shadow in the water, the darker the bar, the larger the shadow of this creature in the water.",100,250,300,200);

}

function drawChart(){

  // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<seacreatures.length; i++) {
    if ( seacreatures[i].price > maxval) {
      maxval = seacreatures[i].price;
    }
  }

  let spacing = 5;//spacing between the bars
  // Display chart
  for (let i=0; i<seacreatures.length; i++) {

    let item = seacreatures[i];
    
    let rWidth = width/(seacreatures.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, seacreatures.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let rHeight = 0-map(item.price, 0, maxval, 0, 0.7*height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 
    
    if(item.shadow=="Smallest"){
      fill(185, 243, 252);
    }
    else if(item.shadow=="Small"){
      fill(0, 215, 255);
    }
    else if(item.shadow=="Medium"){
      fill(0, 150, 255);
    }
    else if(item.shadow=="Large"){
      fill(88, 0, 255);
    }
    else if(item.shadow=="Largest"){
      fill(0, 51, 124);
    }
    else{
      fill(255);
    }
    noStroke(); 
    textAlign(CENTER, TOP); 
    rect(rX+spacing/2, rY, rWidth-spacing, rHeight); 
    textSize(10);
    text(item.price, rX+rWidth/2-1, rY+rHeight-20);

    textFont('Segoe UI Semibold');
    fill(0); 
    
    textSize(8);
    if(i%2==0){
      fill(26, 77, 46);
      stroke(26, 77, 46);
      line(rX+rWidth/2-1, rY+10,rX+rWidth/2-1, rY);
      noStroke();
      text(item.filename, rX+rWidth/2-1, rY+10);
    }
    else{
      fill(255, 159, 41);
      stroke(255, 159, 41);
      line(rX+rWidth/2-1, rY+20,rX+rWidth/2-1, rY);
      noStroke();
      text(item.filename, rX+rWidth/2-1, rY+20);
    }

    fill(234, 143, 234);
    
  }  

}