import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t">
      <div className="max-w-2xl space-y-6">
        <h2 className="text-3xl font-semibold">Let&apos;s Build Something</h2>
        <p className="text-muted-foreground">
          Open to collaboration and interesting projects.
        </p>
        <Button size="lg">Contact Me</Button>
      </div>
    </section>
  );
}
