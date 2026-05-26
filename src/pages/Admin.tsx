import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, LogOut, Loader2 } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

// ─── Types ────────────────────────────────────────────────────────────────────

type Fundraiser = {
  id: string; slug: string; name: string; age: number; city: string;
  need: string; story: string; goal: number; raised: number; donors: number;
  image_url: string | null; video_url: string | null;
};

type Webinar = {
  id: string; title: string; speaker: string | null; date: string | null;
  description: string | null; link: string | null; image_url: string | null;
};

type Story = {
  id: string; name: string; location: string | null;
  story: string; image_url: string | null; video_url: string | null;
};

// ─── Login ────────────────────────────────────────────────────────────────────

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error(error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-soft">
        <h1 className="font-serif text-3xl">Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Samaanya Foundation</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

// ─── Fundraisers ──────────────────────────────────────────────────────────────

const emptyF = { name: "", age: "", city: "", need: "", story: "", goal: "", slug: "", image_url: "", video_url: "" };

const FundraisersSection = () => {
  const qc = useQueryClient();
  const [dialog, setDialog] = useState<{ open: boolean; item: Fundraiser | null }>({ open: false, item: null });
  const [form, setForm] = useState(emptyF);
  const [saving, setSaving] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-fundraisers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("fundraisers").select("*").order("created_at");
      if (error) throw error;
      return data as Fundraiser[];
    },
  });

  const openAdd = () => { setForm(emptyF); setDialog({ open: true, item: null }); };
  const openEdit = (item: Fundraiser) => {
    setForm({
      name: item.name, age: String(item.age), city: item.city,
      need: item.need, story: item.story, goal: String(item.goal),
      slug: item.slug, image_url: item.image_url ?? "", video_url: item.video_url ?? "",
    });
    setDialog({ open: true, item });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name, age: Number(form.age), city: form.city, need: form.need,
      story: form.story, goal: Number(form.goal),
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      image_url: form.image_url || null,
      video_url: form.video_url || null,
    };
    const { error } = dialog.item
      ? await supabase.from("fundraisers").update(payload).eq("id", dialog.item.id)
      : await supabase.from("fundraisers").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(dialog.item ? "Updated!" : "Added!");
    qc.invalidateQueries({ queryKey: ["admin-fundraisers"] });
    qc.invalidateQueries({ queryKey: ["fundraisers"] });
    setDialog({ open: false, item: null });
  };

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    const { error } = await supabase.from("fundraisers").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted.");
    qc.invalidateQueries({ queryKey: ["admin-fundraisers"] });
    qc.invalidateQueries({ queryKey: ["fundraisers"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl">Fundraisers</h2>
        <Button size="sm" onClick={openAdd}><Plus className="mr-1 h-4 w-4" /> Add</Button>
      </div>

      {isLoading && <p className="mt-4 text-muted-foreground">Loading…</p>}

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.city} · ₹{item.raised.toLocaleString("en-IN")} raised of ₹{item.goal.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => remove(item.id, item.name)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialog.open} onOpenChange={(o) => !o && setDialog({ open: false, item: null })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {dialog.item ? "Edit Fundraiser" : "Add Fundraiser"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><Label>Age</Label>
                <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required /></div>
            </div>
            <div><Label>City</Label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City, State" required /></div>
            <div><Label>Need (short summary)</Label>
              <Input value={form.need} onChange={(e) => setForm({ ...form, need: e.target.value })} required /></div>
            <div><Label>Story</Label>
              <Textarea rows={4} value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} required /></div>
            <div><Label>Goal (₹)</Label>
              <Input type="number" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} required /></div>
            <div><Label>Photo URL (optional)</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
            <div><Label>Video URL (optional — YouTube)</Label>
              <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." /></div>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : dialog.item ? "Save changes" : "Add fundraiser"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ─── Webinars ─────────────────────────────────────────────────────────────────

const emptyW = { title: "", speaker: "", date: "", description: "", link: "", image_url: "" };

const WebinarsSection = () => {
  const qc = useQueryClient();
  const [dialog, setDialog] = useState<{ open: boolean; item: Webinar | null }>({ open: false, item: null });
  const [form, setForm] = useState(emptyW);
  const [saving, setSaving] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-webinars"],
    queryFn: async () => {
      const { data, error } = await supabase.from("webinars").select("*").order("date", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return data as Webinar[];
    },
  });

  const openAdd = () => { setForm(emptyW); setDialog({ open: true, item: null }); };
  const openEdit = (item: Webinar) => {
    setForm({
      title: item.title, speaker: item.speaker ?? "", date: item.date ?? "",
      description: item.description ?? "", link: item.link ?? "", image_url: item.image_url ?? "",
    });
    setDialog({ open: true, item });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title, speaker: form.speaker || null, date: form.date || null,
      description: form.description || null, link: form.link || null, image_url: form.image_url || null,
    };
    const { error } = dialog.item
      ? await supabase.from("webinars").update(payload).eq("id", dialog.item.id)
      : await supabase.from("webinars").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(dialog.item ? "Updated!" : "Added!");
    qc.invalidateQueries({ queryKey: ["admin-webinars"] });
    qc.invalidateQueries({ queryKey: ["webinars"] });
    setDialog({ open: false, item: null });
  };

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const { error } = await supabase.from("webinars").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted.");
    qc.invalidateQueries({ queryKey: ["admin-webinars"] });
    qc.invalidateQueries({ queryKey: ["webinars"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl">Webinars</h2>
        <Button size="sm" onClick={openAdd}><Plus className="mr-1 h-4 w-4" /> Add</Button>
      </div>

      {isLoading && <p className="mt-4 text-muted-foreground">Loading…</p>}

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.speaker ? `With ${item.speaker} · ` : ""}{item.date ?? "No date set"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => remove(item.id, item.title)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialog.open} onOpenChange={(o) => !o && setDialog({ open: false, item: null })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {dialog.item ? "Edit Webinar" : "Add Webinar"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div><Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div><Label>Speaker (optional)</Label>
              <Input value={form.speaker} onChange={(e) => setForm({ ...form, speaker: e.target.value })} /></div>
            <div><Label>Date (optional)</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <div><Label>Description (optional)</Label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Registration Link (optional)</Label>
              <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." /></div>
            <div><Label>Banner Image URL (optional)</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : dialog.item ? "Save changes" : "Add webinar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ─── Stories ──────────────────────────────────────────────────────────────────

const emptyS = { name: "", location: "", story: "", image_url: "", video_url: "" };

const StoriesSection = () => {
  const qc = useQueryClient();
  const [dialog, setDialog] = useState<{ open: boolean; item: Story | null }>({ open: false, item: null });
  const [form, setForm] = useState(emptyS);
  const [saving, setSaving] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-stories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stories").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Story[];
    },
  });

  const openAdd = () => { setForm(emptyS); setDialog({ open: true, item: null }); };
  const openEdit = (item: Story) => {
    setForm({
      name: item.name, location: item.location ?? "", story: item.story,
      image_url: item.image_url ?? "", video_url: item.video_url ?? "",
    });
    setDialog({ open: true, item });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name, location: form.location || null, story: form.story,
      image_url: form.image_url || null, video_url: form.video_url || null,
    };
    const { error } = dialog.item
      ? await supabase.from("stories").update(payload).eq("id", dialog.item.id)
      : await supabase.from("stories").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(dialog.item ? "Updated!" : "Added!");
    qc.invalidateQueries({ queryKey: ["admin-stories"] });
    qc.invalidateQueries({ queryKey: ["stories"] });
    setDialog({ open: false, item: null });
  };

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted.");
    qc.invalidateQueries({ queryKey: ["admin-stories"] });
    qc.invalidateQueries({ queryKey: ["stories"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl">Stories</h2>
        <Button size="sm" onClick={openAdd}><Plus className="mr-1 h-4 w-4" /> Add</Button>
      </div>

      {isLoading && <p className="mt-4 text-muted-foreground">Loading…</p>}

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.location ?? "No location"}</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => remove(item.id, item.name)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialog.open} onOpenChange={(o) => !o && setDialog({ open: false, item: null })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {dialog.item ? "Edit Story" : "Add Story"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div><Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div><Label>Location (optional)</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, State" /></div>
            <div><Label>Story</Label>
              <Textarea rows={5} value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} required /></div>
            <div><Label>Photo URL (optional)</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
            <div><Label>Video URL (optional — YouTube)</Label>
              <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." /></div>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : dialog.item ? "Save changes" : "Add story"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out.");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!session) return <LoginScreen />;

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="font-serif text-2xl">Admin Panel</h1>
          <p className="text-xs text-muted-foreground">{session.user.email}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="mr-1 h-4 w-4" /> Sign out
        </Button>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <Tabs defaultValue="fundraisers">
          <TabsList className="mb-8">
            <TabsTrigger value="fundraisers">Fundraisers</TabsTrigger>
            <TabsTrigger value="webinars">Webinars</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
          </TabsList>
          <TabsContent value="fundraisers"><FundraisersSection /></TabsContent>
          <TabsContent value="webinars"><WebinarsSection /></TabsContent>
          <TabsContent value="stories"><StoriesSection /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
