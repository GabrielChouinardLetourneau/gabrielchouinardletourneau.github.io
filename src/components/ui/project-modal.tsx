import { ExternalLink } from '@/src/components/external-link';
import { useIsLargeScreen } from '@/src/data/hooks/use-different-screens';
import { ExternalPathString } from 'expo-router';
import {
    Image,
    ImageSourcePropType,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

interface ProjectModalProps {
    visible: boolean;
    data: ProjectData;
    close: () => void
}

export interface ProjectData {
    title?: string;
    description?: string;
    secondaryDescription?: string;
    technologies?: string[];
    imageSrc?: ImageSourcePropType;
    androidLink?: ExternalPathString;
    iosLink?: ExternalPathString;
    caseStudyLink?: ExternalPathString;
    prLink?: ExternalPathString;
    commitsLink?: ExternalPathString;
}

export const ProjectModal = (
    { visible, data, close }: ProjectModalProps) => {
    const isLargeScreen = useIsLargeScreen();

    return (
        <TouchableWithoutFeedback onPress={() => close()}>
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={close}
            >
                    <View style={styles.overlay}>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.closeButton} onPress={close}>
                                <Text style={styles.closeText}>✕</Text>
                            </TouchableOpacity>

                            <ScrollView contentContainerStyle={styles.content}>
                                <Text style={styles.title}>{data.title}</Text>
                                <Text style={styles.description}>{data.description}</Text>
                                {data.secondaryDescription && (
                                    <Text style={styles.description}>{data.secondaryDescription}</Text>
                                )}

                                {data.technologies && data.technologies.length > 0 && (
                                    <View style={styles.technologiesContainer}>
                                        <Text style={styles.technologiesTitle}>Technologies</Text>
                                        <View style={styles.tagContainer}>
                                            {data.technologies.map((tech, index) => (
                                                <View key={index} style={styles.tag}>
                                                    <Text style={styles.tagText}>{tech}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {data.imageSrc && (
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={data.imageSrc}
                                            style={{...styles.image, height: isLargeScreen ? 500 : 200 }}
                                        />
                                    </View>
                                )}

                                {/* Links */}
                                <View style={styles.linksContainer}>
                                    {data.androidLink && (
                                        <ExternalLink href={data.androidLink} style={[styles.externalLink, styles.androidLink]}>
                                            View on Google Play
                                        </ExternalLink>
                                    )}
                                    {data.iosLink && (
                                        <ExternalLink href={data.iosLink} style={[styles.externalLink, styles.iosLink]}>
                                            View on App Store
                                        </ExternalLink>
                                    )}
                                    {data.caseStudyLink && (
                                        <ExternalLink href={data.caseStudyLink} style={styles.externalLink}>
                                            Read Case Study
                                        </ExternalLink>
                                    )}
                                    {data.prLink && (
                                        <ExternalLink href={data.prLink} style={styles.externalLink}>
                                            PR contributions
                                        </ExternalLink>
                                    )}
                                    {data.commitsLink && (
                                        <ExternalLink href={data.commitsLink} style={styles.externalLink}>
                                            Commits contributions
                                        </ExternalLink>
                                    )}
                                </View>

                            </ScrollView>
                        </View>
                    </View>

            </Modal>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingVertical: 20,
        maxHeight: '90%',
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    closeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000',
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
    },
    technologiesContainer: {
        marginTop: 20,
    },
    technologiesTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#000',
    },
    imageContainer: {
        marginVertical: 20,
        maxWidth: '100%',
    },
    image: {
        width: 'auto',
        borderRadius: 10,
    },
    linksContainer: {
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    externalLink: {
        backgroundColor: '#0a7ea4',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginRight: 10,
        borderRadius: 10,
        fontWeight: '600',
        width: 200,
    },
    androidLink: {
        backgroundColor: '#3DDC84',
        color: '#000',
    },
    iosLink: {
        backgroundColor: '#979797',
        color: '#000',
        borderColor: '#000',
    },
    tagText: {
        fontSize: 14,
        color: '#333',
    },
});