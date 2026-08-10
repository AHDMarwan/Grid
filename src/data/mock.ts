export type SchoolClass = {
  id: string;
  name: string;
  level: string;
  studentCount: number;
};

export type Student = {
  id: string;
  name: string;
  massarCode: string;
};

export const classes: SchoolClass[] = [
  { id: '2bac-pc-1', name: '2BAC PC 1', level: 'الثانية بكالوريا', studentCount: 34 },
  { id: '2bac-pc-2', name: '2BAC PC 2', level: 'الثانية بكالوريا', studentCount: 36 },
  { id: '1bac-sm-1', name: '1BAC SM 1', level: 'الأولى بكالوريا', studentCount: 32 },
  { id: '1bac-se-1', name: '1BAC SE 1', level: 'الأولى بكالوريا', studentCount: 35 },
];

export const students: Student[] = [
  { id: 's1', name: 'أحمد العلوي', massarCode: 'G123456789' },
  { id: 's2', name: 'سلمى المريني', massarCode: 'G223456789' },
  { id: 's3', name: 'محمد أمين', massarCode: 'G323456789' },
  { id: 's4', name: 'إيمان بنعمر', massarCode: 'G423456789' },
  { id: 's5', name: 'ياسين الإدريسي', massarCode: 'G523456789' },
  { id: 's6', name: 'مريم الزهراء', massarCode: 'G623456789' },
];

export const recentSessions = [
  { id: 'session-1', date: '10/08/2026', label: 'الحصة 6' },
  { id: 'session-2', date: '07/08/2026', label: 'الحصة 5' },
  { id: 'session-3', date: '03/08/2026', label: 'الحصة 4' },
];

export const mockResults = [
  { studentId: 's1', name: 'أحمد العلوي', participation: 2.4, punctuality: 2.8, homework: 2.1, behavior: 3.0, notebook: 2.6, overall: 2.58 },
  { studentId: 's2', name: 'سلمى المريني', participation: 2.9, punctuality: 3.0, homework: 2.7, behavior: 2.9, notebook: 3.0, overall: 2.90 },
  { studentId: 's3', name: 'محمد أمين', participation: 2.1, punctuality: 2.4, homework: 2.3, behavior: 2.6, notebook: 2.2, overall: 2.32 },
];
