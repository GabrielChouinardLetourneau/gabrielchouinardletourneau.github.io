import { useIsLargeScreen } from "@/src/data/hooks/use-different-screens";
import { ButtonProps, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";


export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  newParagraph?: boolean;
};

export function ThemedButton({
    title,
    onPress,
    lightColor,
    darkColor,
    ...rest }: ThemedButtonProps) { 
    const { isMediumScreen, isSmallScreen } = useIsLargeScreen();


    return (        
        <TouchableOpacity onPress={onPress} style={styles.button} {...rest}>
            <ThemedText type="button">
                {title}
            </ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        minWidth: 100,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#0a7ea4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
    }
});