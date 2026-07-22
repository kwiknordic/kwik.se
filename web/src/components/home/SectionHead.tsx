import { ReactNode } from "react";

export function SectionHead({ children }: { children: ReactNode }) {
  return (
    <div className="section-head flex justify-between w-full items-end gap-6 flex-wrap mb-7">
      {children}
    </div>
  )
}

SectionHead.Heading = function SectionHeadHeading({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
};

SectionHead.Title = function SectionHeadTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[clamp(1.8rem,3.2vw,2.3rem)]">{children}</h2>;
};

SectionHead.Description = function SectionHeadDescription({ children }: { children: ReactNode }) {
  return <p className="font-serif text-ink-soft text-lg mt-2 max-w-44ch">{children}</p>;
};