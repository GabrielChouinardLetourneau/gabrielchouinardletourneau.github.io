import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

interface TimelineItem {
    id: string;
    title: string;
    description: string;
    date: string;
    icon?: React.ReactNode;
}

interface TimelineProps {
    items: TimelineItem[];
    variant?: 'vertical' | 'horizontal';
}

export const Timeline: React.FC<TimelineProps> = ({
    items,
    variant = 'vertical',
}) => {
    

    return (
        <ThemedView style={[styles.container, variant === 'horizontal' ? styles.horizontal : styles.vertical]}>
            {items.map((item, index) => (
                <ThemedView key={item.id} style={styles.item}>
                    <ThemedView style={styles.marker}>
                        {item.icon || <ThemedView style={styles.dot} />}
                        {index < items.length - 1 && <ThemedView style={styles.line} />}
                    </ThemedView>
                    

                    <ThemedView style={styles.content}>
                        <ThemedText style={styles.title}>{item.title}</ThemedText>
                        <ThemedText style={styles.date}>{item.date}</ThemedText>
                        <ThemedText style={styles.description}>{item.description}</ThemedText>
                    </ThemedView>
                </ThemedView>
            ))}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 10,
    },
    horizontal: {
        flexDirection: 'row',
    },
    vertical: {
        flexDirection: 'column',
    },
    item: {
        flexDirection: 'row',
    },
    marker: {
        alignItems: 'center',
        marginRight: 12,
        top: 6,
        flexDirection: 'column',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0a7ea4',
    },
    content: {
        flex: 1,
        paddingBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
    },
    line: {
        width: 2,
        backgroundColor: '#dddddd7e',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default Timeline;