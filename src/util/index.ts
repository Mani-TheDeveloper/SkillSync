import { AlertTriangle, CircleCheck, CircleX } from "lucide-react";
import type { Feedback } from "../types";

export const generateUUID = () => crypto.randomUUID();

export const numberToColorContent = (
  score?: number,
  type?: "good" | "improve",
) => {
  if ((score && score >= 70) || (type && type === "good"))
    return {
      darkColor: "text-[#22C55E]", // green-500
      lightColor: "bg-[#22C55E]/20",
      lightBg: "bg-[#A8F2CA]/10",
      icon: CircleCheck,
      content: "Strong",
    };

  if ((score && score >= 40) || (type && type === "improve"))
    return {
      darkColor: "text-[#F59E0B]", // amber-500
      lightColor: "bg-[#F59E0B]/20",
      icon: AlertTriangle,
      content: "Good Effort",
    };

  return {
    darkColor: "text-[#EF4444]", // red-500
    lightColor: "bg-[#EF4444]/20",
    icon: CircleX,
    content: "Needs Work",
  };
};

export const factorMapping: {
  [key: string]: keyof Omit<Feedback, "overallScore" | "ATS">;
} = {
  "Tone & Style": "toneAndStyle",
  Content: "content",
  Structure: "structure",
  Skills: "skills",
};
