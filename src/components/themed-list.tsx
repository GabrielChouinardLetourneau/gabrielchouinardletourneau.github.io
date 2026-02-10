import { StyleSheet, TextStyle, View, ViewProps } from 'react-native';

import { ThemedText } from '@/src/components/themed-text';
import { useColorScheme } from '@/src/data/hooks/use-color-scheme.web';

export type ThemedListProps = ViewProps & {
  items: string[];
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  style?: TextStyle;
};


export function ThemedList({
  style,
  lightColor,
  darkColor,
  type = 'default',
  items,
  ...rest
}: ThemedListProps) {
  const colorScheme = useColorScheme();
  
  return (
    <View
      style={styles.container}
      {...rest}
    >
      {items.map((item, index) => (
        <ThemedText
          key={index}
          type={type}
          style={[styles.item, style, { backgroundColor: colorScheme === 'dark' ? '#FFF' : '#000', color: colorScheme === 'dark' ? '#000' : '#FFF' }]}
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
    width: 'auto',
    alignItems: 'center',
    marginHorizontal: 7,
    marginVertical: 4,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
});
