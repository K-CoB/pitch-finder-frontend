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

const korNoteStrings = [
  "도",
  "도#",
  "레",
  "레#",
  "미",
  "파",
  "파#",
  "솔",
  "솔#",
  "라",
  "라#",
  "시",
];

export const getNoteFromFrequency = (frequency: number) => {
  return Math.round(12 * Math.log2(frequency / 440) + 69);
};

export const getFrequencyFromNote = (note: number) => {
  return 440 * Math.pow(2, (note - 69) / 12);
};

export const getPitchFromNote = (note: number) => {
  const noteString = noteStrings[note % 12]; // C3의 C
  const scale = Math.floor(note / 12); // C3의 3
  const korNoteString = korNoteStrings[note % 12]; // C3의 '도'
  const octave = scale - 2;

  return {
    scale,
    noteString,
    korNoteString,
    octave,
    pitch: noteString + scale,
  };
};
