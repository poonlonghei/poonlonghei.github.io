import { PageShell } from "@/components/site";

export const metadata = { title: "Biography" };

export default function BiographyPage() {
  return <PageShell>
    <main className="subpage page-width biography-page">
      <p className="eyebrow">About Chavez</p>
      <h1 className="subpage-title">A life of faith,<br /><em>story, and service.</em></h1>
      <article className="biography-copy">
        <p>Chavez L. H. Poon is a Roman Catholic independent freelance writer and social media content creator, born and raised in Hong Kong and currently based in Walsingham, Norfolk, United Kingdom.</p>
        <p>His content creation work focuses particularly on the Sacred Liturgy, the historic traditions of the Roman Catholic Church, ecclesiastical history, and contemporary Roman Catholic affairs.</p>
        <p>Chavez currently works with EWTN Great Britain as a Production Assistant, assisting with the filming, interviewing, and media coverage of Catholic events across the United Kingdom. He also participated in the EWTN Summer Academy 2026 in Rome, where he further developed his interest in Catholic journalism, digital evangelisation, and media communications.</p>
        <p>Alongside his writing, media, and content creation work, Chavez has more than ten years of ceremonial and liturgical experience, having served as an Acolyte, Sacristan, and Liturgical Master of Ceremonies at Holy Mass and other sacred liturgical celebrations in various parishes and ecclesiastical communities throughout Hong Kong, Macau, and the United Kingdom.</p>
        <p>Through his writing, liturgical service, content creation, and social media apostolate, he seeks to foster a deeper appreciation of the beauty of the Church’s worship, the continuity of Roman Catholic tradition, and the faithful transmission of the message of the Holy Gospel. His work seeks, in a modest way, to contribute to the preservation, study, and communication of the Catholic Church’s liturgical and ecclesiastical heritage.</p>
      </article>
    </main>
  </PageShell>;
}
