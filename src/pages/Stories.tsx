import { PageHero } from "@/components/PageHero";
import { Quote } from "lucide-react";
import joyImg from "@/assets/child-joy.jpg";
import communityImg from "@/assets/community.jpg";
import heroImg from "@/assets/hero-mother-child.jpg";

const stories = [
  {
    img: joyImg,
    name: "Aarav, 9",
    location: "Pune",
    quote: "I love cricket and my favourite subject is science. My implant is just part of who I am — like my glasses.",
    body: "Aarav was implanted at age three. Today, he's a chatty fourth-grader who loves explaining how his sound processor works to curious classmates.",
  },
  {
    img: heroImg,
    name: "Priya, parent",
    location: "Mumbai",
    quote: "When my son was diagnosed, I felt completely lost. Samaanya didn't give me pity — they gave me a roadmap.",
    body: "Priya now mentors other newly-diagnosed families through our parent circles, paying forward the support she once received.",
  },
  {
    img: communityImg,
    name: "The Sharma family",
    location: "Delhi",
    quote: "We learned that this isn't a journey we walk alone. There's a whole community here.",
    body: "After connecting through a Samaanya workshop, the Sharmas began organising informal meet-ups for other families in their neighbourhood.",
  },
];

const Stories = () => {
  return (
    <>
      <PageHero
        eyebrow="Stories & impact"
        title="Real journeys. Real people."
        description="Behind every statistic is a person, a family, and a story worth listening to."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="space-y-20">
          {stories.map((s, i) => (
            <article key={s.name} className={`grid items-center gap-10 md:grid-cols-12 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <img
                src={s.img}
                alt={s.name}
                width={1200}
                height={1200}
                loading="lazy"
                className="aspect-square w-full rounded-3xl object-cover shadow-elegant md:col-span-5"
              />
              <div className="md:col-span-7">
                <Quote className="h-8 w-8 text-accent" />
                <blockquote className="mt-4 font-serif text-2xl leading-snug text-balance md:text-3xl">
                  “{s.quote}”
                </blockquote>
                <div className="mt-6">
                  <p className="font-serif text-xl">{s.name}</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{s.location}</p>
                </div>
                <p className="mt-5 leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Stories;
