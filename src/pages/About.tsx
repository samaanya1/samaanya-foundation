import { PageHero } from "@/components/PageHero";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Samay Tulsyan",
    role: "Founder",
    initials: "ST",
    bio: "Founder with lived experience of cochlear implant. Currently a law student at National Law University, Jodhpur. Focused on access, inclusion, and support systems.",
  },
  {
    name: "Aanya Tulsyan",
    role: "Co-Founder",
    initials: "AT",
    bio: "Student at Ashoka University. Inspired by her brother's journey, she focuses on awareness, guidance, and building accessible systems for students and families.",
  },
  {
    name: "Suhani Goel",
    role: "Creative Head",
    initials: "SG",
    bio: "Student at Symbiosis Centre for Media and Communication, Pune. Leads creative direction, storytelling, and social media outreach for the foundation.",
  },
  {
    name: "Veethika Kapur",
    role: "Audiologist",
    initials: "VK",
    bio: "Provides professional expertise in hearing health, cochlear implants, and guidance for families navigating the journey.",
  },
];

const About = () => {
  return (
    <>
      <PageHero
        eyebrow="About Samaanya"
        title="Born from lived experience. Built for everyone."
        description="Samaanya means 'equal' — and that idea sits at the heart of everything we do."
      />

      {/* MISSION / VISION */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-soft">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Mission</p>
            <h2 className="mt-3 font-serif text-3xl">A clearer path for every family.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              To ensure that no family in India navigates hearing disability alone — by
              providing accurate information, empathetic guidance, and an active community.
            </p>
          </div>
          <div className="rounded-3xl bg-primary p-10 text-primary-foreground shadow-elegant">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground/70">Vision</p>
            <h2 className="mt-3 font-serif text-3xl">An India where access is the default.</h2>
            <p className="mt-4 leading-relaxed text-primary-foreground/80">
              A society in which hearing disability — and disability more broadly — is met
              with information and dignity, never assumption or pity.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="gradient-sage border-y border-border">
        <div className="container-narrow py-20">
          <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-accent">Founder story</p>
          <h2 className="mt-3 text-center font-serif text-4xl md:text-5xl">A journey that began with one child.</h2>

          <div className="mt-12 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              <span className="font-serif text-2xl text-primary">Samay Tulsyan</span> is the
              Founder of Samaanya Foundation and someone who understands hearing
              disability through lived experience. Having received a cochlear implant at a
              young age, he grew up navigating communication, education, and social spaces
              that are often not designed to be inclusive.
            </p>
            <p>
              He is currently a law student at a National Law University, Jodhpur. His
              experiences shaped his understanding of access, opportunity, and the everyday
              barriers faced by individuals with hearing impairments and their families.
            </p>
            <p>
              Samaanya Foundation emerged from this intersection of personal experience and
              a desire to make the journey easier for others. The focus is on awareness,
              guidance, and building a support system — especially for families who often
              don't know where to begin.
            </p>
            <p className="font-serif text-2xl text-accent">
              For him, this work is about ensuring access, information, and dignity — not
              charity.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Our team</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">The people behind Samaanya</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            A small, committed group of students, professionals, and family members who
            believe in building something better.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {team.map((m) => (
            <article key={m.name} className="rounded-3xl border border-border bg-card p-8 transition-smooth hover:-translate-y-1 hover:shadow-soft">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-serif text-primary-foreground">
                  {m.initials}
                </div>
                <div>
                  <h3 className="font-serif text-2xl">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-accent">{m.role}</p>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-muted-foreground">{m.bio}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Work with us</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default About;
