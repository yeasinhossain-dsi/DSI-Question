import { create } from "zustand";
import userStore, { UserState } from "./user";
import questionStore, { QuestionState } from "./question";
import { devtools } from "zustand/middleware";

type IStore = UserState & QuestionState;

const useStore = create<IStore>()(
  devtools(
    (...a) => {
      return {
        ...userStore(...a),
        ...questionStore(...a),
      };
    },
    { enabled: true }
  )
);

export default useStore;
