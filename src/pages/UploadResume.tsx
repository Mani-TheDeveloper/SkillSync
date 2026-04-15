import { useState, type SubmitEvent } from "react";
import {
  Features,
  FileResume,
  FormResume,
} from "../components/UploadResumeComp";
import { usePuter } from "../context/usePuter";

export default function UploadResume() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { handleError } = usePuter();

  const handleUploadResume = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      handleError("No File is selected");
      return;
    }
    const form = e.currentTarget.closest("form");
    if (!form) {
      handleError("form is not accessible");
      return;
    }
    const formData = new FormData(form);

    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDesc = formData.get("job-desc");

    console.log({ companyName, jobDesc, jobTitle, file });
  };

  const handleFileSelect = (inputFile: File | null) => setFile(inputFile);

  return (
    <>
      <section className="grid xl:grid-cols-3 gap-5 px-5 py-10">
        <FormResume
          handleUploadResume={handleUploadResume}
          isProcessing={isProcessing}
          statusText={statusText}
        />
        <FileResume file={file} handleFileSelect={handleFileSelect} />
      </section>
      <Features />
    </>
  );
}
