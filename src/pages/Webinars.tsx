import { PageHero } from "@/components/PageHero";
import { useSheetData } from "@/hooks/useSheetData";
import { CalendarDays, ExternalLink, Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6vnIK0Nzot0ILh7UZh8sm_fMuAK4iSO79OrXHRtWJ9XTBM_Vakt7SmrVflUVe6GNssj5LTqgka7sG/pub?gid=1721182696&single=true&output=csv";

const Webinars = () => {
  const { data, loading, error } = useSheetData(SHEET_URL);

  return (
    <>
      <PageHero
        eyebrow="Webinars"
        title="Learn. Connect. Grow."
        description="Free sessions for families, caregivers, and anyone curious about hearing disability."
      />

      <section className="mx-auto max-w-5xl px-6 py-20">
        {loading && (
          <div className="flex flex-col items-center gap-4 py-24 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p>Loading webinars…</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            Could not load webinars right now. Please check back soon.
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <Mic className="h-10 w-10 text-accent" />
            <p className="font-serif text-2xl">No webinars scheduled yet.</p>
            <p className="text-muted-foreground">Check back soon — we're planning something great.</p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {data.map((w, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                {w.speaker && (
                  <p className="text-xs font-medium uppercase tracking-widest text-accent">
                    With {w.speaker}
                  </p>
                )}
                <h3 className="mt-2 font-serif text-2xl">{w.title}</h3>
                {w.date && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    {new Date(w.date).toLocaleDateString("en-IN", { dateStyle: "long" })}
                  </div>
                )}
                {w.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {w.description}
                  </p>
                )}
                {w.link && (
                  <Button asChild variant="soft" size="sm" className="mt-5">
                    <a href={w.link} target="_blank" rel="noopener noreferrer">
                      Register <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Webinars;
