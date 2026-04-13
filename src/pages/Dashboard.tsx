import { Plus, Search } from "lucide-react";
import { resumes } from "../constants";
import { Link } from "react-router-dom";
import { ResumeCard } from "../components";

export default function Dashboard() {
  return (
    <>
      <section className="p-5 space-y-5">
        <h2 className="md:text-5xl sm:text-3xl text-2xl max-w-3xl w-full md:leading-14 sm:leading-10 font-medium">
          Master Your Career Path with{" "}
          <span className="text-[#C180FF]">AI-Driven</span> Precision
        </h2>
        <form
          onSubmit={() => {}}
          className="relative max-w-lg w-full flex items-center"
        >
          <input
            type="text"
            placeholder="Search analysis history..."
            className="bg-[#192540] py-3 px-10 rounded-xl w-full outline-none focus:ring-2 focus:ring-white/30 md:text-base text-sm"
          />
          <Search className="absolute left-2 text-[#A3AAC4]" />
        </form>
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
      </section>
    </>
  );
}
