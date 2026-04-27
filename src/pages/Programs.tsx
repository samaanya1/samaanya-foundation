import { PageHero } from "@/components/PageHero";
import { Megaphone, Users, Sparkles, Globe } from "lucide-react";
import workshopImg from "@/assets/workshop.jpg";

const programs = [
  {
    icon: Megaphone,
    title: "Awareness campaigns",
    text: "Schools, workplaces, and community talks that demystify hearing disability and challenge everyday assumptions.",
  },
  {
    icon: Users,
    title: "Parent support programs",
    text: "Guided groups where new parents meet experienced ones, share challenges, and find tested resources together.",
  },
  {
    icon: Sparkles,
    title: "Community initiatives",
    text: "Meet-ups, celebrations, and creative projects that build belonging for CI recipients and their families.",
  },
  {
    icon: Globe,
    title: "Towards broader inclusion",
    text: "Future programs that expand into wider disability inclusion, advocacy, and policy conversations.",
  },
];

const Programs = () => {
  return (
    <>
      <PageHero
        eyebrow="Programs & initiatives"
        title="Practical work, rooted in real lives."
        description="Everything we do is shaped by the people we serve — families, recipients, and communities."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((p) => (
            <article key={p.title} className="rounded-3xl border border-border bg-card p-8 transition-smooth hover:-translate-y-1 hover:shadow-soft">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-2xl md:text-3xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gradient-warm">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <img
            src={workshopImg}
            alt="A community parent workshop in session"
            width={1400}
            height={1000}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-elegant"
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">In focus</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Parent circles, every month.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our parent circles are small, intimate sessions led by families who've walked
              the same road. No medical jargon. No judgement. Just shared experience and
              honest conversation.
            </p>
            <a href="/workshops" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-smooth hover:bg-primary/90">See upcoming sessions</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
