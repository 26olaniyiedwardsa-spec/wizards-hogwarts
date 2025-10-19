const AudioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioMuted = false;
function setAudioMuted(v){ audioMuted = !!v; }
function playSound(type='cast'){
  if(audioMuted) return;
  if(!AudioCtx) return;
  const now = AudioCtx.currentTime;
  const osc = AudioCtx.createOscillator();
  const gain = AudioCtx.createGain();
  osc.connect(gain);
  gain.connect(AudioCtx.destination);
  gain.gain.setValueAtTime(0.12, now);

  switch(type){
    case 'cast':
      osc.type='sawtooth';
      osc.frequency.setValueAtTime(520, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      break;
    case 'hit':
      osc.type='square';
      osc.frequency.setValueAtTime(240, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      break;
    case 'damage':
      osc.type='triangle';
      osc.frequency.setValueAtTime(160, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      break;
    case 'levelup':
      osc.type='sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.45);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      break;
    case 'click':
      osc.type='square';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      break;
    case 'footstep':
      osc.type='sine';
      osc.frequency.setValueAtTime(110, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      break;
  }

  osc.start(now);
  osc.stop(now + 0.5);
}