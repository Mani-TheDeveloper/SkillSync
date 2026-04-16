import { useState, type SubmitEvent } from "react";
import {
  Features,
  FileResume,
  FormResume,
} from "../components/UploadResumeComp";
import { usePuter } from "../context/usePuter";
import { convertPdfToImage } from "../lib/pdf2img";
import { generateUUID } from "../util";
import { prepareInstructions } from "../constants";

export default function UploadResume() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { handleError, fs, ai, kv } = usePuter();

  const handleAnalyze = async (
    companyName: string,
    jobTitle: string,
    jobDesc: string,
    file: File
  ) => {
    setIsProcessing(true);
    try {
      setStatusText("Uploading the file ...");

      const uploadedFile = await fs.upload(file);
      const fileItem = Array.isArray(uploadedFile)
        ? uploadedFile[0]
        : uploadedFile;

      if (!fileItem?.path) return handleError("Failed to upload the file");

      setStatusText("Converting to image ...");
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file)
        return handleError(imageFile.error || "Failed to convert PDF to image");

      setStatusText("Uploading the image ...");
      const uploadedImage = await fs.upload(imageFile.file);
      const imageItem = Array.isArray(uploadedImage)
        ? uploadedImage[0]
        : uploadedImage;
      if (!imageItem?.path)
        return handleError("Failed to upload the image file");

      setStatusText("Preparing data ...");
      const data = {
        id: generateUUID(),
        resumePath: fileItem.path,
        imagePath: imageItem.path,
        companyName,
        jobTitle,
        jobDesc,
        feedback: "",
      };

      setStatusText("Analysis ...");
      const feedback = await ai.feedback(
        fileItem.path,
        prepareInstructions({ jobTitle, jobDescription: jobDesc })
      );
      if (!feedback) return handleError("Failed to get feedback from AI");

      let feedbackText = "";
      const content = feedback.message?.content;

      if (typeof content === "string") feedbackText = content;
      else if (Array.isArray(content)) {
        feedbackText = content
          .map((item) =>
            typeof item === "string"
              ? item
              : typeof item === "object" && item !== null && "text" in item
              ? item.text ?? ""
              : ""
          )
          .join("\n");
      } else feedbackText = "";
      if (!feedbackText) return handleError("Failed to extract feedback text");

      data.feedback = JSON.parse(feedbackText);
      await kv.set(`resume:${data.id}`, JSON.stringify(data));

      setStatusText("Analysis completed, redirecting ...");
    } catch (error) {
      handleError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsProcessing(false);
      setStatusText("");
    }
  };

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

    const companyName = formData.get("company-name")?.toString().trim() || "";
    const jobTitle = formData.get("job-title")?.toString().trim() || "";
    const jobDesc = formData.get("job-desc")?.toString().trim() || "";

    handleAnalyze(companyName, jobTitle, jobDesc, file);
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
