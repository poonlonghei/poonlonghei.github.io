export type Project = {
  id: string;
  title: string;
  date: string;
  categories: string[];
  video: string;
};

export const projects: Project[] = [
  { id: "41st-london-rosary-crusade", title: "41st London Rosary Crusade", date: "17 October 2026", categories: ["Interviewing"], video: "o0TFAVrfSo8" },
  { id: "archbishop", title: "Interview with Archbishop Richard Moth", date: "11 September 2026", categories: ["Filming"], video: "XjamDTWriT0" },
  { id: "march-for-life", title: "March for Life 2026", date: "8 September 2026", categories: ["Filming"], video: "SLlPvdPkVio" },
  { id: "latin-mass-pilgrimage", title: "Latin Mass Society Pilgrimage to Walsingham", date: "2 September 2026", categories: ["Filming", "Interviewing", "Video editing"], video: "VzjaYNOHkhA" },
  { id: "day-with-mary", title: "Day with Mary International Symposium", date: "29–31 July 2026", categories: ["Interviewing", "Video editing"], video: "u8hfyKDARNs" }
];

export const languages = [
  { name: "Cantonese", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Mandarin", level: "Fluent" },
  { name: "Italian", level: "Basic" },
  { name: "Spanish", level: "Basic" },
  { name: "Portuguese", level: "Basic" },
  { name: "Ecclesiastical Latin", level: "Reading" }
];
