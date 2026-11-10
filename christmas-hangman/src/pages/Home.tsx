import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

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

        <IonButton onClick={() => setGameStarted(true)}>
          Start Game
        </IonButton>
        {gameStarted && <p>Game started! Have fun!</p>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
