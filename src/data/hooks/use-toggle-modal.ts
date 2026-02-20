import { ProjectData } from '@/src/components/ui/project-modal';
import { useCallback, useState } from 'react';

export function useToggleModal() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({} as ProjectData);

    const open = (data: ProjectData) => {
        setModalData(prev => prev = data);
        setModalVisible(true);
    };

    const close = () => {
        setModalVisible(false);
    };

    const toggle = useCallback(() => {
        setModalVisible(prev => !prev);
    }, []);

    return { modalVisible, open, close, toggle, modalData };
};