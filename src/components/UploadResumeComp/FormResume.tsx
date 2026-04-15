import { BrainCircuit, Lock } from "lucide-react";
import type { SubmitEvent } from "react";

interface FormResumeProps {
  isProcessing: boolean;
  statusText: string;
  handleUploadResume: (e: SubmitEvent<HTMLFormElement>) => void;
}
export default function FormResume({
  isProcessing,
  statusText,
  handleUploadResume,
}: FormResumeProps) {
  return (
    <aside className="col-span-1 flex flex-col gap-3">
      <h2 className="md:text-5xl text-3xl">
        Analyze <span className="text-[#A3A6FF]">Your</span> Resume.
      </h2>
      <p className="text-gray-400 md:text-base text-sm">
        Our Cognitive Architect engine maps your expertise against
        market-specific roles with editorial precision.
      </p>
      {isProcessing ? (
        <div className="flex xl:flex-col justify-center items-center flex-1">
          <p className="text-xl truncate max-w-1/2">{statusText}</p>
          <img
            src="/resume-scan.gif"
            alt="resumeGif"
            className="xl:max-w-40 max-w-25 w-full"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <form
          className="rounded-xl px-5 py-6 md:space-y-8 space-y-5 bg-[#192540]"
          onSubmit={handleUploadResume}
        >
          <h3 className="flex items-center gap-2 font-medium text-xl">
            <Lock className="text-[#C180FF] size-6" />
            Job Content
          </h3>
          <fieldset className="flex flex-col gap-1">
            <label
              className="uppercase font-semibold text-[#A3AAC4] text-sm"
              htmlFor="company-name"
            >
              Company Name
            </label>
            <input
              required
              type="text"
              id="company-name"
              name="company-name"
              placeholder="e.g. Google"
              className="bg-[#6D758C]/20 p-3 rounded-lg outline-none focus:ring-2 focus:ring-white/30 md:text-base text-sm"
            />
          </fieldset>
          <fieldset className="flex flex-col gap-1">
            <label
              htmlFor="job-title"
              className="uppercase font-semibold text-[#A3AAC4] text-sm"
            >
              Job Title
            </label>
            <input
              required
              type="text"
              id="job-title"
              name="job-title"
              placeholder="e.g. Software Engineer"
              className="bg-[#6D758C]/20 p-3 rounded-lg outline-none focus:ring-2 focus:ring-white/30 md:text-base text-sm"
            />
          </fieldset>
          <fieldset className="flex flex-col gap-1">
            <label
              htmlFor="job-desc"
              className="uppercase font-semibold text-[#A3AAC4] text-sm"
            >
              Job Description
            </label>
            <textarea
              required
              name="job-desc"
              id="job-desc"
              rows={5}
              placeholder="Paste the requirements here ..."
              className="bg-[#6D758C]/20 p-3 rounded-lg outline-none focus:ring-2 focus:ring-white/30 text-sm md:text-base"
            />
          </fieldset>
          <button
            type="submit"
            className="bg-[#A3A6FF] rounded-lg font-semibold text-[#0F00A4] px-5 py-3 items-center justify-center gap-3 flex cursor-pointer w-full transition-all duration-300 ease-in-out hover:scale-105 active:scale-100"
          >
            <BrainCircuit strokeWidth={3} />
            Analyze Resume
          </button>
        </form>
      )}
    </aside>
  );
}
