/**
 * Preferência "Reduzir movimento" do site (soma-se a prefers-reduced-motion).
 * `html[data-motion="reduced"]` pausa animações contínuas e zera as durações (globals.css).
 * Etapa 5: os efeitos GSAP também devem checar este atributo, além do matchMedia.
 */
export const MOTION_STORAGE_KEY = 'nodo-motion';

/** Script inline (antes da pintura) que reaplica a preferência salva. */
export const motionPreferenceScript = `try{if(localStorage.getItem('${MOTION_STORAGE_KEY}')==='reduced')document.documentElement.dataset.motion='reduced'}catch(e){}`;
