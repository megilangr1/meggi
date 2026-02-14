import { Badge } from "@/components/ui/badge";

const stacks = [
  "Next.js",
  "Laravel",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Docker",
];

export default function Stack() {
  return (
    <section id="stack" className="py-24 border-t">
      <h2 className="text-3xl font-semibold mb-8">Tech Stack</h2>

      <div className="flex flex-wrap gap-3">
        {stacks.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>
    </section>
  );
}
