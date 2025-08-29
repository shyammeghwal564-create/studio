export interface Template {
  id: string;
  title: string;
  // target: number; // Removed as per user request
  // unit: 'mins' | 'Qs' | 'pages'; // Removed as per user request
  color: string;
}

export interface CompletedLogEntry {
  id: string;
  templateId: string;
  title: string;
  // amount: number; // Removed as per user request
  // unit: string; // Removed as per user request
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
