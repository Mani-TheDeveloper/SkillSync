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
  const [allResumes, setAllResumes] = useState<ResumeState[]>([]);
  const { kv } = usePuter();

  const handleSearchResumes = (query: string) => {
    if (!query.trim()) {
      setResumes(allResumes);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filtered = allResumes.filter((resume) => {
      return (
        resume.companyName.toLowerCase().includes(lowerQuery) ||
        resume.jobTitle.toLowerCase().includes(lowerQuery)
      );
    });

    setResumes(filtered);
  };

  useEffect(() => {
    const loadResumes = async () => {
      const resumesList = (await kv.list("resume:*")) as KVItem[];

      const parseResumes = resumesList.map(
        (item) => JSON.parse(item.value) as ResumeState,
      );

      setAllResumes(parseResumes);
      setResumes(parseResumes);
    };
    loadResumes();
  }, [kv]);
  return (
    <>
      <section className="p-5 space-y-5">
        <Filter handleSearchResumes={handleSearchResumes} />
        <ResumeCards resumes={resumes} />
      </section>
    </>
  );
}
