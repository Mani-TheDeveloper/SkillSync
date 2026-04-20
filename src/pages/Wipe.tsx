import { useEffect, useState } from "react";
import { usePuter } from "../context/usePuter";
import type { FSItem } from "@heyputer/puter.js";

export default function Wipe() {
  const { fs, kv } = usePuter();

  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };
  useEffect(() => {
    (async () => loadFiles())();
  }, [fs]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  return (
    <div>
      <div>Existing files:</div>
      <div className="flex flex-col gap-4">
        {files.map((file) => (
          <div key={file.id} className="flex flex-row gap-4">
            <p>{file.name}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() => handleDelete()}
        >
          Wipe App Data
        </button>
      </div>
    </div>
  );
}
