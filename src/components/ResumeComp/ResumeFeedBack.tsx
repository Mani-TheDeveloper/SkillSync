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

const feedback: ResumeFeedBack = {
  overallScore: 72,
  ATS: {
    score: 75,
    tips: [
      {
        type: "good",
        tip: "Clean formatting with clear section headers and consistent structure that ATS systems can easily parse",
      },
      {
        type: "good",
        tip: "Includes relevant keywords like JavaScript, Python, Node.js, React.js that match job requirements",
      },
      {
        type: "improve",
        tip: "Add more JPMorgan-specific keywords like 'financial services', 'banking applications', 'risk management'",
      },
      {
        type: "improve",
        tip: "Include missing technologies mentioned in job description like Java, Go, big data, cloud computing, DevOps",
      },
    ],
  },
  toneAndStyle: {
    score: 78,
    tips: [
      {
        type: "good",
        tip: "Professional and concise language",
        explanation:
          "The resume uses appropriate professional terminology and maintains a formal tone throughout, which is suitable for a financial services company like JPMorgan Chase.",
      },
      {
        type: "good",
        tip: "Action-oriented descriptions",
        explanation:
          "Good use of action verbs like 'Developed', 'Designed', 'Implemented', 'Collaborated' which demonstrate proactive involvement in projects.",
      },
      {
        type: "improve",
        tip: "Lacks financial industry context",
        explanation:
          "The resume doesn't demonstrate understanding of financial services or banking domain. For JPMorgan, showing awareness of financial technology, compliance, or risk management would be valuable.",
      },
      {
        type: "improve",
        tip: "Generic career objective",
        explanation:
          "The career objective is too generic and doesn't specifically mention interest in financial technology or JPMorgan's business areas like investment banking or asset management.",
      },
    ],
  },
  content: {
    score: 70,
    tips: [
      {
        type: "good",
        tip: "Strong academic performance",
        explanation:
          "Excellent CGPA of 9.18 and high percentages in previous education demonstrate strong academic foundation and learning ability, which JPMorgan values for entry-level positions.",
      },
      {
        type: "good",
        tip: "Relevant technical projects",
        explanation:
          "Projects like payment gateway integration and scalable web applications show practical experience with technologies relevant to financial services and large-scale systems.",
      },
      {
        type: "improve",
        tip: "Limited enterprise-scale experience",
        explanation:
          "While projects are good, they lack the scale and complexity that JPMorgan deals with. Need to emphasize experience with systems supporting millions of users or high-volume transactions.",
      },
      {
        type: "improve",
        tip: "Missing quantifiable business impact",
        explanation:
          "Projects lack specific metrics about performance improvements, user engagement, or business value delivered. JPMorgan values candidates who can demonstrate measurable impact.",
      },
    ],
  },
  structure: {
    score: 80,
    tips: [
      {
        type: "good",
        tip: "Logical section organization",
        explanation:
          "Resume follows a clear structure with education, internships, projects, achievements, and skills properly organized, making it easy for recruiters to find relevant information.",
      },
      {
        type: "good",
        tip: "Appropriate length and formatting",
        explanation:
          "Two-page length is appropriate for a student resume, and the formatting is clean with good use of bullet points and white space.",
      },
      {
        type: "improve",
        tip: "Projects section needs better prioritization",
        explanation:
          "Most relevant projects for JPMorgan (like payment gateway integration) should be listed first and given more detail, while less relevant projects should be condensed.",
      },
      {
        type: "improve",
        tip: "Inconsistent detail levels",
        explanation:
          "Some sections like achievements have good detail while others like the Solana project are too brief. Balance the detail level based on relevance to the target role.",
      },
    ],
  },
  skills: {
    score: 65,
    tips: [
      {
        type: "good",
        tip: "Covers multiple technology stacks",
        explanation:
          "Good coverage of frontend (React.js), backend (Node.js), and database technologies (PostgreSQL, MongoDB) which are relevant for full-stack development at JPMorgan.",
      },
      {
        type: "improve",
        tip: "Missing critical JPMorgan technologies",
        explanation:
          "Job description specifically mentions Java and Go, but these are completely absent from the skills section. Java is particularly important for JPMorgan's technology stack.",
      },
      {
        type: "improve",
        tip: "Lacks enterprise and cloud technologies",
        explanation:
          "Missing skills in cloud computing (AWS, Azure), DevOps tools, big data technologies, and cybersecurity - all mentioned as key areas in the job description.",
      },
      {
        type: "improve",
        tip: "No mention of financial technology skills",
        explanation:
          "For a financial services role, skills related to financial APIs, trading systems, risk management tools, or regulatory compliance frameworks would be valuable additions.",
      },
    ],
  },
};

export default function ResumeFeedBack() {
  return (
    <aside className="col-span-1 space-y-5 h-full overflow-auto">
      <OverviewCard feedback={feedback} />
      <ATSCard ATSProps={feedback.ATS} />
      <DetailedAnalysis feedback={feedback} />
    </aside>
  );
}
