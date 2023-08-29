/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-no-constructed-context-values */
/*
  Gérer un dark mode avec un contexte

  1. création du contexte et de son provider
  2. utilisation → ContextProvider dans `main`
  3. lecture → `useContext` pour récupérer la valeur
*/

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface ContextType {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

// 1.
// on veut diffuser :
//   - est-on en mode dark ?
//   - la possibilité de modifier la valeur
const DarkContext = createContext<ContextType>({
  isDark: false,
  setIsDark: () => {},
});

function DarkProvider({ children }: { children: ReactElement }) {
  const [dark, setDark] = useState(false);

  return (
    <DarkContext.Provider
      value={{
        isDark: dark,
        setIsDark: setDark,
      }}
    >
      {children}
    </DarkContext.Provider>
  );
}

export { DarkContext, DarkProvider };
