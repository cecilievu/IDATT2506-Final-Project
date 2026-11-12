import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import './Game.css';

import Keyboard from '../components/Keyboard';
import WordDisplay from '../components/WordDisplay';
import GingerbreadMan from '../components/GingerbreadMan';
import InstructionsModal from '../components/InstructionsModal';
import words from '../data/words.json';
import translation from '../data/translation.json';

interface GameProps {
  language: 'en' | 'no';
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  guessedLetters: string[];
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  wrongGuesses: number;
  setWrongGuesses: React.Dispatch<React.SetStateAction<number>>;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
}

const MAX_WRONG_GUESSES = 6;

const Game = ({
  language,
  word,
  setWord,
  guessedLetters,
  setGuessedLetters,
  wrongGuesses,
  setWrongGuesses,
  streak,
  setStreak
}: GameProps) => {

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

  const guessLetter = (letter: string) => {
    if (gameOver || guessedLetters.includes(letter)) {
      return;
    }

    const updatedGuesses = [...guessedLetters, letter];
    setGuessedLetters(updatedGuesses);

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);

      if (newWrongGuesses >= MAX_WRONG_GUESSES) {
        setStreak(0);
      }
    } else {
      const wonNow = word.split('').every(
        char => char === ' ' || updatedGuesses.includes(char)
      );

      if (wonNow) {
        setStreak(previous => previous + 1);
      }
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
              className="header-button"
              routerLink="/"
              routerDirection='back'
            >
              {text.back}
            </IonButton>
          </IonButtons>

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

        <div className="game-content">
          {gameReady && (
            <GingerbreadMan
              wrongGuesses={wrongGuesses}
              hasWon={hasWon}
            />
          )}
        </div>

        <div className="game-content1">
          {gameReady && (
            <WordDisplay word={word} guessedLetters={guessedLetters} />
          )}

          {gameReady && (
            <p>
              {text.wrongGuesses}: {wrongGuesses} / {MAX_WRONG_GUESSES}
            </p>
          )}

          {gameReady && (
            <p>🎁 {text.streak}: {streak}</p>
          )}

        </div>

        {gameReady && (
          <Keyboard
            onGuess={guessLetter}
            guessedLetters={guessedLetters}
            gameOver={gameOver}
            language={language}
          />
        )}

        {gameOver && (
          <IonButton
            className='restart-button'
            onClick={startGame}
          >
            {text.playAgain}
          </IonButton>
        )}

        {gameOver && (
          <div className='game-content2'>
            {hasWon && <p> {text.win} </p>}
            {hasLost && <p> {text.lose}: {word} </p>}
          </div>
        )}

      </IonContent>

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        language={language}
      />
    </IonPage>
  );
};

export default Game;
