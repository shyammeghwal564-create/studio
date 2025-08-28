'use client';

import type { Logs } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Star, TrendingUp, Zap } from 'lucide-react';
import React from 'react';

interface StudyHabitScoreProps {
  logs: Logs;
}

export function StudyHabitScore({ logs }: StudyHabitScoreProps) {
  const lastClosedDayStats = React.useMemo(() => {
    const closedDays = Object.entries(logs)
      .filter(([, log]) => log.closed)
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA));

    if (closedDays.length === 0) {
      return null;
    }

    const [date, log] = closedDays[0];
    const totalTasks = log.completed.length + log.incomplete.length;
    if (totalTasks === 0) {
        return {
            date,
            score: null,
            message: "You didn't have any tasks for your last session. Add some templates to get started!",
            Icon: Zap,
            variant: "default",
        }
    }

    const score = Math.round((log.completed.length / totalTasks) * 100);
    
    if (score >= 80) {
      return {
        date,
        score,
        message: `Excellent consistency! You completed ${score}% of your tasks. Keep up the momentum!`,
        Icon: Star,
        variant: "default",
      };
    } else if (score >= 50) {
      return {
        date,
        score,
        message: `Good effort, with ${score}% completion. A little more focus can make a big difference.`,
        Icon: TrendingUp,
        variant: "default",
      };
    } else {
      return {
        date,
        score,
        message: `You completed ${score}% of tasks. Let's reflect on what went wrong and plan for a better day tomorrow.`,
        Icon: Zap,
        variant: "destructive",
      };
    }
  }, [logs]);

  if (!lastClosedDayStats) {
    return (
        <Alert>
            <Zap className="h-4 w-4" />
            <AlertTitle>Welcome!</AlertTitle>
            <AlertDescription>Complete your first day to get feedback on your study habits.</AlertDescription>
        </Alert>
    );
  }

  const { Icon, message, variant, date } = lastClosedDayStats;

  return (
    <Alert variant={variant as "default" | "destructive"}>
      <Icon className="h-4 w-4" />
      <AlertTitle>Feedback for {new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', timeZone: 'UTC' })}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
