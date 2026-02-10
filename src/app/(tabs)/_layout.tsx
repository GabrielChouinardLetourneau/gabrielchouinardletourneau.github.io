import { HapticTab } from '@/src/components/haptic-tab';
import { ThemedText } from '@/src/components/themed-text';
import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/data/hooks/use-color-scheme';
import { useIsLargeScreen } from '@/src/data/hooks/use-different-screens';
import { copyFile } from '@/src/utils/copyFile';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import documentDirectory from 'expo-file-system';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, TouchableOpacity } from 'react-native';


const downloadAndOpenPDF = async () => {

    if (Platform.OS === 'web') {
      const asset = Asset.fromModule(require('@/assets/documents/resume.pdf'));
      await asset.downloadAsync(); // Ensure asset is available locally
      // On web, the .localUri is already a web-accessible URL
      // We can use the standard JS method or Linking.openURL
      const link = document.createElement('a');
      link.href = asset.localUri ?? '';
      link.setAttribute('download', 'resume_Gabriel_CL.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      try {
        // 1. Get the local asset object from the module require
        const assetModule = require('@/assets/documents/resume.pdf');
        const asset = Asset.fromModule(assetModule);
        // 2. Ensure the asset is downloaded to the local cache directory
        if (!asset.localUri) {
          await asset.downloadAsync();
        }

        // 3. Define the destination URI in the persistent document directory
        const destinationUri = `${documentDirectory}resume.pdf`;

        // 4. Copy the file from the cache to the persistent directory
        // This is necessary because cached files can be cleared by the OS
        await copyFile(asset.localUri!, destinationUri);

        // 5. Optionally, prompt the user to open/share the file
        if (Platform.OS === 'ios' || (Platform.OS === 'android' && await Sharing.isAvailableAsync())) {
            await Sharing.shareAsync(destinationUri, { mimeType: 'application/pdf' });
        } else {
            Alert.alert("File saved", `PDF saved to: ${destinationUri}. You can access it via the device's file explorer.`);
        }

      } catch (error) {
        console.error("Error downloading or saving PDF:", error);
        Alert.alert("Error", "Failed to download or save the PDF file.");
      }
  }
};

const DownloadResumeButton = (isLargeScreen: boolean) => {

  return (
    <TouchableOpacity onPress={downloadAndOpenPDF} style={[styles.webDownloadButton, isLargeScreen ? styles.pushDownloadButton : styles.mobileDownloadButton]}>
      <ThemedText style={styles.downloadButtonText}>Download Resume</ThemedText>
    </TouchableOpacity>
  )
}


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLargeScreen, isBigScreen } = useIsLargeScreen();
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].background,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({ 
          default: { height: 70, paddingBottom: 10 }, 
          ios: { position: 'absolute', height: 80, paddingBottom: 20 },
          web: { display: 'flex', minwidth: 100 }, 
        }),
        tabBarItemStyle: Platform.select({ web: { marginVertical: 5, borderRadius: 40, display: 'flex', justifyContent: 'space-between' } }),
        tabBarPosition: Platform.select({ web: isBigScreen ? 'left' : 'bottom', default: 'bottom' }),
        tabBarVariant: Platform.select({ android: 'material' }),
        tabBarHideOnKeyboard: true,
        animation: 'fade',
        transitionSpec: { animation: 'timing', config: { duration: 250 }}
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'About me',
          tabBarIcon: ({ color }) => fontsLoaded ? <Ionicons name="person" size={32} color={color} /> : <ActivityIndicator size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="experience"
        options={{
          title: 'Experience',
          tabBarIcon: ({ color }) => fontsLoaded ? <Ionicons name="briefcase" size={32} color={color} /> : <ActivityIndicator size={32} color={color} />,
          tabBarItemStyle: isLargeScreen ? styles.pushDownloadButton : styles.defaultMobileTabBarStyle,
        }}
      />
      <Tabs.Screen
        name="download"
        options={{
          tabBarButton: () => DownloadResumeButton(isLargeScreen),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            console.log('Download Resume pressed');
          }
        }}        
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  webDownloadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    backgroundColor: '#0a7ea4',
    borderRadius: 10,
    flexGrow: 1,
    padding: 10,
    marginTop: 'auto'
  },
  mobileDownloadButton: {
    marginRight: 10,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pushDownloadButton: {
    flexGrow: 1,
  },
  defaultMobileTabBarStyle: {
    borderRadius: 40,
    overflow: 'visible',
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
  },
});