export interface Template {
  id: string;
  title: string;
  target: number;
  unit: 'mins' | 'Qs' | 'pages';
  color: string;
}

export interface CompletedLogEntry {
  id: string;
  templateId: string;
  title: string;
  amount: number;
  unit: string;
  at: string;
}

export interface IncompleteLogEntry {
  id: string;
  templateId: string;
  title: string;
  reason: string;
  at: string;
}

export interface DayLog {
  date: string;
  completed: CompletedLogEntry[];
  incomplete: IncompleteLogEntry[];
  closed: boolean;
}

export interface Logs {
  [date: string]: Omit<DayLog, 'date'>;
}

export interface Exam {
  name: string;
  date: string;
}
