// app/stores/useFeatureFlags.js
import { create } from "zustand";

const useFeatureFlags = create((set) => ({
  flags: {
    admin: { newDashboard: true, reports: true },
    manager: { studentModule: true, attendance: false },
    principal: { studentModule: false, attendance: false },
    faculty: { attendance: false },
  },
  toggleFlag: (role, feature) =>
    set((state) => ({
      flags: {
        ...state.flags,
        [role]: {
          ...state.flags[role],
          [feature]: !state.flags[role][feature],
        },
      },
    })),
  assignPermission: (role, feature, isEnabled) =>
    set((state) => ({
      flags: {
        ...state.flags,
        [role]: {
          ...state.flags[role],
          [feature]: isEnabled,
        },
      },
    })),
}));

export default useFeatureFlags;
