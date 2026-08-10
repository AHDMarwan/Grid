import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/src/theme/colors';

export type Score = 0 | 1 | 2 | 3;

type Props = {
  label: string;
  value: Score | null;
  onChange: (score: Score) => void;
};

const scores: Score[] = [0, 1, 2, 3];

export function ScoreSelector({ label, value, onChange }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.buttons}>
        {scores.map((score) => {
          const selected = score === value;
          return (
            <Pressable
              key={score}
              onPress={() => onChange(score)}
              style={({ pressed }) => [styles.button, selected && styles.selected, pressed && styles.pressed]}
            >
              <Text style={[styles.value, selected && styles.selectedValue]}>{score}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    minWidth: 82,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    writingDirection: 'rtl',
  },
  buttons: { flexDirection: 'row', gap: 8 },
  button: {
    width: 39,
    height: 39,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  pressed: { opacity: 0.68 },
  value: { fontSize: 15, fontWeight: '700', color: colors.text },
  selectedValue: { color: '#FFFFFF' },
});
