// Text to Speech

const synth = window.speechSynthesis;

const textToSpeech = (string) => {
  let voice = new SpeechSynthesisUtterance(string);
  voice.text = string;
  voice.lang = "en-US";
  voice.volume = 1;
  voice.rate = 1;
  voice.pitch = 1; // Can be 0, 1, or 2
  synth.speak(voice);
}


// const synth = window.speechSynthesis;

// const textToSpeech = (string, voiceGender = 'male') => {
//   let voice = new SpeechSynthesisUtterance(string);
//   voice.text = string;
//   voice.lang = "en-US";
//   voice.volume = 1;
//   voice.rate = 1;
//   voice.pitch = 1; // Can be 0, 1, or 2

//   // Get available voices
//   const voices = synth.getVoices();
  
//   // Find a female voice
//   const femaleVoice = voices.find(v => v.lang === 'en-US' && v.gender === 'female');
  
//   // Set the voice based on the selected gender
//   if (voiceGender === 'female' && femaleVoice) {
//     voice.voice = femaleVoice;
//   } else {
//     voice.voice = voices[0];
//   }

//   synth.speak(voice);
// }
