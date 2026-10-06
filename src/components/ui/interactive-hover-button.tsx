import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils.ts";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ 
  text = "Button", 
  children,
  icon = <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />,
  className, 
  ...props 
}, ref) => {
  const content = children || text;

  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 px-6 text-center font-bold text-slate-950 dark:text-white shadow-xs active:scale-95 inline-flex items-center justify-center select-none isolation-isolate",
        "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
      {...props}
    >
      {/* 1. Base Layer (Resting state: label in bold dark text on light mode) */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-12 group-hover:opacity-0 text-slate-950 dark:text-white font-bold">
        <span className="truncate">{content}</span>
      </span>

      {/* 2. Hover Layer (Slides in with text + arrow icon on top of yellow background) */}
      <div 
        className="absolute inset-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-slate-950 font-black opacity-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
      >
        <span className="truncate">{content}</span>
        {icon}
      </div>

      {/* 3. Smooth Expanding Yellow Background Fill on Hover (100% button fill, zero stacking issues) */}
      <div 
        className="absolute inset-0 z-0 bg-[#fbb034] pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-full group-hover:translate-x-0"
      />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
