import { useState } from "react";
import type { ResumeFeedBack } from "../ResumeFeedBack";
import { factorMapping, numberToColorContent } from "../../../util";
import { ChevronDown } from "lucide-react";

export default function DetailedAnalysis({
  feedback,
}: {
  feedback: ResumeFeedBack;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const factors = Object.entries(factorMapping).map(([factorName, key]) => ({
    title: factorName,
    data: feedback[key],
  }));

  return (
    <div className="space-y-5 bg-[#192540] rounded-xl p-5">
      <h3 className="relative flex text-lg sm:text-xl w-fit font-medium">
        Deep Analysis Breakdown
        <span className="absolute h-1 w-1/2 -bottom-2 bg-linear-to-r from-[#A3A6FF] to-[#A3A6FF]/0 rounded-full" />
      </h3>

      {factors.map(({ data: { score, tips }, title }, idx) => {
        const isOpen = openIndex === idx;

        const {
          icon: Icon,
          darkColor,
          lightColor,
        } = numberToColorContent(score);

        return (
          <div
            key={idx}
            className="bg-[#0F1930] p-3 rounded-xl overflow-hidden"
          >
            <div
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="relative flex items-center justify-between cursor-pointer z-10"
            >
              <div className="flex items-center gap-3">
                <p className="sm:text-xl font-medium">{title}</p>
                <div
                  className={`flex items-center gap-1 ${lightColor} ${darkColor} rounded-md px-1 py-0.5 text-xs sm:text-base`}
                >
                  <Icon className={`sm:size-4 size-3 ${darkColor}`} />
                  <p>{score}/100</p>
                </div>
              </div>

              <ChevronDown
                className={`transition-transform duration-300 size-5 sm:size-7 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            <span className="block h-1 w-1/2 mt-2 bg-linear-to-r from-[#A3A6FF] to-transparent rounded-full" />

            <div
              className={`overflow-auto transition-all duration-1000 mt-3 ${
                isOpen ? "h-135" : "h-0"
              }`}
            >
              <div className="space-y-3">
                {tips.map(({ explanation, tip, type }, i) => {
                  const { icon: Icon, darkColor } = numberToColorContent(
                    undefined,
                    type,
                  );

                  return (
                    <div key={i} className="p-3 rounded-xl flex flex-col gap-2">
                      <div
                        className={`flex items-center gap-2 ${darkColor} font-medium`}
                      >
                        <Icon className="sm:size-5 size-7"/>
                        <p>{tip}</p>
                      </div>
                      <p className="text-justify sm:text-base text-sm">{explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
