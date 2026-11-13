import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import './InstructionsModal.css'

import translation from '../data/translation.json';

interface InstructionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: 'en' | 'no';
}

const InstructionsModal = ({ isOpen, onClose, language }: InstructionsModalProps) => {

    const text = translation[language];

    return (
        <IonModal
            className="instructions-modal"
            isOpen={isOpen}
            onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle> {text.instructions} </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <p className="instructions-text">
                    {text.instructionsText}
                </p>

                <IonButton
                    className="got-it-button"
                    expand="block"
                    onClick={onClose}>
                    {text.close}
                </IonButton>
            </IonContent>
        </IonModal>
    )
};

export default InstructionsModal;