import { useEffect, useState } from "react";
import { Filter, ResumeCards } from "../components/DashboardComp";
import { usePuter } from "../context/usePuter";
import type { ResumeState } from "../types";

interface KVItem {
  key: string;
  value: string;
}

export default function Dashboard() {
  const [resumes, setResumes] = useState<ResumeState[]>([]);
  const { kv } = usePuter();

  useEffect(() => {
    const loadResumes = async () => {
      const resumesList = (await kv.list("resume:*")) as KVItem[];
      const parseResumes = resumesList.map((item) => {
        const resume = JSON.parse(item.value) as ResumeState;
        return {
          ...resume,
          feedback: JSON.parse(JSON.stringify(resume.feedback)),
        };
      });
      setResumes(parseResumes);
    };
    loadResumes();
  }, [kv]);
  return (
    <>
      <section className="p-5 space-y-5">
        <Filter />
        <ResumeCards resumes={resumes} />
      </section>
    </>
  );
}
