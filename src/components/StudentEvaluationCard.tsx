import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Score, ScoreSelector } from '@/src/components/ScoreSelector';
import { colors } from '@/src/theme/colors';
import type { Student } from '@/src/data/mock';

export type EvaluationDraft = {
  participation: Score | null;
  punctuality: Score | null;
  homework: Score | null;
  behavior: Score | null;
  notebook: Score | null;
  absent: boolean;
};

type ScoreKey = Exclude<keyof EvaluationDraft, 'absent'>;

type Props = {
  student: Student;
  value: EvaluationDraft;
  onChange: (next: EvaluationDraft) => void;
};

const criteria: Array<{ key: ScoreKey; label: string }> = [
  { key: 'participation', label: 'المشاركة' },
  { key: 'punctuality', label: 'التأخر' },
  { key: 'homework', label: 'الواجب' },
  { key: 'behavior', label: 'السلوك' },
  { key: 'notebook', label: 'الدفتر' },
];

export function StudentEvaluationCard({ student, value, onChange }: Props) {
  const setScore = (key: ScoreKey, score: Score) => onChange({ ...value, [key]: score, absent: false });

  return (
    <View style={[styles.card, value.absent && styles.absentCard]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => onChange({ ...value, absent: !value.absent })}
          style={({ pressed }) => [styles.absentButton, value.absent && styles.absentSelected, pressed && styles.pressed]}
        >
          <Text style={[styles.absentText, value.absent && styles.absentSelectedText]}>غائب</Text>
        </Pressable>
        <View style={styles.identity}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.code}>{student.massarCode}</Text>
        </View>
      </View>

      {!value.absent && (
        <View style={styles.criteria}>
          {criteria.map(({ key, label }) => (
            <ScoreSelector key={key} label={label} value={value[key]} onChange={(score) => setScore(key, score)} />
          ))}
        </View>
      )}

      {value.absent && <Text style={styles.absentHint}>لن تدخل هذه الحصة في معدل التلميذ.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  absentCard: { borderColor: '#E6BEBE' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  identity: { flex: 1, alignItems: 'flex-end' },
  name: { fontSize: 17, fontWeight: '700', color: colors.text, writingDirection: 'rtl' },
  code: { marginTop: 4, fontSize: 12, color: colors.textMuted },
  absentButton: {
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  absentSelected: { backgroundColor: '#FCEAEA', borderColor: '#E6BEBE' },
  absentText: { fontWeight: '700', color: colors.textMuted },
  absentSelectedText: { color: colors.danger },
  pressed: { opacity: 0.68 },
  criteria: { marginTop: 18, gap: 12 },
  absentHint: { marginTop: 14, textAlign: 'right', color: colors.danger, fontSize: 13, writingDirection: 'rtl' },
});
