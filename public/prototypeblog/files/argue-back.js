// argue-back.js — drop in, no build step.
// A notebook that argues back. It knows nothing. It just asks the next question.

const reframes = [
  "Om det är självklart, varför gör ingen det?",
  "Vad skulle få dig att tro motsatsen?",
  "Vem tjänar på att det här är sant?",
  "Vilket beteende skulle bevisa det? Inte vilken åsikt.",
  "Vad mäter du som egentligen inte spelar någon roll?",
];

export const argue = (i = 0) => reframes[i % reframes.length];

export default argue;
