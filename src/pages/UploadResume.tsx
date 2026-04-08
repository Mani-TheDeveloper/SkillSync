import { ArrowRight, Lock, ShieldCheck, UploadCloud, Zap } from "lucide-react";

export default function UploadResume() {
  return (
    <>
      <section className="grid xl:grid-cols-3 gap-10 px-5 py-10">
        <aside className="col-span-1">
          <h2 className="md:text-5xl text-3xl mb-2">
            Analyze <span className="text-[#A3A6FF]">Your</span> Resume.
          </h2>
          <p className="text-gray-400 md:text-base text-sm">
            Our Cognitive Architect engine maps your expertise against
            market-specific roles with editorial precision.
          </p>
          <form
            className="rounded-xl mt-10 px-5 py-6 md:space-y-8 space-y-5 bg-[#192540]"
            onSubmit={(e) => {
              e.preventDefault();
            }}
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
                type="text"
                id="company-name"
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
                type="text"
                id="job-title"
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
                placeholder="Paste the requirements here ..."
                className="bg-[#6D758C]/20 p-3 rounded-lg outline-none focus:ring-2 focus:ring-white/30 text-sm md:text-base"
              />
            </fieldset>
          </form>
        </aside>
        <aside className="xl:col-span-2 bg-[#091328] md:p-5 p-2 rounded-2xl">
          <div
            className="bg-[#192540] h-full rounded-2xl flex flex-col justify-center items-center gap-5
          py-10 px-2"
          >
            <div className="bg-[#A3A6FF]/20 text-[#A3A6FF] p-5 rounded-full flex justify-center items-center">
              <UploadCloud className="size-10" />
            </div>
            <h3 className="xl:text-3xl text-xl">Upload Your Resume</h3>
            <p className="md:w-3/5 md:text-base text-sm text-center text-gray-400">
              Drag and drop your PDF or DOCX file here to start the cognitive
              alignment process.
            </p>
            <button className="flex justify-center items-center gap-2 md:px-10 md:py-4 px-5 py-2 bg-linear-to-r from-[#A3A6FF] to-[#6063EE] rounded-full text-[#0F00A4] font-semibold md:text-lg">
              Select File <ArrowRight className="md:size-7" strokeWidth={2.5} />
            </button>
            <div className="flex justify-evenly gap-7">
              <div className="text-center">
                <p className="uppercase text-sm text-gray-400">Max size</p>
                <p className="font-medium md:text-lg">12MB</p>
              </div>
              <div className="h-full w-0.5 bg-gray-600" />
              <div className="uppercase text-center">
                <p className="text-gray-400 text-sm">format</p>
                <p className="font-medium md:text-lg">pdf, docx</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
      <section className="flex flex-wrap justify-around items-center gap-5 md:px-0 pl-5 pb-10">
        <div className="flex items-center gap-3 md:w-fit w-full">
          <div className="bg-[#C180FF]/10 text-[#C180FF] p-3 rounded-full">
            <ShieldCheck />
          </div>
          <div>
            <h3 className="font-medium">Privacy Secured</h3>
            <p className="text-sm text-gray-400">
              End-to-end encrypted processing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 md:w-fit w-full">
          <div className="bg-[#A3A6FF]/10 text-[#A3A6FF] p-3 rounded-full">
            <Zap fill="#A3A6FF" />
          </div>
          <div>
            <h3 className="font-medium">Instant Analysis</h3>
            <p className="text-sm text-gray-400">Results in under 15 seconds</p>
          </div>
        </div>
      </section>
    </>
  );
}
