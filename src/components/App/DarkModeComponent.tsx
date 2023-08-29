import { useContext } from 'react';
import { DarkContext } from '../../contexts/DarkContext';

function DarkModeComponent() {
  const { isDark, setIsDark } = useContext(DarkContext);

  return (
    <button type="button" onClick={() => setIsDark(!isDark)}>
      Passer en mode {isDark ? 'clair' : 'sombre'}
    </button>
  );
}

export default DarkModeComponent;
