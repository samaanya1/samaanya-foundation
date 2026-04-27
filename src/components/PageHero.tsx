import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export const PageHero = ({ eyebrow, title, description, children }: PageHeroProps) => {
  return (
    <section className="gradient-sage border-b border-border/60">
      <div className="container-narrow py-20 text-center md:py-28">
        {eyebrow && (
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl text-balance text-foreground md:text-6xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};
