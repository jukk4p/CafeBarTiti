
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
      className={cn("p-0 px-10 relative", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
        month: "space-y-4 w-full",
        month_caption: "flex justify-center pt-2 relative items-center mb-8 px-12",
        caption_label: "text-base font-headline font-bold text-primary capitalize",
        nav: "flex items-center space-x-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent p-0 border-primary/10 text-primary z-20 rounded-full shadow-sm hover:bg-secondary hover:text-primary transition-all active:scale-95 flex items-center justify-center cursor-pointer absolute left-1"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent p-0 border-primary/10 text-primary z-20 rounded-full shadow-sm hover:bg-secondary hover:text-primary transition-all active:scale-95 flex items-center justify-center cursor-pointer absolute right-1"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex w-full justify-between mb-4 border-b border-primary/5 pb-2",
        weekday: "text-primary/40 rounded-md w-full font-bold uppercase text-[10px] tracking-[0.2em] text-center",
        weeks: "w-full space-y-1",
        week: "flex w-full justify-between",
        day: "h-11 w-full text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-11 w-11 p-0 font-bold aria-selected:opacity-100 hover:bg-secondary/20 hover:text-primary rounded-xl transition-all w-full flex items-center justify-center relative z-10 text-foreground/90 cursor-pointer"
        ),
        range_end: "day-range-end",
        selected: "bg-secondary text-primary hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary font-bold shadow-lg scale-105 border-2 border-white !opacity-100 z-20",
        today: "text-secondary font-black underline decoration-2 underline-offset-4 !opacity-100 hover:text-primary",
        outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-50",
        disabled: "text-muted-foreground/40 bg-muted/10 dark:bg-muted/5 line-through cursor-not-allowed grayscale rounded-xl",
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
