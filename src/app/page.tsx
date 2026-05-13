import { ProjectIntro } from "@/components/project-intro";
import { ComparativeTimelineDemo } from "@/components/comparative-timeline-demo";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <ProjectIntro />

      <div className="mt-8">
        <ComparativeTimelineDemo />
      </div>
    </main>
  );
}
