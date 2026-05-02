import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Fundraiser {
  id: string;
  name: string;
  age: number;
  city: string;
  need: string;
  story: string;
  goal: number;
  raised: number;
  donors: number;
}

const initialFundraisers: Fundraiser[] = [
  {
    id: "aarav",
    name: "Aarav, age 3",
    age: 3,
    city: "Lucknow, UP",
    need: "Cochlear implant surgery + first year of therapy",
    story:
      "Aarav was born with profound hearing loss. His parents — a school teacher and an auto driver — have been saving for two years. With a cochlear implant before age 4, he can grow up with spoken language alongside his classmates.",
    goal: 500000,
    raised: 125000,
    donors: 84,
  },
  {
    id: "sara",
    name: "Sara, age 7",
    age: 7,
    city: "Pune, MH",
    need: "Replacement processor and speech therapy",
    story:
      "Sara received her implant at age 2. Her processor is failing and her family cannot afford the upgrade. A new processor will let her continue mainstream school without falling behind.",
    goal: 300000,
    raised: 210000,
    donors: 156,
  },
  {
    id: "rohan",
    name: "Rohan, age 5",
    age: 5,
    city: "Guwahati, AS",
    need: "Bilateral hearing aids and one year of auditory-verbal therapy",
    story:
      "Rohan's family travels six hours each way to reach an audiologist. We're raising funds for hearing aids and a structured year of therapy delivered locally.",
    goal: 180000,
    raised: 42000,
    donors: 31,
  },
];

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

const Fundraisers = () => {
  const [list, setList] = useState<Fundraiser[]>(initialFundraisers);
  const [selected, setSelected] = useState<Fundraiser | null>(null);
  const [amount, setAmount] = useState<string>("1000");
  const [donor, setDonor] = useState({ name: "", email: "" });

  const totals = useMemo(() => {
    const goal = list.reduce((a, f) => a + f.goal, 0);
    const raised = list.reduce((a, f) => a + f.raised, 0);
    const donors = list.reduce((a, f) => a + f.donors, 0);
    return { goal, raised, donors };
  }, [list]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    const value = Number(amount);
    if (!value || value < 100) {
      toast.error("Please enter at least ₹100.");
      return;
    }
    if (!donor.name || !donor.email) {
      toast.error("Please share your name and email.");
      return;
    }
    setList((prev) =>
      prev.map((f) =>
        f.id === selected.id
          ? { ...f, raised: Math.min(f.goal, f.raised + value), donors: f.donors + 1 }
          : f,
      ),
    );
    toast.success(`Thank you, ${donor.name}! Your ₹${inr(value)} has been added to ${selected.name}'s fundraiser.`);
    setSelected(null);
    setAmount("1000");
    setDonor({ name: "", email: "" });
  };

  return (
    <>
      <PageHero
        eyebrow="Fundraisers"
        title="Real families. Real needs. Real progress."
        description="100% of every contribution goes directly to the family. Every donation updates the bar in real time."
      />

      {/* Totals strip */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6 px-6 py-10 text-center">
          <div>
            <p className="font-serif text-3xl text-primary md:text-4xl">₹{inr(totals.raised)}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Raised so far</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-accent md:text-4xl">₹{inr(totals.goal)}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Total goal</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-foreground md:text-4xl">{totals.donors}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Donors</p>
          </div>
        </div>
      </section>

      {/* Fundraiser cards */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((f) => {
            const pct = Math.min(100, Math.round((f.raised / f.goal) * 100));
            return (
              <article
                key={f.id}
                className="flex flex-col rounded-3xl border border-border bg-card p-7 transition-smooth hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="font-serif text-2xl">{f.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-accent" /> {f.city}
                </p>
                <p className="mt-4 text-sm font-medium text-primary">{f.need}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{f.story}</p>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex items-baseline justify-between">
                    <p className="font-serif text-xl text-foreground">₹{inr(f.raised)}</p>
                    <p className="text-xs text-muted-foreground">of ₹{inr(f.goal)}</p>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r from-accent to-highlight transition-all duration-700",
                      )}
                      style={{ width: `${pct}%` }}
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-accent">{pct}% funded</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {f.donors} donors</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  className="mt-6 w-full"
                  onClick={() => setSelected(f)}
                  disabled={pct >= 100}
                >
                  <Heart className="h-4 w-4" />
                  {pct >= 100 ? "Fully funded — thank you!" : "Contribute"}
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-card p-8 text-center md:p-12">
          <h3 className="font-serif text-2xl md:text-3xl">Know a family that needs help?</h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We help families share their story and raise funds for hearing aids,
            cochlear implants, processors, and therapy. Reach out and we'll guide you
            through the process.
          </p>
          <Button asChild variant="warm" size="lg" className="mt-6">
            <a href="/contact">Submit a fundraiser request</a>
          </Button>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Contribute to {selected?.name}</DialogTitle>
            <DialogDescription>{selected?.need}</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="d-amount">Amount (₹)</Label>
              <Input
                id="d-amount"
                type="number"
                min={100}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {[500, 1000, 2500, 5000].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(String(p))}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs hover:border-accent hover:text-accent"
                  >
                    ₹{inr(p)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="d-name">Your name</Label>
              <Input id="d-name" value={donor.name} onChange={(e) => setDonor({ ...donor, name: e.target.value })} maxLength={100} required />
            </div>
            <div>
              <Label htmlFor="d-email">Email</Label>
              <Input id="d-email" type="email" value={donor.email} onChange={(e) => setDonor({ ...donor, email: e.target.value })} maxLength={255} required />
            </div>
            <Button type="submit" variant="hero" className="w-full" size="lg">
              <Heart className="h-4 w-4" /> Confirm contribution
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Demo: progress updates locally. Live payments coming soon.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Fundraisers;
