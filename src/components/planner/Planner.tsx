'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Template, Logs, Exam, DayLog } from '@/lib/types';
import { uid } from '@/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PlannerHeader } from './Header';
import { ExamCountdown } from './ExamCountdown';
import { DateNavigator } from './DateNavigator';
import { AddTaskForm } from './AddTaskForm';
import { ActiveTaskCard } from './ActiveTaskCard';
import { History } from './History';
import { StudyHabitScore } from './StudyHabitScore';
import { useToast } from '@/hooks/use-toast';
import { ManageTemplatesDialog } from './ManageTemplatesDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '../ui/card';

const THEMES = [
  { id: 'theme10', name: 'Neutral', overlay: 'linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))', darkOverlay: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.15))' },
  { id: 'theme1', name: 'Warm Amber', overlay: 'linear-gradient(180deg, rgba(255,244,229,0.6), rgba(255,244,229,0.3))', darkOverlay: 'linear-gradient(180deg, rgba(71, 33, 0, 0.4), rgba(71, 33, 0, 0.2))' },
  { id: 'theme2', name: 'Cool Blue', overlay: 'linear-gradient(180deg, rgba(235,248,255,0.6), rgba(235,248,255,0.3))', darkOverlay: 'linear-gradient(180deg, rgba(0, 44, 71, 0.4), rgba(0, 44, 71, 0.2))' },
  { id: 'theme3', name: 'Mint', overlay: 'linear-gradient(180deg, rgba(237,252,240,0.6), rgba(237,252,240,0.3))', darkOverlay: 'linear-gradient(180deg, rgba(14, 60, 20, 0.4), rgba(14, 60, 20, 0.2))' },
  { id: 'theme4', name: 'Rose', overlay: 'linear-gradient(180deg, rgba(255,240,242,0.6), rgba(255,240,242,0.3))', darkOverlay: 'linear-gradient(180deg, rgba(71, 0, 11, 0.4), rgba(71, 0, 11, 0.2))' },
  { id: 'theme5', name: 'Slate', overlay: 'linear-gradient(180deg, rgba(246,247,249,0.6), rgba(246,247,249,0.3))', darkOverlay: 'linear-gradient(180deg, rgba(23, 28, 36, 0.4), rgba(23, 28, 36, 0.2))' },
  { id: 'theme6', name: 'Sunset', overlay: 'linear-gradient(180deg, rgba(255,245,238,0.6), rgba(255,245,238,0.3))', darkOverlay: 'linear-gradient(180deg, rgba(87, 44, 13, 0.4), rgba(87, 44, 13, 0.2))' },
  { id: 'theme7', name: 'Lavender', overlay: 'linear-gradient(180deg, rgba(250,245,255,0.6), rgba(250,245,255,0.3))', darkOverlay: 'linear-gradient(180deg, rgba(55, 23, 80, 0.4), rgba(55, 23, 80, 0.2))' },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

