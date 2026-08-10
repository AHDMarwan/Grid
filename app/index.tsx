import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/src/components/Screen';
import { ClassCard } from '@/src/components/ClassCard';
import { classes } from '@/src/data/mock';
import { colors } from '@/src/theme/colors';

export default function HomeScreen() {
  return (
    <Screen>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        ListHeaderComponent={
          <>
            <View style={styles.topBar}>
              <Pressable onPress={() => router.push('/settings')} style={({ pressed }) => [styles.settings, pressed && styles.pressed]}>
                <Text style={styles.settingsText}>الإعدادات</Text>
              </Pressable>
              <View style={styles.brand}>
                <Text style={styles.title}>Grid</Text>
                <Text style={styles.subtitle}>تتبع التلاميذ</Text>
              </View>
            </View>

            <View style={styles.hero}>
              <Text style={styles.heroEyebrow}>السنة الدراسية 2026 / 2027</Text>
              <Text style={styles.heroTitle}>الأقسام المسندة</Text>
              <Text style={styles.heroText}>اختر قسماً لبدء حصة جديدة أو مراجعة نتائج الدورة.</Text>
            </View>
          </>
        }
        renderItem={({ item }) => <ClassCard item={item} onPress={() => router.push(`/class/${item.id}`)} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 32 },
  gap: { height: 12 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  brand: { alignItems: 'flex-end' },
  title: { fontSize: 26, fontWeight: '800', color: colors.primary },
  subtitle: { marginTop: 2, fontSize: 13, color: colors.textMuted, writingDirection: 'rtl' },
  settings: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  settingsText: { color: colors.primary, fontWeight: '700', writingDirection: 'rtl' },
  pressed: { opacity: 0.68 },
  hero: { backgroundColor: colors.primary, borderRadius: 24, padding: 22, marginBottom: 22, alignItems: 'flex-end' },
  heroEyebrow: { color: '#C7D7E3', fontSize: 12, writingDirection: 'rtl' },
  heroTitle: { color: '#FFFFFF', fontSize: 25, fontWeight: '800', marginTop: 8, writingDirection: 'rtl' },
  heroText: { color: '#E3EDF4', fontSize: 14, lineHeight: 22, marginTop: 9, textAlign: 'right', writingDirection: 'rtl' },
});
