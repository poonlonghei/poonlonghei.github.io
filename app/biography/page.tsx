import { PageShell } from "@/components/site";

export const metadata = { title: "Biography" };

export default function BiographyPage() {
  return <PageShell>
    <main className="subpage page-width biography-page">
      <p className="eyebrow">About Chavez</p>
      <h1 className="subpage-title">A life of faith,<br /><em>story, and service.</em></h1>
      <article className="biography-copy">
        <p>Chavez L. H. Poon is an independent Roman Catholic writer and social media content creator. Born and raised in Hong Kong, he is now based in Walsingham, Norfolk, in the United Kingdom.</p>
        <p>His work centres on the Sacred Liturgy, the historic traditions of the Roman Catholic Church, ecclesiastical history, and contemporary Catholic life.</p>
        <p>Chavez works as a Production Assistant with EWTN Great Britain, contributing to the filming, interviews, and media coverage of Catholic events across the United Kingdom. In 2026, he took part in the EWTN Summer Academy in Rome, further developing his interests in Catholic journalism, digital evangelisation, and media communications.</p>
        <p>Alongside his work in writing and media, Chavez brings more than ten years of ceremonial and liturgical experience. He has served as an Acolyte, Sacristan, and Liturgical Master of Ceremonies at Holy Mass and other sacred celebrations in parishes and ecclesiastical communities across Hong Kong, Macau, and the United Kingdom.</p>
        <p>Through his writing, liturgical service, content creation, and social media apostolate, Chavez hopes to foster a deeper appreciation of the beauty of the Church’s worship, the continuity of Roman Catholic tradition, and the faithful proclamation of the Holy Gospel. In a modest way, he aims to support the preservation, study, and communication of the Church’s liturgical and ecclesiastical heritage.</p>
      </article>
    </main>
  </PageShell>;
}
