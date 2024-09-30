import create from "zustand";

type ReportFilterModel = {
    year: number;
    month: number;
    subGroup: number | null;
    place: number | null;
    setYear: (y: number) => void;
    setMonth: (m: number) => void;
    setSubGroup: (sg: number) => void;
    setPlace: (pl: number) => void;
};



export const useReportFilterStore = create<ReportFilterModel>((set) => ({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    subGroup: null,
    place: null,
    setYear: (y: number) => set(() => ({ year: y })),
    setMonth: (m: number) => set(() => ({ month: m })),
    setSubGroup: (sg: number) => set(() => ({ subGroup: sg })),
    setPlace: (pl: number) => set(() => ({ place: pl }))
}));
