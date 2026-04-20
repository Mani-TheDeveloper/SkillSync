import { useEffect, useState } from "react";
import { usePuter } from "../../context/usePuter";

export default function ResumeImage({
  imagePath,
  resumePath,
}: {
  imagePath: string;
  resumePath: string;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const { fs } = usePuter();

  useEffect(() => {
    let imageUrl: string;
    let resumeUrl: string;

    const loadImage = async () => {
      if (!imagePath) return;

      const blob = await fs.read(imagePath);
      if (blob instanceof Blob) {
        imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      }
    };
    loadImage();

    const loadResume = async () => {
      if (!resumePath) return;
      const resumeblob = await fs.read(resumePath);
      if (!resumeblob) return;
      const pdfBlob = new Blob([resumeblob], { type: "application/pdf" });
      resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);
    };
    loadResume();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (resumeUrl) URL.revokeObjectURL(resumeUrl);
    };
  }, [imagePath, resumePath, fs]);

  if (!imageUrl || !resumeUrl)
    return (
      <aside className="col-span-1 h-full w-full flex justify-center items-center text-gray-500">
        No Image Available
      </aside>
    );
  return (
    <aside className="col-span-1 h-full w-full overflow-auto rounded-xl">
      <a href={resumeUrl || "#"} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl || ""} alt="ResumeImage" className="h-full w-full" />
      </a>
    </aside>
  );
}
