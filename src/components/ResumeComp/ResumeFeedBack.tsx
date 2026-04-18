import { ATSCard, DetailedAnalysis, OverviewCard } from "./ResumeFeedBackComp";

export interface ResumeFeedBack {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
    }[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
}

export default function ResumeFeedBack({
  feedback,
}: {
  feedback: ResumeFeedBack;
}) {
  return (
    <aside className="col-span-1 space-y-5 h-full overflow-auto">
      <OverviewCard feedback={feedback} />
      <ATSCard ATSProps={feedback.ATS} />
      <DetailedAnalysis feedback={feedback} />
    </aside>
  );
}
