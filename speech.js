// Text to Speech

const synth = window.speechSynthesis;

const textToSpeech = (string) => {
  let voice = new SpeechSynthesisUtterance(string);
  voice.text = string;
  voice.lang = "en-US";
  voice.volume = 1;
  voice.rate = 1;
  voice.pitch = 1; // Can be 0, 1, or 2
  const voices = synth.getVoices();
  const femaleVoice = voices.find(v => v.lang === 'en-US' && v.gender === 'female');
  voice.voice = femaleVoice;
  synth.speak(voice);
}

const speechStop = ()=> synth.cancel()

