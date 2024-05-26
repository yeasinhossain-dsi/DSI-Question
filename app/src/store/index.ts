import { create } from "zustand";
import userStore, { UserState } from "./user";
import { devtools } from "zustand/middleware";

type IStore = UserState;

const useStore = create<IStore>()(
  devtools(
    (...a) => {
      return {
        ...userStore(...a),
      };
    },
    { enabled: true }
  )
);

export default useStore;
