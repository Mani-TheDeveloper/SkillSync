import { Search } from "lucide-react";

export default function Filter() {
  return (
    <>
      <h2 className="md:text-5xl sm:text-3xl text-2xl max-w-3xl w-full md:leading-14 sm:leading-10 font-medium">
        Master Your Career Path with{" "}
        <span className="text-[#C180FF]">AI-Driven</span> Precision
      </h2>
      <form
        onSubmit={() => {}}
        className="relative max-w-lg w-full flex items-center"
      >
        <input
          type="text"
          placeholder="Search analysis history..."
          className="bg-[#192540] py-3 px-10 rounded-xl w-full outline-none focus:ring-2 focus:ring-white/30 md:text-base text-sm"
        />
        <Search className="absolute left-2 text-[#A3AAC4]" />
      </form>
    </>
  );
}
