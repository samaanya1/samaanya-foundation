import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const sessions = [
  {
    id: 1,
    title: "Newly diagnosed: a conversation for parents",
    date: "Sat, 17 May 2026 · 4:00 PM IST",
    location: "Online (Zoom)",
    description: "A gentle, judgement-free session for parents of children recently diagnosed with hearing loss. Hear from experienced parents and an audiologist.",
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
    description: "Practical strategies for teachers and school leaders to make classrooms genuinely accessible for children with hearing disability.",
  },
];

const Workshops = () => {
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
        eyebrow="Workshops & webinars"
        title="Learn together. Grow together."
        description="Join our upcoming sessions — open to parents, individuals, educators, and anyone curious to learn."
      />

      <section className="mx-auto max-w-5xl px-6 py-20">
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

export default Workshops;
