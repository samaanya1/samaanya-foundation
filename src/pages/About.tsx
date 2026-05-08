import { PageHero } from "@/components/PageHero";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import samayPhoto from "@/assets/team-samay.png";
import aanyaPhoto from "@/assets/team-aanya.png";
import suhaniPhoto from "@/assets/team-suhani.jpg";
import manishaPhoto from "@/assets/team-manisha.png";

const team = [
  {
    name: "Samay Tulsyan",
    role: "Founder",
    initials: "ST",
    photo: samayPhoto,
    bio: "Founder with lived experience of cochlear implant. Currently a law student at National Law University, Jodhpur. Focused on access, inclusion, and support systems.",
  },
  {
    name: "Manisha Tulsyan",
    role: "Director — Family Guidance & Welfare",
    initials: "MT",
    photo: manishaPhoto,
    bio: "Manisha Tulsyan serves as the Director of Family Guidance and Welfare at Samaanya Foundation, where she works closely with children with disabilities and their families to provide emotional support, guidance, and access to resources. As the mother of a cochlear implant recipient, she brings not only professional commitment but also lived experience and deep personal understanding to her role. With a compassionate and community-oriented approach, she focuses on strengthening family support systems, spreading awareness about hearing disabilities, and ensuring that parents feel empowered while navigating the challenges associated with disability and inclusion. Through her work, she aims to create a more understanding, accessible, and supportive environment for persons with disabilities and their families.",
  },
  {
    name: "Aanya Tulsyan",
    role: "Co-Founder",
    initials: "AT",
    photo: aanyaPhoto,
    bio: "Student at Ashoka University. Inspired by her brother's journey, she focuses on awareness, guidance, and building accessible systems for students and families.",
  },
  {
    name: "Suhani Goel",
    role: "Creative Head",
    initials: "SG",
    photo: suhaniPhoto,
    bio: "Student at Symbiosis Centre for Media and Communication, Pune. Leads creative direction, storytelling, and social media outreach for the foundation.",
  },
  {
    name: "Veethika Kapur",
    role: "Audiologist",
    initials: "VK",
    photo: null as string | null,
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

      {/* FOUNDER STORY — in Samay's own words */}
      <section className="gradient-sage border-y border-border">
        <div className="container-narrow py-20">
          <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-accent">In the founder's words</p>
          <h2 className="mt-3 text-center font-serif text-4xl md:text-5xl">Why Samaanya exists.</h2>
          <p className="mt-4 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">— Samay Tulsyan, Founder</p>

          <div className="mt-12 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              I am <span className="font-serif text-2xl text-primary">Samay Tulsyan</span>, and I
              have lived with hearing disability for most of my life. While medical support and
              technology helped me hear better, they could not erase the challenges that came
              with being different in a society that often fails to understand disability with
              empathy.
            </p>
            <p>
              Growing up, I faced rejection, exclusion, and constant judgment. I was denied
              opportunities, struggled to find acceptance in schools, and often had to work
              twice as hard just to be treated equally. There were moments when people saw my
              hearing disability before they saw me as a person. The emotional impact of
              feeling isolated, misunderstood, or left behind is something countless individuals
              with hearing disabilities silently go through every day.
            </p>
            <p className="font-serif text-2xl text-accent">
              But these experiences also shaped my purpose.
            </p>
            <p>
              Samaanya Foundation was created with the belief that people with hearing
              disabilities deserve more than medical assistance — they deserve dignity,
              inclusion, confidence, and equal opportunities. Our work is not limited to
              providing support; it is about standing beside individuals and families as they
              navigate education, social acceptance, emotional well-being, and access to
              opportunities that many take for granted.
            </p>
            <p>
              We believe that disability should never become a barrier to education,
              friendships, careers, or dreams. Through awareness, guidance, financial support,
              and community building, Samaanya Foundation aims to create a society where people
              with hearing disabilities are not made to feel different, but are empowered to
              live with confidence and pride.
            </p>
            <p className="font-serif text-2xl text-primary">
              Because true inclusion begins when society learns to listen beyond a disability.
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
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-serif text-primary-foreground">
                    {m.initials}
                  </div>
                )}
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
