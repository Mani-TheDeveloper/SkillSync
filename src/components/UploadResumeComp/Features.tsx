import { ShieldCheck, Zap } from "lucide-react";

export default function Features() {
  return (
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
  );
}
