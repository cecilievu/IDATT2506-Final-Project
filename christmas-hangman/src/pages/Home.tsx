import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';

import Keyboard from '../components/Keyboard';
import WordDisplay from '../components/WordDisplay';
import GingerbreadMan from '../components/GingerbreadMan';

const words = [
  'SNOW',
  'SANTA',
  'REINDEER',
  'PRESENT',
  'CHRISTMAS',
  'COOKIE'
];

const MAX_WRONG_GUESSES = 6;

const Home: React.FC = () => {

  const [gameStarted, setGameStarted] = useState(false);
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGameStarted(true);
    setGuessedLetters([]);
    setWrongGuesses(0);
  }

  const guessLetter = (letter: string) => {
    if (gameOver ||guessedLetters.includes(letter)) {
      return;
    }

    setGuessedLetters(previous => [...previous, letter]);
    if (!word.includes(letter)) {
      setWrongGuesses(previous => previous + 1);
    }
  };

  const hasWon = word.length > 0 && word.split('').every(letter => guessedLetters.includes(letter));
  const hasLost = wrongGuesses >= MAX_WRONG_GUESSES;
  const gameOver = hasWon || hasLost;

  const isHappy = hasWon || wrongGuesses === 0;
  const isShocked = !hasWon && wrongGuesses > 0 && !hasLost;
  const isSad = hasLost;


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
          <GingerbreadMan 
            wrongGuesses={wrongGuesses} 
            hasWon={hasWon} 
          />
        )}
        
        {gameStarted && (
          <WordDisplay word={word} guessedLetters={guessedLetters} />
        )}

        {gameStarted &&(
          <p> 
            Wrong guesses: {wrongGuesses} / {MAX_WRONG_GUESSES} 
          </p>
        )}

        {gameStarted && (
          <Keyboard 
          onGuess={guessLetter} 
          guessedLetters={guessedLetters}
          gameOver={gameOver}
         />
        )}

        {hasWon && <p> Congratulations! You've guessed the word! :) </p>}
        {hasLost && <p> Game over :( The word was: {word} </p>}

      </IonContent>
    </IonPage>
  );
};

export default Home;
