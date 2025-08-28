'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const sortedMonths = Object.keys(summary).sort().reverse();

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays />
          Monthly Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedMonths.length === 0 ? (
          <p className="text-muted-foreground">No data yet. Start completing tasks to see your summary.</p>
        ) : (
          <div className="space-y-6">
            {sortedMonths.map(month => (
              <div key={month}>
                <h3 className="font-semibold mb-2">{new Date(month + '-02').toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
                  {Object.entries(summary[month]).sort((a, b) => a[0].localeCompare(b[0])).map(([date, stats]) => (
                    <div
                      key={date}
                      className={cn(
                        "p-2 rounded-lg border",
                        stats.closed ? 'bg-green-100/50 dark:bg-green-900/30 border-green-200 dark:border-green-800' : 'bg-amber-100/50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800'
                      )}
                    >
                      <p className="text-xs font-bold">{new Date(date).toLocaleDateString(undefined, { day: 'numeric', weekday: 'short', timeZone: 'UTC' })}</p>
                      <p className="text-lg font-bold">
                        <span className="text-green-600">{stats.completed}</span> / <span className="text-red-600">{stats.incomplete}</span>
                      </p>
                      <p className={cn("text-xs", stats.closed ? "text-green-700 dark:text-green-400" : "text-amber-700 dark:text-amber-400")}>
                        {stats.closed ? 'Closed' : 'Open'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
