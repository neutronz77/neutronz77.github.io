
var synth1 = new Tone.Synth({
oscillator: {
  type: "fatsawtooth",
  detune: 0,
  count: 2
},
envelope: {
  attack: 0.02,
  decay: 0.3,
  sustain: 0,
  release: 0.2
}
}).toMaster()

var synth2 = new Tone.Synth({
oscillator: {
  type: "fatsine",
  detune: 0,
  count: 2
},
envelope: {
  attack: 0.02,
  decay: 0.3,
  sustain: 0,
  release: 0.2
}
}).toMaster()

var synth3 = new Tone.Synth({
oscillator: {
  type: "fattriangle",
  detune: 0,
  count: 2
},
envelope: {
  attack: 0.02,
  decay: 0.3,
  sustain: 0,
  release: 0.2
}
}).toMaster()

var synth4 = new Tone.Synth({
oscillator: {
  type: "fatsquare4",
  detune: 0,
  count: 2
},
envelope: {
  attack: 0.02,
  decay: 0.3,
  sustain: 0,
  release: 0.2
}
}).toMaster()

var synth5 = new Tone.MembraneSynth({
pitchDecay  : 0.05 ,
octaves  : 10 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 1.4 ,
attackCurve  : "exponential"
}
}).toMaster()

var synth0 = new Tone.PolySynth(6, Tone.Synth, {
			"oscillator" : {
				"partials" : [0, 2, 3, 4],
			}
		}).toMaster()

var synth;
var length;

reverb = new Tone.Freeverb();
filter = new Tone.Filter({
type  : "highpass" ,
frequency  : 350 ,
rolloff  : -12 ,
Q  : 1 ,
gain  : 0
});
delay = new Tone.PingPongDelay({
  "delayTime" : "8n",
  "feedback" : 0.1,
  "wet" : 0.1
}).toMaster()

filter.frequency.value = 5000;
reverb.roomSize.value = 0.2;


var octave0 = [16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87]
var octave1 = [0,0,0,0,0,0,0,0,0,0,0,0];
var octave2 = [0,0,0,0,0,0,0,0,0,0,0,0];
var octave3 = [0,0,0,0,0,0,0,0,0,0,0,0];
var octave4 = [0,0,0,0,0,0,0,0,0,0,0,0];
var octave5 = [0,0,0,0,0,0,0,0,0,0,0,0];
var octave45 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
for(var i=0; i<12; i++){
  octave1[i]=octave0[i]*2;
  octave2[i]=octave1[i]*2;
  octave3[i]=octave2[i]*2;
  octave4[i]=octave3[i]*2;
  octave5[i]=octave4[i]*2;
}
for(var i=0; i<24; i++){
  if(i<12){
    octave45[i]=octave4[i];
  }
  else{
    octave45[i]=octave5[i-12];
  }

}

var notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var played_scale = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function generate_root(){
  var generated_root;
  generated_root = notes[generateRandom(0,11)];
  return generated_root;
}

function generate_major(){
  var generated_major = generateRandom(0,1);
  return generated_major;
}


function play_synth(root, major, i, synthnum){
  if(synthnum==1){
    synth = synth1;
  }
  else if(synthnum==2){
    synth = synth2;
  }
  else if(synthnum==3){
    synth = synth3;
  }
  else if(synthnum==4){
    synth = synth4;
  }
  else if(synthnum==5){
    synth = synth5;
  }
  else if(synthnum==0){
    synth = synth0;
  }


    synth.connect(delay);
    delay.connect(reverb);
    reverb.connect(filter);
    filter.connect(Tone.Master);





  length = Math.random();
  played_scale = make_scale(root, major);
  if(synthnum!=0){
    synth.triggerAttackRelease(played_scale[i],"8n")
  }
  else{
    synth.triggerAttackRelease(played_scale[i],"8n")
  }


}

function make_scale(root, major){
  var scale = [0,0,0,0,0,0,0];
  var scale2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var whichroot;

  for(var i=0; i<12; i++){
    if(root==notes[i]){
      whichroot = i;
    }
  }

  if(major == 1){
    scale[0] = octave45[whichroot];
    scale[1] = octave45[whichroot+2];
    scale[2] = octave45[whichroot+4];
    scale[3] = octave45[whichroot+5];
    scale[4] = octave45[whichroot+7];
    scale[5] = octave45[whichroot+9];
    scale[6] = octave45[whichroot+11];
  }
  else if(major == 0){
    scale[0] = octave45[whichroot];
    scale[1] = octave45[whichroot+2];
    scale[2] = octave45[whichroot+3];
    scale[3] = octave45[whichroot+5];
    scale[4] = octave45[whichroot+7];
    scale[5] = octave45[whichroot+8];
    scale[6] = octave45[whichroot+10];
  }

  for(var i=0; i<14; i++){
    if(i<7){
      scale2[i]=scale[i];
    }
    else{
      scale2[i]=scale[i-7]*2
    }
  }

  return scale2;
}

function effect_generator(){
  filter.frequency.value = generateRandom(2000,20000);
  reverb.roomSize.value = Math.random();
  delay.wet.value = Math.min(0.6,Math.random());
  delay.feedback.value = Math.random()/2;
}

function envelope_generator(){
  synth.envelope.attack = Math.random();
  synth.envelope.decay = Math.random();
}

function volume_control(i){
  Tone.Master.volume.value = i;
}

function generateRandom(min, max) {
  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  return ranNum;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


var progression_weight = 0;
var mono_or_poly = 0;

function getRandomNode_mono(w1,w2,w3){
  var row = new Array(14);
  for(var i=0;i<14;i++){
    var inner_row = new Array(16);
    row[i] = inner_row;
  }

  for(var i=0; i <16; i++)
  {
    var k=generateRandom(0,13);
    var ran_var = Math.random();

    /////
    if((i+1)%4 == 1)
    {
			if(ran_var<=w1){
				row[k][i]=1;
			}
			else{
				row[k][i]=0;
			}
		}
		else if((i+1)%4 == 3)
    {
			if(ran_var<=w2){
				row[k][i]=1;
			}
			else{
				row[k][i]=0;
			}
		}
		else if((i+1)%4 == 2 || (i+1)%4==0)
    {
			if(ran_var<=w3){
				row[k][i]=1;
			}
			else{
				row[k][i]=0;
			}
		}
    /////

    for(var j=0;j<14;j++)
    {
      if(j!=k)
      {
        row[j][i]=0;
      }
    }
  }

  for(var i=0; i<14; i++){
    sequencer.matrix.set.row(i,row[i]);
  }
}

function getRandomNode(w1,w2,w3){
  var row = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	for (var i=0; i <16; i++)
  {
		var ran_var = Math.random();
		if((i+1)%4 == 1)
    {
			if(ran_var<=w1){
				row[i]=1;
			}
			else{
				row[i]=0;
			}
		}
		else if((i+1)%4 == 3)
    {
			if(ran_var<=w2){
				row[i]=1;
			}
			else{
				row[i]=0;
			}
		}
		else if((i+1)%4 == 2 || (i+1)%4==0)
    {
			if(ran_var<=w3){
				row[i]=1;
			}
			else{
				row[i]=0;
			}
		}
  }
	return row;
}
