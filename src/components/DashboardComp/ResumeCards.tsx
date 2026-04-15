import { Link } from "react-router-dom";
import { resumes } from "../../constants";
import ResumeCard from "./ResumeCard";
import { Plus } from "lucide-react";

export default function ResumeCards() {
  return (
    <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-15 gap-10">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
      <Link
        to={`/upload-resume`}
        className="col-span-1 font-medium p-10 bg-[#192540] rounded-2xl hover:scale-105 transition-all duration-500 ease-in-out active:scale-100 border-dotted flex flex-col justify-center items-center gap-3"
      >
        <div className="size-15 rounded-full bg-[#A3A6FF]/20 text-[#A3A6FF] flex justify-center items-center">
          <Plus className="size-8" strokeWidth={3} />
        </div>
        <h3 className="text-xl">New Target Role</h3>
        <p className="text-gray-400 text-center text-sm">
          Define a new career path to begin analysis
        </p>
      </Link>
    </div>
  );
}
