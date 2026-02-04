import { ProjectCard } from "./subcomponents/ProjectCard";

export const Projects = ({ title }: { title: string }) => {
  return (
    <section className="px-16 ">
      <h2 className="text-5xl font-bold text-primary">{title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro error in
        ipsam quibusdam repellendus quos necessitatibus illo laboriosam ut.
        Quos.
      </p>
      <div className="flex gap-5">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </section>
  );
};
