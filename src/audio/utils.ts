const noteFromPitch = (frequency: number) => {
  var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
};

const getDetunePercent = (detune: number) => {
  if (detune > 0) {
    return 50 + detune;
  } else {
    return 50 + -detune;
  }
};

export { noteFromPitch, getDetunePercent };
