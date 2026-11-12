import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonAlert, useIonRouter } from '@ionic/react';
import { useState, useEffect } from 'react';
import { informationCircleOutline } from 'ionicons/icons';
import './StartPage.css'

import translation from '../data/translation.json'
import InstructionsModal from '../components/InstructionsModal';


interface StartPageProps {
  language: 'en' | 'no';
  setLanguage: (language: 'en' | 'no') => void;
  hasSeenInstructions: boolean;
  setHasSeenInstructions: (value: boolean) => void;
  word: string;
  streak: number;
  startNewGame: () => void;
}

const StartPage = ({
  language,
  setLanguage,
  hasSeenInstructions,
  setHasSeenInstructions,
  word,
  streak,
  startNewGame
}: StartPageProps) => {

  const text = translation[language];
  const router = useIonRouter();

  const [showInstructions, setShowInstructions] = useState(false);
  const [showNewGameAlert, setShowNewGameAlert] = useState(false);
  const [showLanguageAlert, setShowLanguageAlert] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<'en' | 'no' | null>(null);
  const hasExistingGame = word !== '';

  const handleLanguageChange = (newLanguage: 'en' | 'no') => {
    if (newLanguage === language) return;

    if (streak > 0) {
      setPendingLanguage(newLanguage);
      setShowLanguageAlert(true);
    } else {
      setLanguage(newLanguage);
    }
  };

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
              className="header-button"
              aria-label={text.instructions}
              onClick={() => setShowInstructions(true)}
            >
              <IonIcon icon={informationCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <div className="start-content">
          <h1> {text.title} </h1>
          <p> {text.subtitle} </p>
        </div>

        <img
          src="/images/gb-winner.png"
          alt="Gingerbread man"
          className="start-gingerbread">
        </img>

        <div className='start-content'>
          <p> {text.chooseLanguage} </p>
          <IonButton
            fill={language === 'no' ? 'outline' : 'solid'}
            onClick={() => handleLanguageChange('no')}>
            Norsk
          </IonButton>

          <IonButton
            fill={language === 'en' ? 'outline' : 'solid'}
            onClick={() => handleLanguageChange('en')}>
            English
          </IonButton>

          {!hasExistingGame || streak === 0 ? (
            <IonButton
              routerLink="/game"
              routerDirection='forward'
              onClick={startNewGame}
            >
              {text.play}
            </IonButton>
          ) : (
            <>
              <p>🎁 {text.streak}: {streak}</p>

              <IonButton
                fill="solid"
                routerLink="/game"
                routerDirection='forward'
              >
                {text.continue}
              </IonButton>

              <IonButton
                fill="outline"
                onClick={() => setShowNewGameAlert(true)}
              >
                {text.newGame}
              </IonButton>
            </>
          )}
        </div>

      </IonContent>

      <IonAlert
        className="alert"
        isOpen={showNewGameAlert}
        onDidDismiss={() => setShowNewGameAlert(false)}
        header={text.restartTitle}
        message={text.restartWarning}
        buttons={[
          {
            text: text.cancel,
            role: 'cancel'
          },
          {
            text: text.confirm,
            handler: () => {
              startNewGame();
              router.push('/game', 'forward')
            }
          }
        ]}
      />

      <IonAlert
        className="alert"
        isOpen={showLanguageAlert}
        onDidDismiss={() => setShowLanguageAlert(false)}
        header={text.languageChangeTitle}
        message={text.languageChangeWarning}
        buttons={[
          {
            text: text.cancel,
            role: 'cancel'
          },
          {
            text: text.confirm,
            handler: () => {
              if (pendingLanguage) {
                setLanguage(pendingLanguage);
              }
              setPendingLanguage(null);
            }
          }
        ]}
      />

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