'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface DateNavigatorProps {
  viewDate: string;
  setViewDate: (date: string) => void;
  onFinalizeDay: () => void;
  isDayClosed: boolean;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

export function DateNavigator({ viewDate, setViewDate, onFinalizeDay, isDayClosed }: DateNavigatorProps) {
  const handleDateChange = (days: number) => {
    const d = new Date(viewDate);
    d.setDate(d.getDate() + days);
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

      <div className="ml-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button onClick={onFinalizeDay} disabled={isDayClosed} variant="destructive">
                  <Lock className="h-4 w-4 mr-2" /> Close Day
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isDayClosed ? 'This day is already closed' : 'Manually close and lock this day'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
