import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/src/theme/colors';
import type { SchoolClass } from '@/src/data/mock';

type Props = {
  item: SchoolClass;
  onPress: () => void;
};

export function ClassCard({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.chevronWrap}>
        <Text style={styles.chevron}>‹</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>{item.level} · {item.studentCount} تلميذاً</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 88,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: { opacity: 0.72 },
  content: { flex: 1, alignItems: 'flex-end' },
  name: { fontSize: 19, fontWeight: '700', color: colors.text, writingDirection: 'rtl' },
  meta: { marginTop: 7, fontSize: 13, color: colors.textMuted, writingDirection: 'rtl' },
  chevronWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: { fontSize: 27, color: colors.primary, lineHeight: 29 },
});
