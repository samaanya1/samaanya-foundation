import { PageHero } from "@/components/PageHero";
import { useSheetData } from "@/hooks/useSheetData";
import { Heart, MapPin, Loader2 } from "lucide-react";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6vnIK0Nzot0ILh7UZh8sm_fMuAK4iSO79OrXHRtWJ9XTBM_Vakt7SmrVflUVe6GNssj5LTqgka7sG/pub?gid=0&single=true&output=csv";

const Stories = () => {
  const { data, loading, error } = useSheetData(SHEET_URL);

  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Real families. Real journeys."
        description="Voices from the community — parents, CI recipients, and caregivers sharing their truth."
      />

      <section className="mx-auto max-w-5xl px-6 py-20">
        {loading && (
          <div className="flex flex-col items-center gap-4 py-24 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p>Loading stories…</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            Could not load stories right now. Please check back soon.
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <Heart className="h-10 w-10 text-accent" />
            <p className="font-serif text-2xl">Stories coming soon.</p>
            <p className="text-muted-foreground">We're collecting voices from the community. Watch this space.</p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {data.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-8 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="flex items-center gap-4">
                  {s.image_url ? (
                    <img
                      src={s.image_url}
                      alt={s.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-soft font-serif text-2xl text-primary">
                      {s.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-serif text-xl">{s.name}</p>
                    {s.location && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {s.location}
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-muted-foreground">{s.story}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Stories;
