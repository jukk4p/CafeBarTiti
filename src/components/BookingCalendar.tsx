
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  reservedDates: Date[];
  maxTablesPerDay: number;
}

export function BookingCalendar({
  selectedDate,
  onDateSelect,
  reservedDates,
  maxTablesPerDay,
}: BookingCalendarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fullDates = useMemo(() => {
    const counts: Record<string, number> = {};
    reservedDates.forEach((d) => {
      try {
        const dateObj = typeof d === 'string' ? new Date(d) : d;
        const key = format(dateObj, 'yyyy-MM-dd');
        counts[key] = (counts[key] || 0) + 1;
      } catch (e) { }
    });

    return Object.entries(counts)
      .filter(([_, count]) => count >= maxTablesPerDay)
      .map(([dateStr]) => startOfDay(new Date(dateStr)));
  }, [reservedDates, maxTablesPerDay]);

  const isDateDisabled = (date: Date) => {
    // Solo calcular 'today' en el cliente para evitar hidratación desigual
    if (!mounted) return true;

    const today = startOfDay(new Date());
    if (date < today) return true;
    return fullDates.some((fullDate) =>
      date.getFullYear() === fullDate.getFullYear() &&
      date.getMonth() === fullDate.getMonth() &&
      date.getDate() === fullDate.getDate()
    );
  };

  if (!mounted) {
    return (
      <div className="w-full space-y-8">
        <div className="w-full bg-card rounded-[2rem] p-6 md:p-8">
          <Skeleton className="h-[350px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full space-y-8">
      <div className="w-full glass-card dark:bg-white/5 rounded-[2rem] shadow-sm border border-border/50 dark:border-white/10 p-6 md:p-8">
        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={(date) => date && onDateSelect(date)}
          disabled={isDateDisabled}
          locale={es}
          className="w-full"
        />
      </div>

      {/* Legend */}
      <div className="w-full max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2 bg-card/30 backdrop-blur-md p-2 rounded-[1.5rem] border border-border/50 shadow-sm">
          <div className="flex flex-col items-center gap-2 py-3">
            <div className="w-4 h-4 bg-background border-2 border-primary/10 rounded-lg shadow-sm" />
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Disponible</span>
          </div>
          <div className="flex flex-col items-center gap-2 py-3 border-x border-border/50">
            <div className="w-4 h-4 bg-muted/40 rounded-lg flex items-center justify-center overflow-hidden relative">
              <div className="absolute w-[140%] h-[2px] bg-muted-foreground/20 rotate-45" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Ocupado</span>
          </div>
          <div className="flex flex-col items-center gap-2 py-3">
            <div className="w-4 h-4 bg-secondary rounded-lg shadow-md ring-2 ring-secondary/20" />
            <span className="text-[9px] font-black uppercase tracking-widest text-primary">Seleccionado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
