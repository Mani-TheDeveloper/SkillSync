import { ArrowRight, Info, UploadCloud, X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileResumeProps {
  file: File | null;
  handleFileSelect: (inputFile: File | null) => void;
}

export default function FileResume({
  handleFileSelect,
  file,
}: FileResumeProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0] || null;
      handleFileSelect(selected);
    },
    [handleFileSelect]
  );

  const formatSize = (size: number) =>
    (size / (1024 * 1024)).toFixed(2) + " MB";

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <aside className="xl:col-span-2 bg-[#091328] md:p-5 p-2 rounded-2xl">
      <div
        {...getRootProps()}
        className={`bg-[#192540] h-full rounded-2xl flex flex-col justify-center items-center gap-5
        py-10 px-2 transition-all duration-300
        ${isDragActive ? "border-2 border-[#A3A6FF] scale-[1.02]" : ""}`}
      >
        <input {...getInputProps()} />

        {file ? (
          <>
            <div className="bg-[#A3A6FF]/20 text-[#A3A6FF] p-5 rounded-full flex justify-center items-center">
              <Info className="size-10" />
            </div>

            <h3 className="xl:text-3xl text-xl text-center max-w-lg w-full min-w-0 truncate">
              {file.name.length > 20
                ? `${file.name.slice(0, 10)} ... ${file.name.slice(-10)}`
                : file.name}
            </h3>
            <p className="font-medium md:text-lg text-gray-300">
              {formatSize(file.size)}
            </p>

            <div className="flex gap-3">
              <button
                onClick={open}
                className="px-6 py-2 bg-[#2A3560] rounded-full text-white hover:scale-105 transition cursor-pointer"
              >
                Replace
              </button>

              <button
                onClick={() => handleFileSelect(null)}
                className="px-6 py-2 bg-red-500/80 rounded-full text-white hover:scale-105 transition flex items-center gap-1 cursor-pointer"
              >
                Remove <X size={16} strokeWidth={3} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#A3A6FF]/20 text-[#A3A6FF] p-5 rounded-full flex justify-center items-center animate-pulse">
              <UploadCloud className="size-10" />
            </div>

            <h3 className="xl:text-3xl text-xl font-semibold">
              Upload Your Resume
            </h3>

            <p className="md:w-3/5 md:text-base text-sm text-center text-gray-400">
              {isDragActive
                ? "Drop your file here..."
                : "Drag & drop your PDF resume to start analysis."}
            </p>

            <button
              onClick={open}
              className="flex justify-center items-center gap-2 md:px-10 md:py-4 px-5 py-2 
              bg-linear-to-r from-[#A3A6FF] to-[#6063EE] cursor-pointer
              rounded-full text-[#0F00A4] font-semibold md:text-lg 
              transition-all duration-300 hover:scale-105 active:scale-100"
            >
              Select File <ArrowRight className="md:size-7" strokeWidth={2.5} />
            </button>

            <div className="flex justify-evenly gap-7">
              <div className="text-center">
                <p className="uppercase text-sm text-gray-400">Max size</p>
                <p className="font-medium md:text-lg">20MB</p>
              </div>

              <div className="h-full w-0.5 bg-gray-600" />

              <div className="uppercase text-center">
                <p className="text-gray-400 text-sm">Format</p>
                <p className="font-medium md:text-lg">PDF</p>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
