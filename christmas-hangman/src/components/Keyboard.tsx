import { IonButton } from '@ionic/react';

interface KeyboardProps {
  onGuess: (letter: string) => void;
  guessedLetters: string[];
  gameOver: boolean;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Keyboard = ({ onGuess, guessedLetters, gameOver }: KeyboardProps) => {
  return (
    <div className="keyboard">
      {alphabet.map(letter => (
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