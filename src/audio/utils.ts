const noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const getNoteFromFrequency = (frequency: number) => {
  var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
};

export const getPitchFromNote = (note: number) => {
  const noteString = noteStrings[note % 12];
  const scale = Math.floor(note / 12) - 1;

  return { scale, noteString, pitch: noteString + scale };
};
