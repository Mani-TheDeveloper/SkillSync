import type { Feedback } from "../../types";
import { ATSCard, DetailedAnalysis, OverviewCard } from "./ResumeFeedBackComp";

export default function ResumeFeedBack({ feedback }: { feedback: Feedback }) {
  return (
    <aside className="col-span-1 space-y-5 h-full overflow-auto">
      <OverviewCard feedback={feedback} />
      <ATSCard ATSProps={feedback.ATS} />
      <DetailedAnalysis feedback={feedback} />
    </aside>
  );
}
