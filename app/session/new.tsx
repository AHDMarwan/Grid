import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '@/src/components/Screen';
import { EvaluationDraft, StudentEvaluationCard } from '@/src/components/StudentEvaluationCard';
import { Score } from '@/src/components/ScoreSelector';
import { classes, students } from '@/src/data/mock';
import { colors } from '@/src/theme/colors';

const emptyEvaluation = (): EvaluationDraft => ({
  participation: null,
  punctuality: null,
  homework: null,
  behavior: null,
  notebook: null,
  absent: false,
});

const withDefaultScore = (score: Score): EvaluationDraft => ({
  participation: score,
  punctuality: score,
  homework: score,
  behavior: score,
  notebook: score,
  absent: false,
});

export default function NewSessionScreen() {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const schoolClass = classes.find((item) => item.id === classId) ?? classes[0];
  const [drafts, setDrafts] = useState<Record<string, EvaluationDraft>>(() => Object.fromEntries(students.map((student) => [student.id, emptyEvaluation()])));
  const [defaultScore, setDefaultScore] = useState<Score | null>(null);

  const completedCount = useMemo(() => (Object.values(drafts) as EvaluationDraft[]).filter((draft) => draft.absent || draft.participation !== null || draft.punctuality !== null || draft.homework !== null || draft.behavior !== null || draft.notebook !== null).length, [drafts]);

  const applyDefault = (score: Score) => {
    setDefaultScore(score);
    setDrafts(Object.fromEntries(students.map((student) => [student.id, withDefaultScore(score)])));
  };

  const save = () => {
    Alert.alert('تم حفظ الحصة', 'هذه واجهة تجريبية حالياً. سيتم ربط الحفظ بـ SQLite في المرحلة الموالية.', [
      { text: 'حسناً', onPress: () => router.back() },
    ]);
  };

  return (
    <Screen>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>رجوع</Text></Pressable>
              <View style={styles.heading}>
                <Text style={styles.title}>حصة جديدة</Text>
                <Text style={styles.subtitle}>{schoolClass.name} · 10/08/2026</Text>
              </View>
            </View>

            <View style={styles.defaultCard}>
              <View style={styles.defaultTextWrap}>
                <Text style={styles.defaultTitle}>قيمة افتراضية للجميع</Text>
                <Text style={styles.defaultText}>طبّق نقطة واحدة ثم عدّل الحالات المختلفة فقط.</Text>
              </View>
              <View style={styles.defaultButtons}>
                {([0, 1, 2, 3] as Score[]).map((score) => (
                  <Pressable key={score} onPress={() => applyDefault(score)} style={[styles.defaultButton, defaultScore === score && styles.defaultSelected]}>
                    <Text style={[styles.defaultValue, defaultScore === score && styles.defaultSelectedValue]}>{score}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.progressRow}>
              <Text style={styles.progressValue}>{completedCount}/{students.length}</Text>
              <Text style={styles.progressLabel}>التلاميذ الذين تم التعامل معهم</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <StudentEvaluationCard
            student={item}
            value={drafts[item.id]}
            onChange={(next) => setDrafts((current) => ({ ...current, [item.id]: next }))}
          />
        )}
        ListFooterComponent={
          <Pressable onPress={save} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
            <Text style={styles.saveText}>حفظ الحصة</Text>
          </Pressable>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 40 },
  gap: { height: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18 },
  heading: { flex: 1, alignItems: 'flex-end' },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, writingDirection: 'rtl' },
  subtitle: { marginTop: 5, fontSize: 13, color: colors.textMuted, writingDirection: 'rtl' },
  back: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 11, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  backText: { color: colors.primary, fontWeight: '700' },
  defaultCard: { backgroundColor: colors.primarySoft, borderRadius: 20, padding: 16, marginBottom: 16 },
  defaultTextWrap: { alignItems: 'flex-end' },
  defaultTitle: { fontSize: 16, fontWeight: '800', color: colors.primary, writingDirection: 'rtl' },
  defaultText: { marginTop: 5, fontSize: 12, color: colors.textMuted, writingDirection: 'rtl', textAlign: 'right' },
  defaultButtons: { marginTop: 15, flexDirection: 'row', justifyContent: 'flex-end', gap: 9 },
  defaultButton: { width: 43, height: 43, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  defaultSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  defaultValue: { color: colors.text, fontWeight: '800', fontSize: 16 },
  defaultSelectedValue: { color: '#FFFFFF' },
  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 9, marginBottom: 12 },
  progressValue: { color: colors.primary, fontWeight: '800' },
  progressLabel: { color: colors.textMuted, fontSize: 13, writingDirection: 'rtl' },
  saveButton: { marginTop: 20, height: 56, borderRadius: 17, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  saveText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800', writingDirection: 'rtl' },
  pressed: { opacity: 0.72 },
});
