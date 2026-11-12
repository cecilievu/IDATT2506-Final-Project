import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import './Home.css';

import Keyboard from '../components/Keyboard';
import WordDisplay from '../components/WordDisplay';
import GingerbreadMan from '../components/GingerbreadMan';
import words from '../data/words.json';

interface HomeProps {
  language: 'en' | 'no'
}

const MAX_WRONG_GUESSES = 6;

const Home = ({language}: HomeProps) => {

  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const gameReady = word !== '';

  const wordList = words[language];

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
    if (gameOver ||guessedLetters.includes(letter)) {
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
          <IonTitle>Christmas Hangman</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonButton routerLink="/" fill="outline">
        BACK
        </IonButton>

        <h1> Christmas Hangman </h1>

        {gameReady && (
          <GingerbreadMan 
            wrongGuesses={wrongGuesses} 
            hasWon={hasWon} 
          />
        )}
        
        {gameReady && (
          <WordDisplay word={word} guessedLetters={guessedLetters} />
        )}

        {gameReady &&(
          <p> 
            Wrong guesses: {wrongGuesses} / {MAX_WRONG_GUESSES} 
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

        {hasWon && <p> Congratulations! You've guessed the word! :) </p>}
        {hasLost && <p> Game over :( The word was: {word} </p>}

        {gameOver && (
          <IonButton onClick={startGame}>
            Play again
          </IonButton>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Home;
