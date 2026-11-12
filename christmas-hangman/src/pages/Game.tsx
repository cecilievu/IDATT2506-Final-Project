import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import './Game.css';

import Keyboard from '../components/Keyboard';
import WordDisplay from '../components/WordDisplay';
import GingerbreadMan from '../components/GingerbreadMan';
import InstructionsModal from '../components/InstructionsModal';
import words from '../data/words.json';
import translation from '../data/translation.json';

interface HomeProps {
  language: 'en' | 'no'
}

const MAX_WRONG_GUESSES = 6;

const Home = ({ language }: HomeProps) => {

  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const gameReady = word !== '';

  const wordList = words[language];
  const text = translation[language]

  const startGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  useEffect(() => {
    startGame();
  }, [language]);

  const guessLetter = (letter: string) => {
    if (gameOver || guessedLetters.includes(letter)) {
      return;
    }

    setGuessedLetters(previous => [...previous, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses(previous => previous + 1);
    }
  };

  const hasWon = word.length > 0 && word.split('').every(letter => letter === ' ' || guessedLetters.includes(letter));
  const hasLost = wrongGuesses >= MAX_WRONG_GUESSES;
  const gameOver = hasWon || hasLost;


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>

          <IonButtons slot="start">
            <IonButton 
            routerLink="/"
            routerDirection='back'
            >
              {text.back}
            </IonButton>
          </IonButtons>

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

        {gameReady && (
          <GingerbreadMan
            wrongGuesses={wrongGuesses}
            hasWon={hasWon}
          />
        )}

        {gameReady && (
          <WordDisplay word={word} guessedLetters={guessedLetters} />
        )}

        {gameReady && (
          <p>
            {text.wrongGuesses}: {wrongGuesses} / {MAX_WRONG_GUESSES}
          </p>
        )}

        {gameReady && (
          <Keyboard
            onGuess={guessLetter}
            guessedLetters={guessedLetters}
            gameOver={gameOver}
            language={language}
          />
        )}

        {gameReady && (
          <IonButton onClick={startGame}>
            {gameOver ? text.playAgain : text.startOver}
          </IonButton>
        )}

        {hasWon && <p> {text.win} </p>}
        {hasLost && <p> {text.lose}: {word} </p>}

      </IonContent>
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        language={language}
      />
    </IonPage>
  );
};

export default Home;
