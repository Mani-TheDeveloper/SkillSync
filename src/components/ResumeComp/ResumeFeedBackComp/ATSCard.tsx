import { numberToColorContent } from "../../../util";
import type { ResumeFeedBack } from "../ResumeFeedBack";

export default function ATSCard({
  ATSProps,
}: {
  ATSProps: ResumeFeedBack["ATS"];
}) {
  const {
    darkColor,
    lightColor,
    icon: Icon,
  } = numberToColorContent(ATSProps.score);

  return (
    <div className="p-5 bg-[#192540] rounded-xl space-y-2">
      <div className="flex items-center gap-3 mb-5">
        <div className={`${darkColor} ${lightColor} w-fit p-2 rounded-lg`}>
          <Icon className="size-5" />
        </div>
        <p className="font-medium text-lg">
          ATS Score - <span className={darkColor}>{ATSProps.score}</span> / 100
        </p>
      </div>
      <p className="font-medium sm:text-lg">
        How well does your resume pass through Applicant Tracking Systems?
      </p>
      <p className="text-gray-400 text-sm sm:text-base">
        Your resume was scanned like an employer would. Here's how it performed:
      </p>
      {ATSProps.tips.map((tip, index) => {
        const { icon: Icon, darkColor } = numberToColorContent(
          undefined,
          tip.type,
        );
        return (
          <div key={index} className="flex gap-3 items-center">
            <Icon className={`sm:size-7 size-12 ${darkColor}`} />
            <p className="text-gray-300 text-sm sm:text-base text-justify">{tip.tip}</p>
          </div>
        );
      })}
      <p className="text-gray-400 text-sm sm:text-base">
        Want a better score? Improve your resume by applying the suggestions
        listed below.
      </p>
    </div>
  );
}
