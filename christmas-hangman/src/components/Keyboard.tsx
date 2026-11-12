import { IonButton } from '@ionic/react';

interface KeyboardProps {
  onGuess: (letter: string) => void;
  guessedLetters: string[];
  gameOver: boolean;
  language: 'en' | 'no';
}

const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const norwegianLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'.split('');

const Keyboard = ({ onGuess, guessedLetters, gameOver, language }: KeyboardProps) => {
  
  const letters = language === 'no' ? norwegianLetters : englishLetters;

  return (
    <div className="keyboard">
      {letters.map(letter => (
        <IonButton
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter) || gameOver}
        >
          {letter}
        </IonButton>
      ))}
    </div>
  );
};

export default Keyboard;