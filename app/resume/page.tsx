import { PageShell } from "@/components/site";
import { languages } from "@/content";
import Image from "next/image";

export const metadata = { title: "Curriculum Vitae" };

const digitalSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Bootstrap",
  "Next.js",
  "Tailwind.CSS",
  "WordPress",
];

type ResumeEntryProps = {
  title: string;
  organisation: string;
  period: string;
  description?: string | string[];
};

function ResumeEntry({
  title,
  organisation,
  period,
  description,
}: ResumeEntryProps) {
  return (
    <div className="resume-entry">
      <div>
        <h3>{title}</h3>
        <p>{organisation}</p>
      </div>
      <span>{period}</span>
      {Array.isArray(description) ? (
        <ul className="resume-entry-details">
          {description.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      ) : description ? (
        <p>{description}</p>
      ) : null}
    </div>
  );
}

export default function ResumePage() {
  return (
    <PageShell>
      <main className="resume-page">
        <header className="resume-hero page-width">
          <div className="resume-hero-copy">
            <p className="eyebrow">Curriculum Vitae · Chavez Poon</p>
            <h1 className="subpage-title">
              A life of service
              <br />
              <em>and storytelling.</em>
            </h1>
            <p className="resume-hero-intro">
              Born and raised in Hong Kong and now based in Walsingham, Norfolk, Chavez works across Catholic media, writing, content creation, and liturgical service. His work focuses on the Sacred Liturgy, the historic traditions of the Roman Catholic Church, ecclesiastical history, and contemporary Roman Catholic affairs.
            </p>
            <div className="resume-contact-links" aria-label="Contact details">
              <a className="resume-contact-link" href="mailto:poonlhchavez@gmail.com">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span>poonlhchavez@gmail.com</span>
              </a>
              <a
                className="resume-contact-link"
                href="https://www.chavezpoon.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.4 2.4 3.5 5.4 3.5 9s-1.1 6.6-3.5 9c-2.4-2.4-3.5-5.4-3.5-9S9.6 5.4 12 3Z" />
                </svg>
                <span>www.chavezpoon.com</span>
              </a>
            </div>
            <p className="eyebrow resume-updated">Resume updated October 2026</p>
            <a className="resume-scroll-cue" href="#resume-content">
              Explore my experience <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="resume-hero-portrait">
            <Image
              src="/assets/photos/chavez-ewtn.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 850px) 78vw, 40vw"
            />
          </div>
        </header>

        <div className="resume-content-layout page-width" id="resume-content">
          <aside className="resume-sidebar">
            <p className="eyebrow">On this page</p>
            <nav aria-label="Resume sections">
              <a href="#experience">Experience</a>
              <a href="#service">Liturgical and Ceremonial Service</a>
              <a href="#formation">Professional Formation</a>
              <a href="#languages">Languages</a>
              <a href="#skills">Technological Skills</a>
              <a href="#sacraments">Ecclesiastical Sacraments</a>
            </nav>
          </aside>

          <div className="resume-sections">
            <section className="resume-block" id="experience" aria-labelledby="resume-experience">
              <p className="eyebrow" id="resume-experience">
                01 · Experience
              </p>
              <ResumeEntry
                title="Production Assistant"
                organisation="EWTN Great Britain · United Kingdom"
                period="June 2026 – Present"
                description={[
                  "Assist with filming and interviewing at Catholic events across the United Kingdom.",
                  "Support media coverage and the communication of Catholic stories and events.",
                ]}
              />
              <ResumeEntry
                title="Mass and Pilgrimage Office Assistant"
                organisation="Basilica and National Shrine of Our Lady of Walsingham · Norfolk, United Kingdom"
                period="December 2025 – May 2026"
                description={[
                  "Assist with the organisation of Holy Masses, pilgrimages, and other liturgical celebrations.",
                  "Support Mass and Pilgrimage Office administration, including communications with pilgrimage organisers.",
                ]}
              />
            </section>

            <section className="resume-block" id="service" aria-labelledby="resume-service">
              <p className="eyebrow" id="resume-service">
                02 · Liturgical and Ceremonial Service
              </p>
              <ResumeEntry
                title="Acolyte, Sacristan & Master of Ceremonies"
                organisation="Parishes and other Ecclesiastical Communities · Hong Kong, Macau & United Kingdom"
                period="10+ years"
                description="Served at Holy Mass and other sacred liturgical celebrations."
              />
            </section>

            <section className="resume-block" id="formation" aria-labelledby="resume-formation">
              <p className="eyebrow" id="resume-formation">
                03 · Professional Formation
              </p>
              <ResumeEntry
                title="EWTN Summer Academy"
                organisation="Rome, Italy"
                period="22nd June - 1st July 2026"
                description="Developed interests in Catholic journalism, digital evangelisation, and media communications."
              />
            </section>

            <section className="resume-block" id="languages" aria-labelledby="resume-languages">
              <p className="eyebrow" id="resume-languages">
                04 · Languages
              </p>
              <div className="language-pills">
                {languages.map((language) => (
                  <span className="language-pill" key={language.name}>
                    <strong>{language.name}</strong>
                    <small>{language.level}</small>
                  </span>
                ))}
              </div>
            </section>

            <section className="resume-block" id="skills" aria-labelledby="resume-skills">
              <p className="eyebrow" id="resume-skills">
                05 · Technological Skills
              </p>
              <div className="skill-pills">
                {digitalSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>

            <section className="resume-block" id="sacraments" aria-labelledby="resume-sacraments">
              <p className="eyebrow" id="resume-sacraments">
                06 · Ecclesiastical Sacraments
              </p>
              <ResumeEntry
                title="Sacrament of Baptism"
                organisation="Location: Holy Family Chapel, Kowloon, Hong Kong"
                period="Date: 9th April 2012"
              />
              <ResumeEntry
                title="Sacrament of Confirmation"
                organisation="Location: Rosary Church, Kowloon, Hong Kong"
                period="Date: 11th October 2014"
                description={[
                  "Celebrant: Bishop Michael Yeung Ming Cheung",
                  "Confirmation Name: Cyril Mary (Cyrillus Mariae)",
                ]}
              />
            </section>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
