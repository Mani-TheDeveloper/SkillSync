import { Link } from "react-router-dom";
import type { Resume } from "../types";

export default function ResumeCard({
  resume: {
    feedback: { overallScore },
    companyName,
    jobTitle,
  },
}: {
  resume: Resume;
}) {
  return (
    <Link
      to={``}
      className="col-span-1 font-medium p-5 bg-[#192540] rounded-2xl space-y-2 hover:scale-105 transition-all duration-500 ease-in-out active:scale-100"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="sm:text-3xl text-xl">{companyName}</h3>
          <p className="sm:text-sm text-xs text-gray-400">{jobTitle}</p>
        </div>
        <div
          className="relative flex items-center justify-center rounded-full w-16 h-16"
          style={{
            background: `conic-gradient(
                        #C180FF 0%,
                        #9F6BFF ${overallScore * 0.5}%,
                        #7B5CFF ${overallScore}%,
                        #e5e7eb ${overallScore}%,
                        #e5e7eb 100%
                      )`,
          }}
        >
          <div className="flex items-center justify-center w-4/5 h-4/5 bg-[#192540] rounded-full">
            <p className="font-medium text-xs">{overallScore}/100</p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden h-[40vh] border-4 sm:border-8 border-[#0F1930] rounded-xl">
        <img
          src="https://marketplace.canva.com/EAFJ2vcWX2c/1/0/1131w/canva-minimalist-white-and-grey-professional-resume-osicIupI94A.jpg"
          alt={`${companyName}-${jobTitle}`}
          loading="lazy"
        />
      </div>
    </Link>
  );
}
