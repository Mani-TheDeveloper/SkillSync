import type * as PDFJS from "pdfjs-dist";
export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: typeof PDFJS | null = null;
let loadPromise: Promise<typeof PDFJS> | null = null;

async function loadPdfJs(): Promise<typeof PDFJS> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    pdfjsLib = lib;
    return lib;
  });

  return loadPromise;
}

export async function convertPdfToImage(
  file: File,
  options?: { scale?: number }
): Promise<PdfConversionResult> {
  const scale = options?.scale ?? 2.5;

  try {
    const lib = await loadPdfJs();

    const buffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: buffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas context not available");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    await page.render({ canvas, viewport }).promise;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (!b) return reject(new Error("Blob creation failed"));
        resolve(b);
      }, "image/png");
    });

    const originalName = file.name.replace(/\.pdf$/i, "");
    const imageFile = new File([blob], `${originalName}.png`, {
      type: "image/png",
    });

    const imageUrl = URL.createObjectURL(blob);

    return {
      imageUrl,
      file: imageFile,
    };
  } catch (err: unknown) {
    let message = "Failed to convert PDF";

    if (err instanceof Error) message = err.message;
    else if (typeof err === "string") message = err;

    return {
      imageUrl: "",
      file: null,
      error: message,
    };
  }
}
