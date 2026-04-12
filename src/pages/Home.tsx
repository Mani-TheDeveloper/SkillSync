import {
  BrainCircuit,
  BrushCleaning,
  Cable,
  ChartColumnIncreasing,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Link } from "react-router-dom";

const LAYER_PROPS = [
  {
    icon: Cable,
    title: "ATS Optimization",
    para: "Ensure your resume passes through any tracking system with specialized formatting checks.",
    color: "#C180FF",
  },
  {
    icon: BrainCircuit,
    title: "Expert Tips",
    para: "Dynamic coaching based on your specific industry and years of professional experience.",
    color: "#A3A6FF",
  },
  {
    icon: Sparkles,
    title: "Keyword Mapping",
    para: "Identify critical missing skills and terminology that recruiters are searching for.",
    color: "#B0AEFF",
  },
  {
    icon: BrushCleaning,
    title: "Visual Polish",
    para: "Automatic structural enhancements to make your resume visually striking and readable.",
    color: "#FFFFFF",
  },
];

export default function Home() {
  return (
    <>
      <section className="grid md:grid-cols-2 gap-2">
        <aside className="col-span-1 p-5 space-y-5">
          <span className="uppercase flex justify-center items-center gap-1 bg-[#6F00BE]/20 text-[#C180FF] font-semibold w-fit px-3 py-1 rounded-full border border-[#C180FF] text-xs">
            <Sparkles className="size-4" />
            Ai - powered analysis
          </span>
          <h2 className="xl:text-6xl text-4xl xl:leading-20 leading-11">
            Optimize Your Career with{" "}
            <span className="bg-linear-to-r bg-clip-text text-transparent from-[#A3A6FF] to-[#C180FF]">
              AI Precision
            </span>
          </h2>
          <p className="xl:text-lg sm:text-sm text-gray-400 text-justify">
            Instantly score your resume against real Applicant Tracking Systems.
            Unlock tailored feedback, keyword mapping, and expert insights
            designed to land your next interview.
          </p>
          <Link
            to="/upload-resume"
            className="flex text-[#0F00A4] items-center justify-center gap-3 px-5 py-3 bg-[#A3A6FF] rounded-lg font-semibold w-fit"
          >
            <UploadCloud strokeWidth={3} />
            Upload Resume
          </Link>
        </aside>
        <aside className="col-span-1 p-5">
          <div className="bg-[#192540] w-full h-full rounded-4xl md:p-10 p-5 space-y-10">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="xl:text-xl text-lg">ATS Compatibility</h3>
                <p className="text-gray-400 text-xs">
                  Real-time resume scoring engine
                </p>
              </div>
              <div className="bg-[#141F38] xl:p-4 p-2 rounded-xl border border-[#273044]">
                <ChartColumnIncreasing className="text-[#A3A6FF]" />
              </div>
            </div>
            <div className="mx-auto border-10 border-[#C180FF] rounded-full xl:size-50 size-44 flex justify-center items-center flex-col font-medium">
              <p className="xl:text-6xl text-5xl font-bold">88</p>
              <p className="text-gray-400">/ 100</p>
            </div>
            <div className="flex justify-between gap-5">
              <div className="flex-1 bg-[#141F38]/50 px-4 py-3 rounded-2xl space-y-1">
                <p className="uppercase text-sm text-gray-500">keyword match</p>
                <p>92%</p>
              </div>
              <div className="flex-1 bg-[#141F38]/50 px-4 py-3 rounded-2xl space-y-1">
                <p className="uppercase text-sm text-gray-500">formatting</p>
                <p>Passed</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
      <section className="p-5 space-y-10">
        <h3 className="relative text-2xl flex w-fit">
          Intelligence Layer
          <span className="absolute h-1 w-1/2 -bottom-2 bg-linear-to-r from-[#A3A6FF] to-[#A3A6FF]/0 rounded-full" />
        </h3>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
          {LAYER_PROPS.map(({ icon: Icon, para, title, color }) => (
            <div
              key={title}
              className="bg-[#192540] rounded-2xl space-y-3 md:p-8 p-5"
            >
              <div
                className="w-fit p-2 rounded-xl"
                style={{ backgroundColor: color + "20" }}
              >
                <Icon className="md:size-10" style={{ color: color }} />
              </div>
              <h3 className="text-lg">{title}</h3>
              <p className="text-gray-400 text-sm text-justify">{para}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="p-5 mt-10">
        <div className="bg-linear-to-r from-[#060E20] to-[#192540] rounded-3xl border-2 border-[#192540] xl:p-15 p-5">
          <div className="col-span-1 sm:p-5 py-3 space-y-8">
            <h3 className="xl:text-5xl text-4xl">
              Ready to Land Your{" "}
              <span className="text-[#C180FF]">Dream Role?</span>
            </h3>
            <p className="text-gray-500 text-justify">
              Start your journey with SkillSync today and join thousands of
              professionals who have transformed their careers with AI
              precision.
            </p>
            <Link
              to="upload-resume"
              className="bg-white text-[#060E20] px-5 py-3 rounded-xl font-medium hover:scale-110 active:scale-100"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
