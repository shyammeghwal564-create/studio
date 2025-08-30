'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import type { Logs } from '@/lib/types';
import { TrendingUp } from 'lucide-react';

interface MonthlyReportChartProps {
  logs: Logs;
}

const chartConfig = {
  completion: {
    label: 'Completion %',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function MonthlyReportChart({ logs }: MonthlyReportChartProps) {
  const chartData = useMemo(() => {
    return Object.entries(logs)
      .map(([date, log]) => {
        const totalTasks = log.completed.length + log.incomplete.length;
        const completion = totalTasks > 0 ? (log.completed.length / totalTasks) * 100 : 0;
        return {
          date: new Date(date).toLocaleDateString('en-US', { day: '2-digit', timeZone: 'UTC' }),
          completion,
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [logs]);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-none mt-2 bg-transparent">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-normal flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Monthly Report
        </CardTitle>
        <CardDescription className="text-xs">Daily task completion rate</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0 mt-4">
        <ChartContainer config={chartConfig} className="h-[150px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              unit="%"
              domain={[0, 100]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="completion" fill="var(--color-completion)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
