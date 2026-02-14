import About from "./_components/sections/about";
import Contact from "./_components/sections/contact";
import Hero from "./_components/sections/hero";
import Projects from "./_components/sections/projects";
import Stack from "./_components/sections/stack";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-6">
        <About />
        <Stack />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
