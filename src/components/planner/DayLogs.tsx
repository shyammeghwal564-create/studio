'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DayLog } from '@/lib/types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface DayLogsProps {
  log: DayLog;
}

export function DayLogs({ log }: DayLogsProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        Log for {new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
      </h3>
      <section className="grid md:grid-cols-2 gap-6">
        <Card className="bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-500">
              <CheckCircle2 />
              Completed Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {log.completed.length === 0 ? (
              <p className="text-muted-foreground text-sm">No tasks completed on this day.</p>
            ) : (
              <ul className="space-y-2">
                {log.completed.map(c => (
                  <li key={c.id} className="text-sm flex justify-between items-center p-2 rounded-md bg-green-100 dark:bg-green-900/20">
                    <p className="font-medium">{c.title}</p>
                    <div className="text-xs text-muted-foreground">{new Date(c.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-500">
              <XCircle />
              Pending/Missed Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {log.incomplete.length === 0 ? (
              <p className="text-muted-foreground text-sm">No tasks missed. Great job!</p>
            ) : (
              <ul className="space-y-2">
                {log.incomplete.map(i => (
                  <li key={i.id} className="text-sm flex justify-between items-center p-2 rounded-md bg-red-100 dark:bg-red-900/20">
                    <p className="font-medium">{i.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{i.reason.replace('auto-missed', 'Auto Missed')}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
