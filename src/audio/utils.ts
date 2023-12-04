const noteFromPitch = (frequency: number) => {
  var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
};

export { noteFromPitch };
