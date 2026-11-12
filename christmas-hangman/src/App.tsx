import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import { useState } from 'react';

import Game from './pages/Game';
import StartPage from './pages/StartPage';
import words from './data/words.json'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/background.css'
import React from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'no'>('en');
  const [hasSeenInstructions, setHasSeenInstructions] = useState(false);
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const [streak, setStreak] = useState(0);

  const startNewGame = () => {
    const wordList = words[language];
    const randomWord = wordList[
      Math.floor(Math.random() * wordList.length)
    ].toUpperCase();

    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setStreak(0);
  };

  const changeLanguage = (newLanguage: 'en' | 'no') => {
    setLanguage(newLanguage);
    setWord('');
    setGuessedLetters([]);
    setWrongGuesses(0);
    setStreak(0);
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/"
            element={
              <StartPage
                language={language}
                setLanguage={changeLanguage}
                hasSeenInstructions={hasSeenInstructions}
                setHasSeenInstructions={setHasSeenInstructions}
                word={word}
                streak={streak}
                startNewGame={startNewGame}
              />
            }
          />

          <Route
            path="/game"
            element={<Game
              language={language}
              word={word}
              setWord={setWord}
              guessedLetters={guessedLetters}
              setGuessedLetters={setGuessedLetters}
              wrongGuesses={wrongGuesses}
              setWrongGuesses={setWrongGuesses}
              streak={streak}
              setStreak={setStreak}
            />}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
