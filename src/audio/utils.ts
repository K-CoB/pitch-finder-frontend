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
  return Math.round(12 * Math.log2(frequency / 440) + 69);
};

export const getFrequencyFromNote = (note: number) => {
  return 440 * Math.pow(2, (note - 69) / 12);
};

export const getPitchFromNote = (note: number) => {
  const noteString = noteStrings[note % 12];
  const scale = Math.floor(note / 12) - 1;

  return { scale, noteString, pitch: noteString + scale };
};
