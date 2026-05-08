import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Megaphone, Users, Sparkles, Globe, CalendarDays } from "lucide-react";
import workshopImg from "@/assets/workshop.jpg";

// Replace this with your Samaanya Foundation Google Calendar ID (Calendar Settings → Integrate calendar → Calendar ID)
const GOOGLE_CALENDAR_ID = "hello@samaanyafoundation.org";

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

const sessions = [
  {
    id: 1,
    title: "Newly diagnosed: a conversation for parents",
    date: "Sat, 17 May 2026 · 4:00 PM IST",
    location: "Online (Zoom)",
    description: "A gentle, judgement-free session for parents of children recently diagnosed with hearing loss.",
  },
  {
    id: 2,
    title: "Cochlear implants: questions you can ask your doctor",
    date: "Sun, 8 June 2026 · 11:00 AM IST",
    location: "Online (Zoom)",
    description: "What to ask before, during, and after considering a cochlear implant. With audiologist Veethika Kapur.",
  },
  {
    id: 3,
    title: "School inclusion workshop for educators",
    date: "Sat, 28 June 2026 · 3:00 PM IST",
    location: "Mumbai · Hybrid",
    description: "Practical strategies for teachers and school leaders to make classrooms genuinely accessible.",
  },
];

const Programs = () => {
  const [selected, setSelected] = useState<typeof sessions[0] | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please share your name and email.");
      return;
    }
    toast.success("You're registered! We'll send details to your email.");
    setForm({ name: "", email: "", phone: "", role: "" });
    setSelected(null);
  };

  return (
    <>
      <PageHero
        eyebrow="Programs & workshops"
        title="Practical work, rooted in real lives."
        description="Everything we do is shaped by the people we serve — families, recipients, and communities."
      />

      {/* Programs grid */}
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

      {/* Parent circles intro */}
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
          </div>
        </div>
      </section>

      {/* Workshops list */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Upcoming workshops</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Learn together. Grow together.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Open to parents, individuals, educators, and anyone curious to learn.
          </p>
        </div>

        <div className="space-y-6">
          {sessions.map((s) => (
            <article key={s.id} className="rounded-3xl border border-border bg-card p-8 transition-smooth hover:shadow-soft md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="font-serif text-2xl md:text-3xl">{s.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {s.date}</span>
                    <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {s.location}</span>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
                <Button variant="hero" size="lg" onClick={() => setSelected(s)} className="shrink-0">
                  Register now
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 text-center text-sm text-muted-foreground">
          <Clock className="mr-2 inline h-4 w-4" />
          Past sessions archive coming soon.
        </p>
      </section>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Register</DialogTitle>
            <DialogDescription>{selected?.title}</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="r-name">Name</Label>
              <Input id="r-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required />
            </div>
            <div>
              <Label htmlFor="r-email">Email</Label>
              <Input id="r-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
            </div>
            <div>
              <Label htmlFor="r-phone">Phone</Label>
              <Input id="r-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
            </div>
            <div>
              <Label htmlFor="r-role">I am a...</Label>
              <Input id="r-role" placeholder="parent, educator, individual..." value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} maxLength={50} />
            </div>
            <Button type="submit" variant="hero" className="w-full" size="lg">Confirm registration</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Programs;
