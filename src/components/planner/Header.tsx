'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sun, Moon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { GoalIcon } from './GoalIcon';

interface PlannerHeaderProps {
  themes: { id: string; name: string }[];
  themeId: string;
  setThemeId: (id: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  children: React.ReactNode;
}

export function PlannerHeader({
  themes,
  themeId,
  setThemeId,
  darkMode,
  setDarkMode,
  children
}: PlannerHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <GoalIcon className="h-12 w-12 text-primary" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Goals For Exam
          </h1>
          <p className="text-sm text-muted-foreground">Your daily guide to success.</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="theme-select" className="text-sm">Theme</Label>
          <Select value={themeId} onValueChange={setThemeId}>
            <SelectTrigger id="theme-select" className="w-[130px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map(t => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  aria-label="Toggle dark mode"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Day/Night Mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Label htmlFor="dark-mode">{darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</Label>
        </div>
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </header>
  );
}
