
interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
}


const WordDisplay = ({ word, guessedLetters }: WordDisplayProps) => {
  return (
    <div className="word-display"> 
      {word.split('').map((letter, index) => (
        <span key={index} className="letter">
          {guessedLetters.includes(letter) ? letter : '_'}
        </span>
      ))}
    </div>
  );
};

export default WordDisplay;