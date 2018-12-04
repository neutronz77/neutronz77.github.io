window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function TR808Tone1(context, osc_frequency, osc_sweep, amp_gain, amp_decaytime) {
	this.context = context;
	this.osc_frequency = osc_frequency;
	this.osc_sweep = osc_sweep;
	this.amp_gain = amp_gain;
	this.amp_decaytime = amp_decaytime;


	this.amp_attack_time = 0.0;
//		this.decay = 0.7;
};

// create and connect
TR808Tone1.prototype.setup = function() {
	this.osc = this.context.createOscillator();
  this.gain = this.context.createGain();
  this.osc.connect(this.gain);
  this.gain.connect(this.context.destination)
};


TR808Tone1.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(this.osc_frequency, time);
	if (this.osc_sweep == 'linear') {
		this.osc.frequency.linearRampToValueAtTime(1, time + this.amp_attack_time + this.amp_decaytime);
	}
	else if (this.osc_sweep == 'exp') {
		this.osc.frequency.exponentialRampToValueAtTime(1, time + this.amp_attack_time + this.amp_decaytime);
	}

	this.gain.gain.setValueAtTime(0, time);
	this.gain.gain.linearRampToValueAtTime(this.amp_gain, time +  this.amp_attack_time);
	this.gain.gain.exponentialRampToValueAtTime(0.01, time + this.amp_attack_time +  this.amp_decaytime);

	this.osc.start(time);

	this.osc.stop(time + this.amp_attack_time +  this.amp_decaytime);
};

function TR808Tone2(context, highpass_freq, amp_gain, amp_decaytime) {
	this.context = context;

	this.highpass_frequency = highpass_freq;


	this.amp_decaytime = amp_decaytime;
	this.amp_gain = amp_gain;
	this.amp_attack_time = 0.0;
};

TR808Tone2.prototype.noiseBuffer = function() {
	var bufferSize = this.context.sampleRate;
	var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
	var output = buffer.getChannelData(0);

	for (var i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	return buffer;
};

TR808Tone2.prototype.setup = function() {

	this.noise = this.context.createBufferSource();
	this.noise.buffer = this.noiseBuffer();

	var noiseFilter = this.context.createBiquadFilter();
	noiseFilter.type = 'highpass';
	noiseFilter.frequency.value = this.highpass_frequency;
	noiseFilter.Q.value = 1;

	this.noise.connect(noiseFilter);
	this.noiseEnvelope = this.context.createGain();
  noiseFilter.connect(this.noiseEnvelope);
  this.noiseEnvelope.connect(this.context.destination);
};

TR808Tone2.prototype.trigger = function(time) {
	this.setup();

	this.noiseEnvelope.gain.setValueAtTime(this.amp_gain, time);
	this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + this.amp_decaytime);
	this.noise.start(time)
	this.noise.stop(time + this.amp_decaytime);
};


function play_kick()
{
	var kick = new TR808Tone1(context, 150, 'exp', 2, 0.3);
	var now = context.currentTime;

	kick.trigger(now);
}

function play_808()
{
	var low_tom = new TR808Tone1(context, 100, 'linear', 0.5, 3);
	var now = context.currentTime;

	low_tom.trigger(now);
}


function play_midtom()
{
	var mid_tom = new TR808Tone1(context, generateRandom(300,500), 'linear', 1, 0.5);
	var now = context.currentTime;

	mid_tom.trigger(now);
}

function play_snare()
{
	var snare = new TR808Tone2(context, 500, 0.5, 0.2);
	var now = context.currentTime;

	snare.trigger(now);
}

function play_open_hihat()
{
	var snare = new TR808Tone2(context, generateRandom(1000,2000), 0.15, 0.4);
	var now = context.currentTime;

	snare.trigger(now);
}

function play_close_hihat()
{
	var snare = new TR808Tone2(context, 2000, 0.5, 0.05);
	var now = context.currentTime;

	snare.trigger(now);
}
