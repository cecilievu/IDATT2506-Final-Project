import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { useState, useEffect } from 'react';

import translation from '../data/translation.json'
import InstructionsModal from '../components/InstructionsModal';
import { informationCircleOutline } from 'ionicons/icons';

interface StartPageProps {
  language: 'en' | 'no';
  setLanguage: (language: 'en' | 'no') => void;
  hasSeenInstructions: boolean;
  setHasSeenInstructions: (value: boolean) => void;
}

const StartPage = ({ language, setLanguage, hasSeenInstructions, setHasSeenInstructions }: StartPageProps) => {

  const text = translation[language];

  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (hasSeenInstructions) return;

    const timer = setTimeout(() => {
      setShowInstructions(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasSeenInstructions]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> {text.title} </IonTitle>

          <IonButtons slot="end">
            <IonButton
              aria-label={text.instructions}
              onClick={() => setShowInstructions(true)}
            >
              <IonIcon icon={informationCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1> {text.title} </h1>
        <p> {text.subtitle} </p>

        <img
        src="/images/gb-winner"
        alt="Gingerbread man"
        className="start-gingerbread">
        </img>
        <p> {text.chooseLanguage} </p>

        <IonButton
          fill={language === 'no' ? 'outline' : 'solid'}
          onClick={() => setLanguage('no')}>
          Norsk
        </IonButton>

        <IonButton
          fill={language === 'en' ? 'outline' : 'solid'}
          onClick={() => setLanguage('en')}>
          English
        </IonButton>

        <IonButton 
        routerLink="/game"
        routerDirection='forward'
        >
          {text.play}
        </IonButton>

      </IonContent>

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => {
          setShowInstructions(false);
          setHasSeenInstructions(true);
        }}
        language={language}
      />
    </IonPage>
  );
};

export default StartPage;