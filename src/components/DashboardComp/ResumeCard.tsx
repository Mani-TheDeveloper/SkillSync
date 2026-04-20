import { Link } from "react-router-dom";
import type { ResumeState } from "../../types";
import { useEffect, useState } from "react";
import { usePuter } from "../../context/usePuter";

export default function ResumeCard({
  resume: {
    id,
    feedback: { overallScore },
    companyName,
    jobTitle,
    imagePath,
  },
}: {
  resume: ResumeState;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { fs } = usePuter();

  useEffect(() => {
    let imageUrl: string;

    const loadImage = async () => {
      if (!imagePath) return;

      const blob = await fs.read(imagePath);
      if (blob instanceof Blob) {
        imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      }
    };
    loadImage();
  }, [fs, imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="col-span-1 font-medium p-5 bg-[#192540] rounded-2xl space-y-2 hover:scale-105 transition-all duration-500 ease-in-out active:scale-100"
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="sm:text-3xl text-xl">{companyName}</h3>
          <p className="sm:text-sm text-xs text-gray-400">{jobTitle}</p>
        </div>
        <div
          className="relative flex items-center justify-center rounded-full w-16 h-16"
          style={{
            background: `conic-gradient(
                        #C180FF 0%,
                        #9F6BFF ${overallScore * 0.5}%,
                        #7B5CFF ${overallScore}%,
                        #e5e7eb ${overallScore}%,
                        #e5e7eb 100%
                      )`,
          }}
        >
          <div className="flex items-center justify-center w-4/5 h-4/5 bg-[#192540] rounded-full">
            <p className="font-medium text-xs">{overallScore}/100</p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden h-[40vh] border-4 sm:border-8 border-[#0F1930] rounded-xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${companyName}-${jobTitle}`}
            loading="lazy"
          />
        ) : (
          <p className="">Image not available</p>
        )}
      </div>
    </Link>
  );
}
