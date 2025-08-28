'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (title: string, target: string, unit: 'mins' | 'Qs' | 'pages') => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('30');
  const [unit, setUnit] = useState<'mins' | 'Qs' | 'pages'>('mins');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title, target, unit);
    setTitle('');
    setTarget('30');
    setUnit('mins');
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-6 w-6" />
          Create New Task Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2">
          <Input
            placeholder="Task title (e.g., Polity Revision)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="flex-grow"
            required
          />
          <Input
            type="number"
            value={target}
            onChange={e => setTarget(e.target.value)}
            className="w-full md:w-24"
            min="0"
            required
          />
          <Select value={unit} onValueChange={(value: 'mins' | 'Qs' | 'pages') => setUnit(value)}>
            <SelectTrigger className="w-full md:w-[120px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mins">Minutes</SelectItem>
              <SelectItem value="Qs">Questions</SelectItem>
              <SelectItem value="pages">Pages</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full md:w-auto">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Template
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
