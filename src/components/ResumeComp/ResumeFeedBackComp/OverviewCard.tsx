import type { Feedback } from "../../../types";
import { factorMapping, numberToColorContent } from "../../../util";

export default function OverviewCard({ feedback }: { feedback: Feedback }) {
  return (
    <div className="p-5 bg-[#192540] rounded-2xl space-y-5">
      <div className="flex md:flex-row flex-col-reverse items-center gap-5">
        <div
          className="relative flex items-center justify-center rounded-full size-20"
          style={{
            background: `conic-gradient(
                        #C180FF 0%,
                        #9F6BFF ${feedback.overallScore * 0.5}%,
                        #7B5CFF ${feedback.overallScore}%,
                        #e5e7eb ${feedback.overallScore}%,
                        #e5e7eb 100%
                      )`,
          }}
        >
          <div className="flex flex-col items-center justify-center size-5/6 bg-[#192540] rounded-full">
            <p className="text-2xl font-bold">{feedback.overallScore}</p>
            <p className="text-gray-400 text-xs">/ 100</p>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="sm:text-xl text-lg font-medium">Your Resume Score</h3>
          <p className="text-[#A3AAC4] sm:text-base text-sm">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>
      {Object.entries(factorMapping).map(([factorName, key], idx) => {
        const { darkColor, lightColor, content } = numberToColorContent(
          feedback[key].score,
        );
        return (
          <div
            key={idx}
            className="flex flex-wrap gap-1 justify-between sm:items-center p-3 bg-[#0F1930] rounded-xl font-medium"
          >
            <div className="flex items-center sm:justify-center gap-3">
              <p className="md:text-xl">{factorName}</p>
              <p
                className={`${lightColor} ${darkColor} px-2 py-1 rounded-md md:text-sm text-xs`}
              >
                {content}
              </p>
            </div>
            <p className="md:text-lg text-sm">
              <span className={darkColor}>{feedback[key].score}</span> / 100
            </p>
          </div>
        );
      })}
    </div>
  );
}
