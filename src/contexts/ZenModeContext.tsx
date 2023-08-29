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

  /*
    Problème :

    à chaque fois que le contexte est appelé (App, Header)
    l'objet passé à `value` est re-créé
    donc ce composant et tous ses enfants sont re-rendus
    → attention aux performances !

    Solution :

    useMemo met en cache une valeur → c'est la *mémoïsation*
    (cette valeur est le retour du callback)

    > https://react.dev/reference/react/useMemo
    > https://fr.wiktionary.org/wiki/m%C3%A9mo%C3%AFsation
  */
  const contextValue = useMemo(
    // callback qui retourne la valeur à mettre en cache
    () => ({
      zenMode: zen,
      setZenMode: setZen,
    }),
    // dépendances : quand mettre à jour cette valeur
    [zen]
  );

  return (
    <ZenModeContext.Provider value={contextValue}>
      {children}
    </ZenModeContext.Provider>
  );
}

export { ZenModeContext, ZenModeProvider };
