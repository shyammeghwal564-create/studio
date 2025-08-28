'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Exam } from '@/lib/types';

interface ExamCountdownProps {
  exam: Exam;
  setExam: React.Dispatch<React.SetStateAction<Exam>>;
}

export function ExamCountdown({ exam, setExam }: ExamCountdownProps) {
  const daysLeft = React.useMemo(() => {
    if (!exam.date) return null;
    try {
      // Add timezone offset to avoid off-by-one day errors
      const examDate = new Date(exam.date);
      const today = new Date();
      examDate.setMinutes(examDate.getMinutes() + examDate.getTimezoneOffset());
      today.setHours(0,0,0,0);
      
      const diffTime = examDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return null;
    }
  }, [exam.date]);

  const countdownText = React.useMemo(() => {
    if (daysLeft === null) return 'Set exam date';
    if (daysLeft > 0) return `${daysLeft} days left`;
    if (daysLeft === 0) return 'Exam is today!';
    return `${Math.abs(daysLeft)} days past`;
  }, [daysLeft]);

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Input
            value={exam.name}
            onChange={e => setExam({ ...exam, name: e.target.value })}
            className="text-lg font-semibold flex-grow"
            aria-label="Exam Name"
          />
          <Input
            type="date"
            value={exam.date}
            onChange={e => setExam({ ...exam, date: e.target.value })}
            className="w-full md:w-auto"
            aria-label="Exam Date"
          />
          <div className="md:ml-auto text-center md:text-right">
            <p className="text-lg font-bold text-primary">{countdownText}</p>
            <p className="text-xs text-muted-foreground">until {exam.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
