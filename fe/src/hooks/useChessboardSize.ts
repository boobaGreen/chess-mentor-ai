import { useState, useEffect } from "react";

/**
 * Hook personalizzato per gestire la dimensione responsiva della scacchiera
 * @param showEvalBar - Indica se viene mostrata la barra di valutazione (opzionale)
 * @returns La larghezza calcolata della scacchiera
 */
export const useChessboardSize = (showEvalBar = false): number => {
  const [boardWidth, setBoardWidth] = useState(500);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      // Valori base per ogni breakpoint
      let baseWidth = 500;

      if (width < 375) {
        // Per iPhone SE e dispositivi molto piccoli (<375px)
        baseWidth = 250;
      } else if (width < 400) {
        // Per iPhone 11 (~390px)
        baseWidth = 270;
      } else if (width < 768) {
        // Per altri dispositivi mobili
        baseWidth = 320;
      } else if (width < 1024) {
        // Su tablet
        baseWidth = 380;
      } else {
        // Su desktop
        baseWidth = 480;
      }

      // Riduci leggermente se è presente la barra di valutazione
      if (showEvalBar) {
        baseWidth = Math.floor(baseWidth * 0.95);
      }

      setBoardWidth(baseWidth);
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, [showEvalBar]);

  return boardWidth;
};

export default useChessboardSize;
