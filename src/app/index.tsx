import { useFonts } from 'expo-font';
import { Redirect } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from "react-native";

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Ionicons: require('@/assets/fonts/Ionicons.ttf'),
  });
    useEffect(() => {
      Animated.sequence([
        // Phase 1: Fade In
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Optional: Stay visible for a moment
        Animated.delay(1000),
        // Phase 2: Fade Out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsReady(true); // Now we "redirect" to the Stack
      });
    }, []);
    
  return (
    !isReady && !fontsLoaded ? (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.welcomeText}>Welcome to my portfolio!</Text>
      </Animated.View>
    ) : (
      <Redirect href="/(tabs)" />
    )
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  welcomeText: { fontSize: 30, fontWeight: 'bold' }
});