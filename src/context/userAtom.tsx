import { atom, useRecoilValue, useSetRecoilState } from "recoil";

interface UserAtomI {
  highest: number;
  lowest: number;
}

const UserAtom = atom<UserAtomI>({ key: "userAtom" });

export default function useUserAtom() {
  const getUserAtom = useRecoilValue(UserAtom);
  const setUserAtom = useSetRecoilState(UserAtom);

  return { getUserAtom, setUserAtom };
}
