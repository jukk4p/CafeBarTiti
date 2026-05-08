
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-0 px-2 sm:px-10 relative w-full", className)}
      classNames={{
        months: "w-full space-y-4",
        month: "space-y-4 w-full",
        caption: "flex justify-between pt-1 relative items-center w-full mb-8 px-4",
        caption_label: "text-sm font-headline font-bold text-primary uppercase tracking-[0.2em]",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-background p-0 rounded-full hover:opacity-100 shadow-sm border-border/50"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-background p-0 rounded-full hover:opacity-100 shadow-sm border-border/50"
        ),
        month_grid: "w-full space-y-1",
        weekdays: "flex w-full justify-between mb-2",
        weekday: "text-primary/40 rounded-md w-full font-bold uppercase text-[9px] md:text-[10px] tracking-[0.2em] text-center",
        weeks: "w-full space-y-2",
        week: "flex w-full justify-between",
        day: cn(
          "h-10 w-10 sm:h-11 sm:w-11 p-0 font-bold rounded-xl transition-all flex items-center justify-center relative z-10 cursor-pointer hover:bg-primary/10 hover:text-primary text-xs sm:text-sm",
          "aria-selected:!bg-secondary aria-selected:!text-white aria-selected:hover:!bg-secondary aria-selected:hover:!text-white aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected: "!bg-secondary !text-white hover:!bg-secondary hover:!text-white focus:!bg-secondary focus:!text-white font-bold shadow-lg scale-105 border-2 border-white !opacity-100 z-20",
        today: "font-black underline decoration-2 underline-offset-4 aria-selected:decoration-white !opacity-100 hover:text-primary",
        outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-50",
        disabled: "text-muted-foreground/20 bg-muted/40 dark:bg-white/5 line-through cursor-not-allowed opacity-40 rounded-xl",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === 'left') return <ChevronLeft className="h-5 w-5" />;
          return <ChevronRight className="h-5 w-5" />;
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
