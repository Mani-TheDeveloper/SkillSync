import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePuter } from "../context/usePuter";
import { ResumeFeedBack, ResumeImage } from "../components/ResumeComp";
import type { ResumeState } from "../types";

export default function Resume() {
  const { id } = useParams<{ id: string }>();
  const [resumeData, setResumeData] = useState<ResumeState | null>(null);

  const { kv, handleError } = usePuter();

  const fetchResumeData = useCallback(async () => {
    if (!id) {
      handleError("Resume ID is missing in the URL.");
      setResumeData(null);
      return;
    }

    const dataString = await kv.get(`resume:${id}`);

    if (!dataString) {
      handleError("Resume Data not found, please check the ID.");
      setResumeData(null);
      return;
    }

    try {
      const data: ResumeState = JSON.parse(dataString);
      setResumeData(data);
    } catch {
      handleError("Failed to parse resume data.");
      setResumeData(null);
    }
  }, [id, kv, handleError]);

  useEffect(() => {
    (async () => {
      await fetchResumeData();
    })();
  }, [fetchResumeData]);

  if (!resumeData) {
    return (
      <section className="h-screen w-screen flex justify-center items-center text-2xl font-medium animate-pulse">
        Loading Resume Data ...
      </section>
    );
  }

  return (
    <>
      <section className="text-center mb-5 p-5">
        <h2 className="text-2xl text-[#C180FF] font-semibold md:text-5xl sm:text-3xl">
          Resume Review
        </h2>
      </section>
      <section className="p-5 grid xl:grid-cols-2 gap-x-5 gap-y-10 xl:h-screen">
        <ResumeImage
          imagePath={resumeData.imagePath}
          resumePath={resumeData.resumePath}
        />
        <ResumeFeedBack feedback={resumeData.feedback} />
      </section>
    </>
  );
}
