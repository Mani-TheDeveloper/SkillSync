import { useEffect, useState } from "react";
import { usePuter } from "../../context/usePuter";

export default function ResumeImage({ imagePath }: { imagePath: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { fs } = usePuter();

  useEffect(() => {
    let url: string;

    const loadImage = async () => {
      if (!imagePath) return;

      const blob = await fs.read(imagePath);
      if (blob instanceof Blob) {
        url = URL.createObjectURL(blob);
        setImageUrl(url);
      }
    };
    loadImage();

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [imagePath, fs]);

  if (!imageUrl)
    return (
      <aside className="col-span-1 h-full w-full flex justify-center items-center text-gray-500">
        No Image Available
      </aside>
    );
  return (
    <aside className="col-span-1 h-full w-full overflow-auto rounded-xl">
      <div>
        <img src={imageUrl || ""} alt="ResumeImage" className="h-full w-full" />
      </div>
    </aside>
  );
}
