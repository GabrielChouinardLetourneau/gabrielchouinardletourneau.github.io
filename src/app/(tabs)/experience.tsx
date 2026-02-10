import ParallaxScrollView from '@/src/components/parallax-scroll-view';
import { ThemedButton } from '@/src/components/themed-button';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { ProjectData, ProjectModal } from '@/src/components/ui/project-modal';
import Timeline from '@/src/components/ui/timeline';
import { pastProjects, workExperience } from '@/src/constants/general';
import { Fonts } from '@/src/constants/theme';
import { useIsLargeScreen } from '@/src/data/hooks/use-different-screens';
import { useToggleModal } from '@/src/data/hooks/use-toggle-modal';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet } from 'react-native';

export default function AboutScreen() {
  const { open, close, modalVisible, modalData } = useToggleModal();
  const { isLargeScreen, isBigScreen } = useIsLargeScreen();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons 
          name="briefcase" 
          size={310} 
          style={styles.headerImage} />
      }
    >
      <ThemedView style={isLargeScreen ? styles.webContainer : styles.mobileContainer}>

    
        {/* WORK HISTORY */}
        <ScrollView style={isLargeScreen ? styles.webContentContainer : styles.mobileContentContainer}>
          <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
            Work history  
          </ThemedText>
          <Timeline
            variant='vertical'
            items={workExperience}
          />
        </ScrollView>

        {/* PAST PROJECTS */}
        <ScrollView style={isLargeScreen || isBigScreen ? styles.webContentContainer : styles.mobileContentContainer}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText
              type="title"
              style={{
                fontFamily: Fonts.rounded,
              }}>
              Explore my past projects
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.projectsButtonsContainer}>

            {pastProjects.map((item, index) => (
              <ThemedButton key={index} title={item.title} onPress={() => open(item as ProjectData)} />
            ))}

          </ThemedView>
          <ProjectModal visible={modalVisible} data={modalData} close={close} />
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  webContainer: {
    flexDirection: 'row', 
    flex: 1, 
  },
  mobileContainer: {
    flex: 1, 
  },
  webContentContainer: {
    flex: 1,
    padding: 20,
  },
  mobileContentContainer: {
    flex: 1,
    padding: 10,
    height: "100%",
  },
  projectsButtonsContainer: {
    marginTop: 20,
    gap: 10,
  },
  titleContainer: {

  },
});
