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
    <section className="grid md:grid-cols-2 gap-6">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-500">
            <CheckCircle2 />
            Completed Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          {log.completed.length === 0 ? (
            <p className="text-muted-foreground text-sm">No tasks completed yet.</p>
          ) : (
            <ul className="space-y-2">
              {log.completed.map(c => (
                <li key={c.id} className="text-sm flex justify-between items-center p-2 rounded-md bg-green-50 dark:bg-green-900/20">
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.amount} {c.unit}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-500">
            <XCircle />
            Incomplete Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          {log.incomplete.length === 0 ? (
            <p className="text-muted-foreground text-sm">No tasks missed. Great job!</p>
          ) : (
            <ul className="space-y-2">
              {log.incomplete.map(i => (
                <li key={i.id} className="text-sm flex justify-between items-center p-2 rounded-md bg-red-50 dark:bg-red-900/20">
                  <div>
                    <p className="font-medium">{i.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{i.reason.replace('auto-missed', 'Auto Missed')}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
