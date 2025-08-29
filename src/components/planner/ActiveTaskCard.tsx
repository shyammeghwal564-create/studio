'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import type { Template } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ActiveTaskCardProps {
  task: Template;
  date: string;
  isDayClosed: boolean;
  onComplete: (date: string, task: Template) => void;
}

export function ActiveTaskCard({ task, date, isDayClosed, onComplete }: ActiveTaskCardProps) {
  return (
    <Card className="flex flex-col bg-card/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">{task.title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: task.color }} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Task color indicator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Target and unit removed as per user request */}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" className="w-full" onClick={() => onComplete(date, task)} disabled={isDayClosed}>
          <Check className="h-4 w-4 mr-2" /> Complete
        </Button>
      </CardFooter>
    </Card>
  );
}
