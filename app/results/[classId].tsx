import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/src/components/Screen';
import { classes, mockResults } from '@/src/data/mock';
import { colors } from '@/src/theme/colors';

export default function ResultsScreen() {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const schoolClass = classes.find((item) => item.id === classId) ?? classes[0];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>رجوع</Text></Pressable>
          <View style={styles.heading}>
            <Text style={styles.title}>نتائج الدورة</Text>
            <Text style={styles.subtitle}>{schoolClass.name} · الدورة الأولى</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryValue}>{schoolClass.studentCount}</Text>
          <View style={styles.summaryTextWrap}>
            <Text style={styles.summaryTitle}>النتائج الحالية</Text>
            <Text style={styles.summaryText}>المعدل الإجمالي محسوب على سلم 0 إلى 3.</Text>
          </View>
        </View>

        {mockResults.map((result) => (
          <View key={result.studentId} style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.overallBadge}><Text style={styles.overall}>{result.overall.toFixed(2)}</Text><Text style={styles.outOf}>/3</Text></View>
              <Text style={styles.studentName}>{result.name}</Text>
            </View>
            <View style={styles.metrics}>
              <Metric label="مشاركة" value={result.participation} />
              <Metric label="تأخر" value={result.punctuality} />
              <Metric label="واجب" value={result.homework} />
              <Metric label="سلوك" value={result.behavior} />
              <Metric label="دفتر" value={result.notebook} />
            </View>
          </View>
        ))}

        <Pressable style={({ pressed }) => [styles.closePeriod, pressed && styles.pressed]}>
          <Text style={styles.closePeriodText}>غلق الدورة</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value.toFixed(1)}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 },
  heading: { flex: 1, alignItems: 'flex-end' },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, writingDirection: 'rtl' },
  subtitle: { marginTop: 5, color: colors.textMuted, fontSize: 13, writingDirection: 'rtl' },
  back: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 11, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  backText: { color: colors.primary, fontWeight: '700' },
  summary: { backgroundColor: colors.primary, borderRadius: 21, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  summaryValue: { color: '#FFFFFF', fontSize: 28, fontWeight: '900' },
  summaryTextWrap: { alignItems: 'flex-end' },
  summaryTitle: { color: '#FFFFFF', fontWeight: '800', fontSize: 17, writingDirection: 'rtl' },
  summaryText: { color: '#DCE8F0', fontSize: 12, marginTop: 5, writingDirection: 'rtl' },
  resultCard: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 11 },
  resultHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  studentName: { fontSize: 16, fontWeight: '800', color: colors.text, writingDirection: 'rtl' },
  overallBadge: { flexDirection: 'row', alignItems: 'baseline', backgroundColor: colors.primarySoft, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  overall: { color: colors.primary, fontWeight: '900', fontSize: 17 },
  outOf: { color: colors.textMuted, fontSize: 11, marginLeft: 2 },
  metrics: { flexDirection: 'row', justifyContent: 'space-between', gap: 5, marginTop: 15 },
  metric: { flex: 1, backgroundColor: colors.surfaceMuted, borderRadius: 11, paddingVertical: 8, alignItems: 'center' },
  metricValue: { fontWeight: '800', color: colors.text },
  metricLabel: { marginTop: 3, color: colors.textMuted, fontSize: 10, writingDirection: 'rtl' },
  closePeriod: { height: 55, borderRadius: 16, backgroundColor: colors.text, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  closePeriodText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', writingDirection: 'rtl' },
  pressed: { opacity: 0.72 },
});
