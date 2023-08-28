/* eslint-disable import/prefer-default-export */
import DOMPurify from 'dompurify';

export function createMarkup(text: string) {
  // configuration de DOMPurify
  // https://www.npmjs.com/package/dompurify#user-content-can-i-configure-dompurify
  const configSanitize = {
    ALLOWED_TAGS: ['em', 'strong', 'img'],
    // ALLOWED_ATTR: ['style'],
  };

  // nettoyage du code HTML
  const cleanCode = DOMPurify.sanitize(text, configSanitize);

  // retourne le markup à utiliser pour `dangerouslySetInnerHTML`
  return { __html: cleanCode };
}
