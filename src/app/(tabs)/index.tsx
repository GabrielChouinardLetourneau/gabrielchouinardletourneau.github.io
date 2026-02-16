import { Image } from 'expo-image';
import { StyleSheet, useColorScheme } from 'react-native';

import { ExternalLink } from '@/src/components/external-link';
import { HelloWave } from '@/src/components/hello-wave';
import ParallaxScrollView from '@/src/components/parallax-scroll-view';
import { ThemedList } from '@/src/components/themed-list';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { Header } from '@/src/components/ui/header';
import { skills, techStack } from '@/src/constants/general';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    
    return (
        <>
            <Header />
            
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
                headerImage={
                    <Ionicons name="person" size={310} style={styles.headerImage}/>
                }>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Gabriel Chouinard-Letourneau</ThemedText>
                    <HelloWave />


                </ThemedView>

                <Image
                    source={require('@/assets/images/gcl.jpg')}
                    style={styles.gcl}
                />

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Mobile Developer focused on maintainability and scalability</ThemedText>
                    <ThemedText>
                        With over 3 years of consulting experience and 4 years in hands-on mobile development. I'm passionate about enhancing mobile applications through bug fixing, performance improvements, and modernizing dependencies by migrating libraries and frameworks.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.stepContainer}>

                <ThemedText type="subtitle">Tech Stack</ThemedText>
                    <ThemedList items={techStack} style={styles.listStyle} />
                </ThemedView>

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Skills</ThemedText>
                    <ThemedList 
                        items={skills} 
                        style={styles.listStyle} 
                    />
                </ThemedView>

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Contact</ThemedText>
                    <ThemedText style={styles.contactContainer}>
                        <Ionicons name="at" color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} size={32} />
                        <ThemedText type="link" style={styles.linkContactContainer}>  
                            <Link href="mailto:chouinardletourneaug@gmail.com" style={styles.linkContact}>
                                chouinardletourneaug@gmail.com
                            </Link>
                        </ThemedText>
                    </ThemedText>
                    <ThemedText style={styles.contactContainer}>
                        <Image source={colorScheme === 'dark' ? require('@/assets/images/linkedin.png') : require('@/assets/images/linkedin-dark.png')} style={styles.logo} />
                        <ThemedText type="link" style={styles.linkContactContainer}>
                            <ExternalLink href="https://www.linkedin.com/in/gabriel-chouinard-letourneau/" style={styles.linkContact}>
                                linkedin.com/in/gabriel-chouinard-letourneau
                            </ExternalLink>
                        </ThemedText>
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Coming soon on </ThemedText>

                    <ThemedText style={styles.comingSoonContainer}>
                        <ThemedView style={[styles.googlePlayLogoContainer, { backgroundColor: colorScheme === 'dark' ? '#FFFFFF' : undefined}]}>
                            <Image source={require('@/assets/images/google-play.png')} style={styles.googlePlayLogo} />
                        </ThemedView>
                        <Image source={require('@/assets/images/app-store.png')} style={styles.appStoreLogo} />
                    </ThemedText>
                </ThemedView>


                <ThemedView style={styles.poweredByContainer}>
                    <ThemedText type="subtitle">Powered by</ThemedText>
                    <ThemedView style={styles.poweredByLogosContainer}>
                        <Image source={colorScheme === 'dark' ? require('@/assets/images/expo.png') : require('@/assets/images/expo-dark.png')} style={styles.poweredByExpoLogo} />
                        <Image source={require('@/assets/images/react-native.svg')} style={styles.poweredByReactNativeLogo} />
                    </ThemedView>
                </ThemedView>
            </ParallaxScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    gcl: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    listStyle: {
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    linkContact: {
        fontWeight: 'bold',
    },
    linkContactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logo: {
        width: 32,
        height: 32,
    },
    comingSoonContainer: {
        width: 'auto'
    },
    googlePlayLogoContainer: {
        marginRight: 20,
        borderRadius: 10,
        padding: 5
    },
    googlePlayLogo: {
        width: 253,
        height: 50,
    
    },
    appStoreLogo: {
        width: 50,
        height: 50
    },
    poweredByContainer: {
        marginTop: 100,
    },
    poweredByLogosContainer: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    poweredByExpoLogo: {
        width: 124,
        height: 35,    
    },
    poweredByReactNativeLogo: {
        width: 80,
        height: 80,
    },
});
