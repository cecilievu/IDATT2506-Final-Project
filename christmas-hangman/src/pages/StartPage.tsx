import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

interface StartPageProps {
    language: 'en' | 'no';
    setLanguage: (language: 'en' | 'no') => void;
}

const StartPage = ({ language, setLanguage }: StartPageProps) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Christmas Hangman</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h1> Christmas Hangman </h1>
                <p> Get ready for a festive game of Hangman! </p>
                <p> Choose your language: </p>

                <IonButton 
                fill = {language === 'no' ? 'outline' : 'solid'}
                onClick={() => setLanguage('no')}>
                    Norsk
                </IonButton>

                <IonButton 
                fill = {language === 'en' ? 'outline' : 'solid'}
                onClick={() => setLanguage('en')}>
                    English
                </IonButton>

                {/* legge til spilleregler her og play knapp */}

                <IonButton routerLink = "/game">
                    START GAME
                </IonButton>
                
            </IonContent>
        </IonPage>
    );
};

export default StartPage;