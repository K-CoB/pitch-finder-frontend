import { atom } from "recoil";

export const genderState = atom<"여자" | "남자">({
  key: "gender",
  default: undefined,
});
