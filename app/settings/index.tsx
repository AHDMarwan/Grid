import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/src/components/Screen';
import { colors } from '@/src/theme/colors';

function SettingsRow({ title, description, action, onPress }: { title: string; description: string; action: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Text style={styles.action}>{action}</Text>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
    </Pressable>
  );
}

export default function SettingsScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>رجوع</Text></Pressable>
          <Text style={styles.title}>الإعدادات</Text>
        </View>

        <Text style={styles.sectionLabel}>السنة الدراسية</Text>
        <View style={styles.yearCard}>
          <Text style={styles.yearValue}>2026 / 2027</Text>
          <Text style={styles.yearLabel}>السنة الحالية</Text>
        </View>

        <Text style={styles.sectionLabel}>البيانات</Text>
        <View style={styles.group}>
          <SettingsRow
            title="استيراد ملف مسار"
            description="إنشاء الأقسام ولوائح التلاميذ تلقائياً من الملف."
            action="استيراد"
            onPress={() => Alert.alert('استيراد مسار', 'سيتم ربط Document Picker وقراءة الملف في مرحلة Massar Import.')}
          />
          <View style={styles.separator} />
          <SettingsRow
            title="نسخة احتياطية"
            description="حفظ نسخة من بيانات التطبيق على الهاتف."
            action="إنشاء"
            onPress={() => Alert.alert('النسخ الاحتياطي', 'سيتم ربط هذه الخاصية بعد SQLite.')}
          />
        </View>

        <Text style={styles.sectionLabel}>حول التطبيق</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Grid</Text>
          <Text style={styles.aboutText}>تطبيق محلي وبسيط لتتبع المشاركة والانضباط والواجبات والسلوك والدفتر.</Text>
          <Text style={styles.version}>الإصدار 0.1.0</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 36 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 26 },
  title: { fontSize: 25, fontWeight: '800', color: colors.text, writingDirection: 'rtl' },
  back: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 11, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  backText: { color: colors.primary, fontWeight: '700' },
  sectionLabel: { marginTop: 18, marginBottom: 9, textAlign: 'right', fontWeight: '800', color: colors.text, writingDirection: 'rtl' },
  yearCard: { backgroundColor: colors.primary, borderRadius: 19, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  yearValue: { color: '#FFFFFF', fontWeight: '800', fontSize: 17 },
  yearLabel: { color: '#D9E6EF', writingDirection: 'rtl' },
  group: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  row: { minHeight: 86, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14 },
  rowContent: { flex: 1, alignItems: 'flex-end' },
  rowTitle: { fontSize: 15, fontWeight: '700', color: colors.text, writingDirection: 'rtl' },
  rowDescription: { marginTop: 5, fontSize: 12, color: colors.textMuted, textAlign: 'right', lineHeight: 18, writingDirection: 'rtl' },
  action: { color: colors.primary, fontWeight: '800', fontSize: 13, writingDirection: 'rtl' },
  separator: { height: 1, backgroundColor: colors.border, marginHorizontal: 16 },
  pressed: { opacity: 0.68 },
  aboutCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border, alignItems: 'flex-end' },
  aboutTitle: { color: colors.primary, fontWeight: '800', fontSize: 21 },
  aboutText: { marginTop: 7, color: colors.textMuted, lineHeight: 21, textAlign: 'right', writingDirection: 'rtl' },
  version: { marginTop: 14, color: colors.textMuted, fontSize: 12, writingDirection: 'rtl' },
});
