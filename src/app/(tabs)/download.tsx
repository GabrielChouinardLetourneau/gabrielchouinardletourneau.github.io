import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function DownloadScreen() {
    useEffect(() => {
        downloadResume();
    }, []);

    const downloadResume = async () => {
        try {
            const response = await fetch('YOUR_RESUME_PDF_URL');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'resume.pdf';
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 16 }}>Downloading resume...</Text>
        </View>
    );
}