export function Planner() {
  const [templates, setTemplates] = useLocalStorage<Template[]>('upsc.templates', []);
  const [logs, setLogs] = useLocalStorage<Logs>('upsc.logs', {});
  const [exam, setExam] = useLocalStorage<Exam>('upsc.exam', { name: 'UPSC CSE 2025', date: '' });
  const [themeId, setThemeId] = useLocalStorage<string>('upsc.theme', THEMES[0].id);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('upsc.dark', false);
  const [lastAutoClose, setLastAutoClose] = useLocalStorage<string | null>('upsc.lastAutoClose', null);

  const [viewDate, setViewDate] = useState(todayISO());
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    const root = window.document.documentElement;
    root.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const getActive = useCallback((date: string) => {
    const dayLog = logs[date] || { completed: [], incomplete: [] };
    const doneIds = new Set([...dayLog.completed.map(x => x.templateId), ...dayLog.incomplete.map(x => x.templateId)]);
    return templates.filter(t => !doneIds.has(t.id));
  }, [logs, templates]);


  const addTemplate = useCallback((title: string) => {
    const newTemplate: Template = {
      id: uid(),
      title: title.trim(),
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
    };
    setTemplates(prev => [...prev, newTemplate]);
  }, [setTemplates]);

  const removeTemplate = useCallback((id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    // Also remove from any logs
    setLogs(prevLogs => {
      const newLogs = { ...prevLogs };
      for (const date in newLogs) {
        newLogs[date] = {
          ...newLogs[date],
          completed: newLogs[date].completed.filter(c => c.templateId !== id),
          incomplete: newLogs[date].incomplete.filter(i => i.templateId !== id),
        };
      }
      return newLogs;
    });
  }, [setTemplates, setLogs]);

  const markComplete = useCallback((date: string, t: Template) => {
    setLogs(prev => {
      const l = prev[date] || { completed: [], incomplete: [], closed: false };
      if (l.closed) return prev;
      const entry = { id: uid(), templateId: t.id, title: t.title, at: new Date().toISOString() };
      return { ...prev, [date]: { ...l, completed: [...l.completed, entry] } };
    });
  }, [setLogs]);

  const finalizeDay = useCallback((date: string) => {
    setLogs(prev => {
      const l = prev[date] || { completed: [], incomplete: [], closed: false };
      if (l.closed) return prev;
      const doneIds = new Set([...l.completed.map(x => x.templateId), ...l.incomplete.map(x => x.templateId)]);
      const remaining = templates.filter(t => !doneIds.has(t.id));
      const more = remaining.map(t => ({ id: uid(), templateId: t.id, title: t.title, reason: 'auto-missed', at: new Date().toISOString() }));
      return { ...prev, [date]: { completed: l.completed, incomplete: [...l.incomplete, ...more], closed: true } };
    });
  }, [setLogs, templates]);

  useEffect(() => {
    const msUntilNextMidnight = () => {
      const now = new Date();
      const next = new Date(now);
      next.setDate(now.getDate() + 1);
      next.setHours(0, 0, 0, 0);
      return next.getTime() - now.getTime();
    };

    const scheduleAutoClose = () => {
      const timeout = setTimeout(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateKey = yesterday.toISOString().slice(0, 10);
        if (dateKey !== lastAutoClose) {
            finalizeDay(dateKey);
            setLastAutoClose(dateKey);
        }
        
        const interval = setInterval(() => {
          const y = new Date();
          y.setDate(y.getDate() - 1);
          const yKey = y.toISOString().slice(0,10);
          finalizeDay(yKey);
          setLastAutoClose(yKey);
        }, 24 * 60 * 60 * 1000);

        return () => clearInterval(interval);
      }, msUntilNextMidnight());

      return () => clearTimeout(timeout);
    };

    const cleanup = scheduleAutoClose();
    return cleanup;
  }, [finalizeDay, templates, setLastAutoClose, lastAutoClose]);

  const exportJSON = useCallback(() => {
    const data = { templates, logs, exam, themeId, darkMode };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upsc_planner_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [templates, logs, exam, themeId, darkMode]);

  const importJSON = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') {
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to read file.' });
          return;
        }
        const obj = JSON.parse(result);
        if (obj.templates) setTemplates(obj.templates);
        if (obj.logs) setLogs(obj.logs);
        if (obj.exam) setExam(obj.exam);
        if (obj.themeId) setThemeId(obj.themeId);
        if (typeof obj.darkMode !== 'undefined') setDarkMode(obj.darkMode);
        toast({ title: 'Success', description: 'Data imported successfully.' });
      } catch {
        toast({ variant: 'destructive', title: 'Error', description: 'Invalid JSON file.' });
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  }, [setTemplates, setLogs, setExam, setThemeId, setDarkMode, toast]);

  const exportCSV = useCallback(() => {
    const rows = [['Date', 'Status', 'Title', 'Reason']];
    Object.entries(logs).forEach(([date, l]) => {
      l.completed.forEach(c => rows.push([date, 'Completed', c.title, '']));
      l.incomplete.forEach(i => rows.push([date, 'Incomplete', i.title, i.reason || '']));
    });
    const csv = rows.map(r => r.map(c => `"${String(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upsc_planner_logs_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [logs]);

  const activeForView = useMemo(() => getActive(viewDate), [getActive, viewDate]);
  const dayLog: DayLog | undefined = useMemo(() => logs[viewDate] ? { date: viewDate, ...logs[viewDate] } : undefined, [logs, viewDate]);
  const isDayClosedForView = useMemo(() => {
    return !!dayLog?.closed;
  }, [dayLog]);

  const selectedTheme = THEMES.find(x => x.id === themeId) || THEMES[0];
  const overlayStyle = {
    background: darkMode ? selectedTheme.darkOverlay : selectedTheme.overlay
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen" style={overlayStyle}>
      <div className="backdrop-blur-sm min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
          <PlannerHeader
            themes={THEMES}
            themeId={themeId}
            setThemeId={setThemeId}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            exportJSON={exportJSON}
            importJSON={importJSON}
            exportCSV={exportCSV}
          >
            <ManageTemplatesDialog templates={templates} onRemoveTemplate={removeTemplate} />
          </PlannerHeader>
          
          <ExamCountdown exam={exam} setExam={setExam} />

          <StudyHabitScore logs={logs} />
          
          <AddTaskForm onAddTask={addTemplate} />

          <Tabs defaultValue="today-tasks">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="today-tasks">Today's Tasks</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="today-tasks">
              <Card className="bg-card/80 backdrop-blur-sm mt-4">
                <div className="p-4 md:p-6 space-y-4">
                  <DateNavigator viewDate={viewDate} setViewDate={setViewDate} />
                  
                  <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-4">
                      Active Tasks for {viewDate} 
                      {isDayClosedForView && <span className="text-sm font-medium text-destructive"> (Closed)</span>}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {activeForView.length === 0 ? (
                        <div className="col-span-full bg-muted/50 p-6 rounded-lg text-center text-muted-foreground">
                          No active tasks. All done for the day!
                        </div>
                      ) : activeForView.map(t => (
                        <ActiveTaskCard key={t.id} task={t} date={viewDate} isDayClosed={isDayClosedForView} onComplete={markComplete} />
                      ))}
                    </div>
                  </section>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card className="bg-card/80 backdrop-blur-sm mt-4">
                <div className="p-4 md:p-6">
                  <History logs={logs} />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          
          <footer className="text-center text-muted-foreground pt-8">
            <p>Goal for Exam - Forge your path to success.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

    