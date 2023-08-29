import { ReactElement, createContext, useEffect, useState } from 'react';
import axios from 'axios';

import { CategoryInterface } from '../@types';

/*
  Objectif :

  ajouter mes catégories à un Contexte react
  pour pouvoir y accéder depuis n'importe quel composant

  > https://react.dev/learn/passing-data-deeply-with-context
*/
// création du contexte
const CategoriesContext = createContext<CategoryInterface[]>([]);

// création du Provider
// c'est un « fournisseur de contexte »
// un _provider_ est un composant particulier : un HOC
// _High Order Component_, un composant de haut rang
//
// ce n'est pas un composant qui s'occupe d'un affichage, d'une portion d'UI ;
// il diffuse/fournit des données à ses enfants
function CategoriesProvider({ children }: { children: ReactElement }) {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get(
          'https://oblog-react.vercel.app/api/categories'
        );

        // on stocke la réponse dans la variable d'état
        setCategories(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  return (
    // c'est grâce à ce composant qu'on pourra accéder à `value`
    // c'est-à-dire à nos catégories
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
}

export { CategoriesContext, CategoriesProvider };
