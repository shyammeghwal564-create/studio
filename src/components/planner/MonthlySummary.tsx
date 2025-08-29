'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface MonthlySummaryProps {
  summary: {
    [month: string]: {
      [date: string]: {
        completed: number;
        incomplete: number;
        closed: boolean;
      };
    };
  };
}

export function MonthlySummary({ summary }: MonthlySummaryProps) {
  const sortedMonths = Object.keys(summary).sort((a, b) => b.localeCompare(a));

  return (
    <div>
       <h3 className="text-xl font-bold mb-4">Monthly Progress Overview</h3>
        {sortedMonths.length === 0 ? (
          <p className="text-muted-foreground p-4 text-center">No data yet. Start completing tasks to see your summary.</p>
        ) : (
          <div className="space-y-8">
            {sortedMonths.map(month => (
              <div key={month}>
                <h4 className="font-semibold text-lg mb-3">{new Date(month + '-02').toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
                  {Object.entries(summary[month]).sort((a, b) => a[0].localeCompare(b[0])).map(([date, stats]) => (
                    <TooltipProvider key={date}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "p-2 rounded-lg border aspect-square flex flex-col justify-between",
                              stats.closed ? 'bg-green-100/50 dark:bg-green-900/30 border-green-200 dark:border-green-800' : 'bg-amber-100/50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800'
                            )}
                          >
                            <p className="text-xs font-bold text-center">{new Date(date).toLocaleDateString(undefined, { day: 'numeric', timeZone: 'UTC' })}</p>
                            <div className="text-center">
                              <span className="font-bold text-green-600">{stats.completed}</span>
                              <span className="text-muted-foreground">/</span>
                              <span className="font-bold text-red-600">{stats.incomplete}</span>
                            </div>
                            <p className="text-xs text-center text-muted-foreground">{new Date(date).toLocaleDateString(undefined, { weekday: 'short', timeZone: 'UTC' })}</p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
                          <p>{stats.completed} completed, {stats.incomplete} incomplete.</p>
                          <p>Status: {stats.closed ? 'Closed' : 'Open'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
