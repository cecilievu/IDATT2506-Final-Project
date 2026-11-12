import './WordDisplay.css'

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
}


const WordDisplay = ({ word, guessedLetters }: WordDisplayProps) => {
  return (
    <div className="word-display"> 
      {word.split('').map((letter, index) => (
        <span key={index} className="letter">
          {letter === ' ' ? '\u00A0' : guessedLetters.includes(letter) ? letter : '_'}
        </span>
      ))}
    </div>
  );
};

export default WordDisplay;