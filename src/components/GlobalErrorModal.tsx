import { XCircle } from "lucide-react";
import { usePuter } from "../context/usePuter";

export default function GlobalErrorModal() {
  const { error, clearError } = usePuter();

  if (!error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#192540] text-white max-w-md w-full mx-4 p-6 rounded-2xl shadow-xl animate-in fade-in zoom-in-95">
        <div className="flex items-center gap-3 mb-4">
          <XCircle className="text-red-400" size={28} />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
        </div>

        <p className="text-gray-300 wrap-break-word">{error}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              window.location.reload();
              clearError();
            }}
            className="px-4 py-2 rounded-lg bg-[#2A3560] hover:bg-[#35427a] transition cursor-pointer"
          >
            Reload
          </button>

          <button
            onClick={clearError}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
