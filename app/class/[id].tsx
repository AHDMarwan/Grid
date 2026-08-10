import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/src/components/Screen';
import { classes, recentSessions, students } from '@/src/data/mock';
import { colors } from '@/src/theme/colors';

export default function ClassDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const schoolClass = classes.find((item) => item.id === id) ?? classes[0];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.smallButton}><Text style={styles.smallButtonText}>رجوع</Text></Pressable>
          <View style={styles.heading}>
            <Text style={styles.title}>{schoolClass.name}</Text>
            <Text style={styles.subtitle}>{schoolClass.studentCount} تلميذاً · {schoolClass.level}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push({ pathname: '/session/new', params: { classId: schoolClass.id } })}
          style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}
        >
          <Text style={styles.primaryActionTitle}>+ حصة جديدة</Text>
          <Text style={styles.primaryActionText}>فتح شبكة تقييم التلاميذ لهذه الحصة</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push(`/results/${schoolClass.id}`)}
          style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryActionValue}>عرض</Text>
          <View style={styles.secondaryContent}>
            <Text style={styles.secondaryTitle}>نتائج الدورة</Text>
            <Text style={styles.secondaryText}>المعدلات الحالية حسب المعايير الخمسة</Text>
          </View>
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionCount}>{recentSessions.length}</Text>
          <Text style={styles.sectionTitle}>الحصص السابقة</Text>
        </View>

        <View style={styles.listCard}>
          {recentSessions.map((session, index) => (
            <View key={session.id} style={[styles.sessionRow, index !== recentSessions.length - 1 && styles.rowBorder]}>
              <Text style={styles.sessionDate}>{session.date}</Text>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionLabel}>{session.label}</Text>
                <Text style={styles.sessionMeta}>تم حفظ التقييمات</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionCount}>{students.length}</Text>
          <Text style={styles.sectionTitle}>معاينة التلاميذ</Text>
        </View>
        <View style={styles.listCard}>
          {students.map((student, index) => (
            <View key={student.id} style={[styles.studentRow, index !== students.length - 1 && styles.rowBorder]}>
              <Text style={styles.studentCode}>{student.massarCode}</Text>
              <Text style={styles.studentName}>{student.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 36 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 22 },
  heading: { flex: 1, alignItems: 'flex-end' },
  title: { fontSize: 25, fontWeight: '800', color: colors.text },
  subtitle: { marginTop: 5, color: colors.textMuted, fontSize: 13, writingDirection: 'rtl' },
  smallButton: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 11, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  smallButtonText: { color: colors.primary, fontWeight: '700' },
  primaryAction: { backgroundColor: colors.primary, borderRadius: 22, padding: 20, alignItems: 'flex-end', marginBottom: 12 },
  primaryActionTitle: { color: '#FFFFFF', fontWeight: '800', fontSize: 20, writingDirection: 'rtl' },
  primaryActionText: { color: '#DCE8F0', marginTop: 7, fontSize: 13, writingDirection: 'rtl' },
  secondaryAction: { backgroundColor: colors.surface, borderRadius: 18, padding: 17, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  secondaryContent: { flex: 1, alignItems: 'flex-end' },
  secondaryTitle: { color: colors.text, fontWeight: '700', fontSize: 16, writingDirection: 'rtl' },
  secondaryText: { color: colors.textMuted, fontSize: 12, marginTop: 5, writingDirection: 'rtl' },
  secondaryActionValue: { color: colors.primary, fontWeight: '800' },
  pressed: { opacity: 0.72 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 9, marginTop: 28, marginBottom: 11 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text, writingDirection: 'rtl' },
  sectionCount: { minWidth: 28, textAlign: 'center', paddingVertical: 3, paddingHorizontal: 7, borderRadius: 9, overflow: 'hidden', backgroundColor: colors.primarySoft, color: colors.primary, fontWeight: '700' },
  listCard: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  sessionRow: { minHeight: 67, paddingHorizontal: 16, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sessionInfo: { alignItems: 'flex-end' },
  sessionLabel: { fontWeight: '700', color: colors.text, writingDirection: 'rtl' },
  sessionMeta: { color: colors.textMuted, fontSize: 12, marginTop: 4, writingDirection: 'rtl' },
  sessionDate: { color: colors.primary, fontWeight: '700' },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  studentRow: { minHeight: 55, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  studentName: { fontWeight: '700', color: colors.text, writingDirection: 'rtl' },
  studentCode: { color: colors.textMuted, fontSize: 12 },
});
