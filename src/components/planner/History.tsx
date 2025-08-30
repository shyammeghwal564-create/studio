'use client';

import React from 'react';
import type { Logs } from '@/lib/types';
import { DayLogs } from './DayLogs';
import { ScrollArea } from '../ui/scroll-area';

interface HistoryProps {
  logs: Logs;
}

export function History({ logs }: HistoryProps) {
  const organizedLogs = React.useMemo(() => {
    const groupedByMonth: { [month: string]: Logs } = {};
    const sortedDates = Object.keys(logs).sort((a, b) => b.localeCompare(a));

    for (const date of sortedDates) {
      const month = date.substring(0, 7); // YYYY-MM
      if (!groupedByMonth[month]) {
        groupedByMonth[month] = {};
      }
      groupedByMonth[month][date] = logs[date];
    }
    return groupedByMonth;
  }, [logs]);

  const sortedMonths = Object.keys(organizedLogs).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">Full History</h2>
      {sortedMonths.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">No history yet. Complete some tasks to see your logs.</p>
      ) : (
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-8">
            {sortedMonths.map(month => (
              <div key={month}>
                <div className="sticky top-0 bg-card/80 backdrop-blur-sm py-2 z-10">
                  <h3 className="text-xl font-bold">
                    {new Date(month + '-02').toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'UTC' })}
                  </h3>
                </div>
                <div className="space-y-6 mt-4">
                  {Object.entries(organizedLogs[month]).map(([date, logData]) => (
                    <DayLogs key={date} log={{ date, ...logData }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
