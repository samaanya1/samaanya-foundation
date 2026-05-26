import { Link } from "react-router-dom";
import { Mail, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-serif text-2xl text-primary">Samaanya Foundation</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            A trusted starting point for families and individuals navigating hearing
            disability — offering clarity, support, and a sense of community.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="mailto:info@samaanyafoundation.com" className="rounded-full border border-border p-2.5 text-foreground/70 transition-smooth hover:border-accent hover:text-accent" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/samaanya_foundation?igsh=dGs1dmV6dmF1cHBh" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border p-2.5 text-foreground/70 transition-smooth hover:border-accent hover:text-accent" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full border border-border p-2.5 text-foreground/70 transition-smooth hover:border-accent hover:text-accent" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-base text-foreground">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/programs" className="hover:text-accent">Programs & workshops</Link></li>
            <li><Link to="/fundraisers" className="hover:text-accent">Fundraisers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base text-foreground">Get involved</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/donate" className="hover:text-accent">Donate</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Volunteer</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Get help</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Samaanya Foundation. Access, information, dignity.</p>
          <p>Made with care in India.</p>
        </div>
      </div>
    </footer>
  );
};
