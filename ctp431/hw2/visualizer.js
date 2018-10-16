var canvas;

var y = 0;
var song1, song2, analyzer, fft;
var a=0;
var b=1;
var c=1;
var c2=1;
var shape = 0;

function preload() {
  soundFormats('ogg', 'mp3');
  song1 = loadSound('bgm1.mp3');
  song2 = loadSound('bgm2.mp3');
}


function setup() {
  canvas = createCanvas(windowWidth*0.8, windowHeight*0.6, WEBGL);
  canvas.position(windowWidth*0.1,100+windowHeight*0.2);

  button1 = createButton('BGM 1');
  button1.position(windowWidth*0.9, windowHeight*0.1);
  button1.mousePressed(playmusic1);

  button2 = createButton('BGM 2');
  button2.position(windowWidth*0.9, windowHeight*0.15);
  button2.mousePressed(playmusic2);


  analyzer = new p5.Amplitude();
  fft = new p5.FFT();

}

function draw() {

  resizeCanvas(windowWidth*0.8, windowHeight*0.6,WEBGL);
  canvas.position(windowWidth*0.1,100+windowHeight*0.2);
  button1.position(windowWidth*0.9, windowHeight*0.1);
  button2.position(windowWidth*0.9, windowHeight*0.15);
  background(0);
  var rms = analyzer.getLevel();
  var spectrum = fft.analyze();



  rotateY(frameCount * (0.003+rms*0.0001*random(-1,1)));
	for(var j = -1; j < 2; j++){
    push();
    for(var i = 0; i < 200-shape*b; i++){


      rotateZ(frameCount * 0.00002);
      push();
      fill(255);
      if(b>0){
        noFill();
      }
      stroke(c);
      sphere(min(windowHeight*0.3,100+sqrt(rms*40000)),3+int(rms*5),2+int(rms*5));
      pop();


    }
    pop();
  }

  beginShape();
  for (k = 0; k<spectrum.length; k++) {
    noFill();
    stroke(c2);
    vertex(-(windowWidth*0.15+k*0.5), map(height*0.5+spectrum[k], 0, height*0.5, height*0.25, 0),frameCount*0.0001 );
  }
  endShape();

  beginShape();
  for (k = 0; k<spectrum.length; k++) {
    noFill();
    stroke(c2);
    vertex(-(windowWidth*0.15+k*0.5), -1*map(height*0.5+spectrum[k], 0, height*0.5, height*0.25, 0),frameCount*0.0001 );
  }
  endShape();


  beginShape();
  for (k = 0; k<spectrum.length; k++) {
    noFill();
    stroke(c2);
    vertex(windowWidth*0.15+k*0.5,map(height*0.5+spectrum[k], 0, height*0.5, height*0.25, 0),frameCount*0.0001 );
  }
  endShape();

  beginShape();
  for (k = 0; k<spectrum.length; k++) {
    noFill();
    stroke(c2);
    vertex(windowWidth*0.15+k*0.5,-1*map(height*0.5+spectrum[k], 0, height*0.5, height*0.25, 0),frameCount*0.0001 );
  }
  endShape();

  stroke(0);


  a++;


  if(a>10){
    b=random(-1,1);
    c=random(10,150);
    c2=random(30,255);
    shape=random(0,300);
    a=0;
  }

}

function playmusic1(){
  if(song2.isPlaying()){
    song2.stop();
  }


  if(song1.isPlaying()){
    song1.stop();
  }
  else{
    song1.loop();
    analyzer.setInput(song1);
    fft.setInput(song1);
  }

}

function playmusic2(){
  if(song1.isPlaying()){
    song1.stop();
  }


  if(song2.isPlaying()){
    song2.stop();
  }
  else{
    song2.loop();
    analyzer.setInput(song2);
    fft.setInput(song2);
  }
}
