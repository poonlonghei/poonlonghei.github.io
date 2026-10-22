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

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  isoDate: string;
  readingTime: string;
  excerpt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const posts: BlogPost[] = [
  {
    slug: "opus-dei-and-london-oratory",
    title: "The relationship between Opus Dei and the London Oratory Fathers",
    subtitle: "A shared history in Britain",
    date: "20 October 2026",
    isoDate: "2026-10-20",
    readingTime: "2 min read",
    excerpt: "As I discern a possible vocation with the Oratorian Fathers or as a celibate layman in Opus Dei, I recently discovered a historical connection between the Brompton Oratory and Opus Dei’s earliest years in Britain.",
    sections: [
      { heading: "Two paths under consideration", paragraphs: [
        "Some of you might know that I am currently discerning my priestly vocation. If it is God’s will, I will probably join the Oratory of St Philip Neri at the Brompton Oratory located in South Kensington, London. However, if God wants me not to become a priest but instead to remain a celibate layman, I am considering joining Opus Dei as a Numerary Member.",
        "Interestingly, I recently came across an article on the Opus Dei UK website about the history of Opus Dei in Britain, and in particular its early relationship with the Brompton Oratory."
      ]},
      { heading: "An early connection in London", paragraphs: [
        "According to the article, the earliest members of Opus Dei came to London in 1946 to begin their apostolic work. During those early years, they often attended Holy Mass and prayed at the Brompton Oratory. Then, in 1947, the first centre of Opus Dei in Britain was established in a flat at Rutland Court, in the Oratory parish, with the approval of Cardinal Bernard Griffin, Archbishop of Westminster. One of the Fathers of the Brompton Oratory would even celebrate Holy Mass once a week at the centre, at a time when there was no priest of Opus Dei based in London.",
        "I find this little piece of history particularly interesting because of how closely these two spiritual realities have been connected from the very beginning of Opus Dei’s presence in Britain. The Brompton Oratory was not simply a place where the first members happened to attend Mass; it actually became part of the story of Opus Dei’s earliest years in London."
      ]},
      { heading: "Listening for God’s call", paragraphs: [
        "There is something quite beautiful about discovering this connection while I am myself discerning between these two possible paths. On the one hand, I am discerning a possible vocation to the priesthood with the Oratorian Fathers at the Brompton Oratory; on the other, I am considering the possibility of a vocation as a celibate layman within Opus Dei.",
        "Of course, I don’t know yet where God is calling me. Vocational discernment is ultimately about trying to listen to God’s will rather than deciding everything for oneself. For now, I can only pray, learn, seek good counsel, and remain open to wherever He may lead me.",
        "It is therefore quite encouraging—and perhaps a little providential—to discover that the histories of the Brompton Oratory and Opus Dei in Britain were already intertwined from their earliest days. Whatever vocation God eventually gives me, I hope that I will be able to recognise it with gratitude and embrace it faithfully."
      ]}
    ]
  },
  {
    slug: "new-website",
    title: "New Website",
    subtitle: "Time to start again",
    date: "19 October 2026",
    isoDate: "2026-10-19",
    readingTime: "3 min read",
    excerpt: "Starting again with a website is a chance to think about what I actually want it to do. I began this project on WordPress, then moved toward a portfolio that brings my work and interests together.",
    sections: [
      { heading: "A fresh start", paragraphs: ["Starting again with a website is a chance to think about what I actually want it to do. I began this project on WordPress, which gave me a way to get a site online without building every part myself. As the site developed, though, I wanted it to work more clearly as a portfolio: a place to introduce myself, show my work, and make it easy for people to find the different parts of my online presence."] },
      { heading: "Moving beyond WordPress", paragraphs: ["WordPress can be a useful starting point, but building a portfolio around it often meant relying on plugins for layouts and features I wanted. Managing those tools and the newer in-web editor gradually became more complicated than I needed.", "Moving to traditional HTML and CSS gave me a clearer view of how each page is put together. I could shape the layout directly, keep the pages lightweight, and make the site reflect my work more closely."] },
      { heading: "Building with purpose", paragraphs: ["This new site was built using TypeScript, and Next.js to bring together my writing, media projects, liturgical service, and personal interests. It is still a work in progress, and I will keep refining it as I learn. For now, it feels like a more direct and personal place to begin again."] }
    ]
  }
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
