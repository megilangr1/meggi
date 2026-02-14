import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const projects = [
  {
    title: "Enterprise Dashboard",
    description: "Scalable admin system with role-based access control.",
    stack: ["Next.js", "Laravel", "PostgreSQL"],
  },
  {
    title: "Geo Mapping System",
    description: "Interactive map visualization with real-time data.",
    stack: ["Leaflet", "NestJS", "Redis"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-t">
      <h2 className="text-3xl font-semibold mb-12">Selected Projects</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.title} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
