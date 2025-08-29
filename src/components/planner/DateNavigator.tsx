'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface DateNavigatorProps {
  viewDate: string;
  setViewDate: (date: string) => void;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

export function DateNavigator({ viewDate, setViewDate }: DateNavigatorProps) {
  const handleDateChange = (days: number) => {
    const d = new Date(viewDate);
    // Use UTC date methods to avoid timezone shift issues
    d.setUTCDate(d.getUTCDate() + days);
    setViewDate(d.toISOString().slice(0, 10));
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => handleDateChange(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Previous Day</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="px-4 py-2 rounded-md bg-card/80 border text-sm font-medium">
        {new Date(viewDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={() => handleDateChange(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Next Day</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {viewDate !== todayISO() && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" onClick={() => setViewDate(todayISO())}>
                <Calendar className="h-4 w-4 mr-2" /> Today
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Go to Today</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
