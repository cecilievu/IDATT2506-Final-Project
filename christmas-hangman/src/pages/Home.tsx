import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';

const words = [
  'SNOW',
  'SANTA',
  'REINDEER',
  'PRESENT',
  'CHRISTMAS',
  'COOKIE'
];

const Home: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [word, setWord] = useState('');

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGameStarted(true);
  }

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

        <IonButton onClick={startGame}>
          Start Game
        </IonButton>
        {gameStarted && (
          <p>
            {word.split('').map(() => '_').join(' ')}
          </p>
        )}
        {gameStarted && <p> Game started! Have fun! </p>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
