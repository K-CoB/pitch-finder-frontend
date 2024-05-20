import { atom } from "recoil";

export const genderState = atom<string>({
  key: "genderState",
  default: undefined,
});
