import { useState } from "react";

export default function Accordion({ title, answer }) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div onClick={() => setAccordionOpen(!accordionOpen)} className="flex items-center justify-between cursor-pointer">
        <span className="text-gray-900 text-base md:text-lg">
          {title}
        </span>
        <svg
          className="fill-gray-700 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </div>
      <div className={`mt-2 grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm md:text-base ${ accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          {answer}
        </div>
      </div>
    </div>
  )
}
