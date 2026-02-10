import { DimensionValue, StyleSheet, TextStyle, View, ViewProps } from 'react-native';

import { ThemedText } from '@/src/components/themed-text';
import { useThemeColor } from '@/src/data/hooks/use-theme-color';

export type ThemedListProps = ViewProps & {
  items: string[];
  lightColor?: string;
  darkColor?: string;
  numColumns?: number;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  style?: TextStyle;
};


export function ThemedList({
  style,
  lightColor,
  darkColor,
  numColumns = 1,
  type = 'default',
  items,
  ...rest
}: ThemedListProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const itemWidth = `${100 / numColumns}%`; 

  return (
    <View
      style={styles.container}
      {...rest}
    >
      {items.map((item, index) => (
        <ThemedText
          key={index}
          type={type}
          style={[styles.item, style, { width: itemWidth as DimensionValue }]}
        >
          {item}
        </ThemedText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  item: {
    alignItems: 'center',
    marginHorizontal: 7,
    marginVertical: 4,
  },
});
