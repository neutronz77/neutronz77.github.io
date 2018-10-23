var canvas;

var y = 0;
var song1, song2, song3, analyzer, fft;
var a=0;
var b=1;
var c=1;
var c2=1;
var shape = 0;
var fft1=0;

function preload() {
  soundFormats('ogg', 'mp3');
  song1 = loadSound('bgm1.mp3');
  song2 = loadSound('bgm2.mp3');
  song3 = loadSound('bgm3.mp3');
}


function setup() {
  canvas = createCanvas(windowWidth*0.8, windowHeight*0.6, WEBGL);
  canvas.position(windowWidth*0.1,100+windowHeight*0.2);

  button1 = createButton('BGM 1');
  button1.position(windowWidth*0.95, windowHeight*0.05);
  button1.mousePressed(playmusic1);

  button2 = createButton('BGM 2');
  button2.position(windowWidth*0.95, windowHeight*0.1);
  button2.mousePressed(playmusic2);

  button3 = createButton('BGM 3');
  button3.position(windowWidth*0.95, windowHeight*0.15);
  button3.mousePressed(playmusic3);

  slider = createSlider(0,100,100);
  slider.position(windowWidth*0.475, windowHeight*0.01);


  analyzer = new p5.Amplitude();
  fft = new p5.FFT();

}

function draw() {

  resizeCanvas(windowWidth*0.8, windowHeight*0.6,WEBGL);
  canvas.position(windowWidth*0.1,100+windowHeight*0.2);
  button1.position(windowWidth*0.9, windowHeight*0.05);
  button2.position(windowWidth*0.9, windowHeight*0.1);
  button3.position(windowWidth*0.9, windowHeight*0.15);
  slider.position(windowWidth*0.88, windowHeight*0.2);
  background(0);
  var rms = analyzer.getLevel();
  var spectrum = fft.analyze();

  song1.amp(slider.value()*0.01);
  song2.amp(slider.value()*0.01);
  song3.amp(slider.value()*0.01);

  var bassline = 0;
  for (k = 2; k<4; k++) {
  bassline=spectrum[k];
  }
  bassline=bassline/2;

  rotateY(frameCount/500 + (0.01*rms+bassline*0.0015)*random(-1,1));

	for(var j = -1; j < 2; j++){
    push();
    for(var i = 0; i < 100-shape*b; i++){


      rotateZ(frameCount * 0.00002);
      push();
      fill(255);
      if(b>0){
        noFill();
      }
      stroke(c);
      sphere(min(windowHeight*0.3,30+sqrt(rms*50000)),3+int(rms*5),2+int(rms*5));
      pop();


    }
    pop();
  }

  beginShape();
  for (k = 0; k<spectrum.length; k++) {
    noFill();
    stroke(c2);
    vertex(-(windowWidth*0.15+k*0.5), map(height*0.5+spectrum[k], 0, height*0.5, height*0.1, 0),frameCount*0.0001 );
  }
  endShape();

  beginShape();
  for (k = 0; k<spectrum.length; k++) {
    noFill();
    stroke(c2);
    vertex(-(windowWidth*0.15+k*0.5), -1*map(height*0.5+spectrum[k], 0, height*0.5, height*0.1, 0),frameCount*0.0001 );
  }
  endShape();

  beginShape();
  for (k = 0; k<spectrum.length; k++) {
    noFill();
    stroke(c2);
    vertex(windowWidth*0.15+k*0.5,map(height*0.5+spectrum[k], 0, height*0.5, height*0.1, 0),frameCount*0.0001 );
  }
  endShape();

  beginShape();
  for (k = 0; k<spectrum.length; k++) {
    noFill();
    stroke(c2);
    vertex(windowWidth*0.15+k*0.5,-1*map(height*0.5+spectrum[k], 0, height*0.5, height*0.1, 0),frameCount*0.0001 );
  }
  endShape();

  stroke(0);


  beginShape();
  for (k = fft1; k<fft1+50; k++) {

    noFill();
    stroke(255);
    vertex(-(windowWidth*0.15+k*0.5), map(height*0.5+spectrum[k], 0, height*0.5, height*0.1, 0),frameCount*0.0001 );

  }
  endShape();

  beginShape();
  for (k = fft1; k<fft1+50; k++) {

    noFill();
    stroke(255);
    vertex(-(windowWidth*0.15+k*0.5), -1*map(height*0.5+spectrum[k], 0, height*0.5, height*0.1, 0),frameCount*0.0001 );

  }
  endShape();

  beginShape();
  for (k = fft1; k<fft1+50; k++) {

    noFill();
    stroke(255);
    vertex(windowWidth*0.15+k*0.5, map(height*0.5+spectrum[k], 0, height*0.5, height*0.1, 0),frameCount*0.0001 );

  }
  endShape();

  beginShape();
  for (k = fft1; k<fft1+50; k++) {

    noFill();
    stroke(255);
    vertex(windowWidth*0.15+k*0.5, -1*map(height*0.5+spectrum[k], 0, height*0.5, height*0.1, 0),frameCount*0.0001 );

  }
  endShape();

  fft1+=5;
  if(fft1>spectrum.length){
    fft1=0;
  }




  a++;


  if(a>20){
    b=random(-1,1);
    c=random(50,180);
    c2=random(0,150);
    shape=random(0,99);
    a=0;
  }

}

function playmusic1(){
  if(song2.isPlaying()){
    song2.stop();
  }
  if(song3.isPlaying()){
    song3.stop();
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
  if(song3.isPlaying()){
    song3.stop();
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

function playmusic3(){
  if(song1.isPlaying()){
    song1.stop();
  }
  if(song2.isPlaying()){
    song2.stop();
  }


  if(song3.isPlaying()){
    song3.stop();
  }
  else{
    song3.loop();
    analyzer.setInput(song3);
    fft.setInput(song3);
  }
}
