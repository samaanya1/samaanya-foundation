import { PageHero } from "@/components/PageHero";
import { useQuery } from "@tanstack/react-query";
import { Heart, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Story = {
  id: string;
  name: string;
  location: string | null;
  story: string;
  image_url: string | null;
  video_url: string | null;
};

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

const Stories = () => {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Story[];
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Real families. Real journeys."
        description="Voices from the community — parents, CI recipients, and caregivers sharing their truth."
      />

      <section className="mx-auto max-w-5xl px-6 py-20">
        {isLoading && (
          <div className="flex flex-col items-center gap-4 py-24 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p>Loading stories…</p>
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            Could not load stories right now. Please check back soon.
          </div>
        )}

        {!isLoading && !isError && data.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <Heart className="h-10 w-10 text-accent" />
            <p className="font-serif text-2xl">Stories coming soon.</p>
            <p className="text-muted-foreground">
              We're collecting voices from the community. Watch this space.
            </p>
          </div>
        )}

        {!isLoading && !isError && data.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {data.map((s) => (
              <div
                key={s.id}
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
                {s.video_url && (() => {
                  const embedUrl = getYouTubeEmbedUrl(s.video_url!);
                  return embedUrl ? (
                    <div className="mt-5 overflow-hidden rounded-xl">
                      <iframe
                        src={embedUrl}
                        className="h-48 w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <a
                      href={s.video_url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-accent underline underline-offset-2"
                    >
                      Watch video →
                    </a>
                  );
                })()}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Stories;
