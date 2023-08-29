/*
  Objectif :
  créer un contexte pour gérer le mode Zen

  1. on crée le contexte
  2. on crée le fournisseur de contexte (provider)
    → dans `value`, je dois passer `zenMode` ET `setZenMode`
  3. on utilise ce provider
  4. on lit le contexte depuis `<Header />`
    → remplace les _props_
*/

import { ReactElement, createContext, useMemo, useState } from 'react';

interface ZenModeContextType {
  zenMode: boolean;
  setZenMode: React.Dispatch<React.SetStateAction<boolean>>;
}

// 1. création
const ZenModeContext = createContext<ZenModeContextType>({
  zenMode: false,
  setZenMode: () => {},
});

// 2. provider
function ZenModeProvider({ children }: { children: ReactElement }) {
  // je crée mon état « mode zen » (comme d'habitude)
  // je vais passer CES variables au Provider
  //   → je pourrai les récupérer depuis le contexte
  //   grâce à `value` et à `useContext()`
  const [zen, setZen] = useState(false);

  const contextValue = useMemo(
    // callback qui retourn la valeur à mettre en cache
    () => ({
      zenMode: zen,
      setZenMode: setZen,
    }),
    // dépendances : quand mettre à jour cette valeur
    [zen]
  );

  return (
    <ZenModeContext.Provider
      value={{
        zenMode: zen,
        setZenMode: setZen,
      }}
    >
      {children}
    </ZenModeContext.Provider>
  );
}

export { ZenModeContext, ZenModeProvider };
