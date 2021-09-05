import React from "react";
import { motion, useAnimation } from "framer-motion";

const variants = {};

const AnimatedLogo = () => {
  const controls = useAnimation();
  const [onClick, setOnClick] = React.useState(false);

  React.useEffect(() => {
    controls.start((i) => ({
      opacity: 0,
      x: 100,
      transition: { delay: i * 0.3 },
    }));
  }, [onClick]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 141.73 66.47"
      className="text-black-500 h-64"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      onClick={() => {
        setOnClick(!onClick);
      }}
    >
      <motion.path
        fill="currentColor"
        d="M65.36,63.19a.63.63,0,0,0-.17-.48.64.64,0,0,0-.49-.18h-.39V64h.3a.73.73,0,0,0,.54-.21A.72.72,0,0,0,65.36,63.19Z"
      />
      <motion.path
        fill="currentColor"
        d="M41.62,61.58v4.89h63.79V61.58ZM54.2,64.73H52.76v-.28H54.2Zm9,.92H61.87v-.16a1.86,1.86,0,0,0,.3,0q.12,0,.12-.09v0a.08.08,0,0,0,0,0L62,64.51H60.84c-.05.11-.08.2-.11.28s0,.16-.07.22a.79.79,0,0,0,0,.17.44.44,0,0,0,0,.1q0,.09.15.15a1.61,1.61,0,0,0,.33.06v.16H59.84v-.16l.15,0a.52.52,0,0,0,.15-.06.6.6,0,0,0,.14-.13.67.67,0,0,0,.1-.19c.17-.42.35-.88.55-1.4l.54-1.39h.18l1.11,2.86a.53.53,0,0,0,.08.15l.12.11.14,0,.15,0ZM73,62.51l-.2,0a.81.81,0,0,0-.2.08.32.32,0,0,0-.11.22,2.42,2.42,0,0,0,0,.42v2.42h-.2l-2-2.71v1.71a1.63,1.63,0,0,0,0,.44.35.35,0,0,0,.11.22.45.45,0,0,0,.22.1l.22,0v.16H68.53c-.18-.27-.38-.55-.6-.82s-.45-.54-.69-.8h-.06v1.16a.28.28,0,0,0,0,.13.18.18,0,0,0,.11.1.49.49,0,0,0,.14,0l.16,0v.16H65.7c-.2-.31-.38-.57-.54-.8s-.33-.46-.51-.7h-.34v1a.36.36,0,0,0,0,.15.2.2,0,0,0,.11.09l.15,0,.18,0v.16h-1.4v-.16l.16,0,.15,0a.22.22,0,0,0,.1-.09.33.33,0,0,0,0-.15V62.81a.68.68,0,0,0,0-.15.2.2,0,0,0-.11-.09.53.53,0,0,0-.16,0l-.15,0v-.17h1.52a2.46,2.46,0,0,1,.4,0,1.22,1.22,0,0,1,.33.14.61.61,0,0,1,.23.25.69.69,0,0,1,.09.36.9.9,0,0,1-.06.34.74.74,0,0,1-.17.25,1.14,1.14,0,0,1-.25.18,1.61,1.61,0,0,1-.33.12l.41.55.4.54a1.28,1.28,0,0,0,.18.2.82.82,0,0,0,.17.11l.15,0h0l.11,0a.24.24,0,0,0,.1-.1.26.26,0,0,0,0-.14V62.82a.32.32,0,0,0,0-.14.2.2,0,0,0-.11-.09l-.15-.05-.15,0v-.17h1.37v.17l-.16,0-.14,0a.16.16,0,0,0-.11.1.32.32,0,0,0,0,.14v1.14h0c.14-.12.28-.24.41-.37a4.36,4.36,0,0,0,.37-.38c.12-.14.21-.26.27-.34a.42.42,0,0,0,.09-.23s0,0-.05,0l-.1,0-.11,0H68v-.17h1.24v.17h-.15l-.08,0-.17.06a.3.3,0,0,0-.14.1l-.5.56c-.18.2-.35.38-.52.54.24.26.43.5.59.69l.49.62a1.26,1.26,0,0,0,.2.2.94.94,0,0,0,.17.11l.15,0,.15,0,.21,0a.72.72,0,0,0,.18-.07.33.33,0,0,0,.11-.2,2.46,2.46,0,0,0,0-.46V63.08a.83.83,0,0,0,0-.22.49.49,0,0,0-.1-.16.73.73,0,0,0-.23-.13.65.65,0,0,0-.23-.06v-.17h.94l1.86,2.53V63.29a2.44,2.44,0,0,0,0-.44c0-.11-.06-.18-.11-.21l-.21-.09-.23,0v-.17H73Zm1.71,3.14H73.18v-.16l.18,0,.17,0s.09,0,.11-.09a.2.2,0,0,0,0-.14v-2.4a.29.29,0,0,0,0-.14.19.19,0,0,0-.12-.09l-.18-.05-.17,0v-.17h1.49v.17H74.5l-.18,0c-.06,0-.1,0-.11.09a.25.25,0,0,0,0,.14v2.4a.33.33,0,0,0,0,.14.2.2,0,0,0,.11.09l.16,0,.19,0ZM78,64.33l-.15,0-.16.05a.2.2,0,0,0-.11.09.41.41,0,0,0,0,.16v.63a1,1,0,0,1,0,.16,3.11,3.11,0,0,1-.65.22,3.38,3.38,0,0,1-.63.07,1.73,1.73,0,0,1-.64-.12,1.5,1.5,0,0,1-.54-.34,1.49,1.49,0,0,1-.37-.54,1.76,1.76,0,0,1-.14-.71,2,2,0,0,1,.13-.7,1.76,1.76,0,0,1,.37-.56,1.63,1.63,0,0,1,.56-.36,1.73,1.73,0,0,1,.69-.13,1.61,1.61,0,0,1,.51.07,1.67,1.67,0,0,1,.38.16l.11-.16h.19l0,1.16h-.2c0-.13-.08-.25-.12-.38a1.52,1.52,0,0,0-.2-.33,1,1,0,0,0-.29-.24,1.08,1.08,0,0,0-.42-.08,1,1,0,0,0-.47.1,1.1,1.1,0,0,0-.35.3,1.34,1.34,0,0,0-.23.48,2.22,2.22,0,0,0-.09.65,2.35,2.35,0,0,0,.08.6,1.54,1.54,0,0,0,.24.48,1,1,0,0,0,.38.33,1.19,1.19,0,0,0,.51.11,1.25,1.25,0,0,0,.4-.06.64.64,0,0,0,.25-.13,2,2,0,0,0,0-.25v-.39a.43.43,0,0,0,0-.17.17.17,0,0,0-.11-.11,1,1,0,0,0-.22-.06l-.22,0v-.17H78Zm3.49-1.82-.16,0-.14,0a.17.17,0,0,0-.1.1.32.32,0,0,0,0,.14v2.39a.28.28,0,0,0,0,.13.24.24,0,0,0,.1.1.39.39,0,0,0,.14,0l.16,0v.16H80.1v-.16l.16,0,.15,0a.22.22,0,0,0,.1-.09.33.33,0,0,0,0-.15V64H79v1.16a.51.51,0,0,0,0,.13.27.27,0,0,0,.11.1.34.34,0,0,0,.14,0l.16,0v.16H78.05v-.16l.16,0,.15,0a.22.22,0,0,0,.1-.09.33.33,0,0,0,0-.15V62.82a.35.35,0,0,0,0-.14.18.18,0,0,0-.1-.09l-.16-.05-.15,0v-.17h1.37v.17l-.16,0-.14,0a.18.18,0,0,0-.11.1.59.59,0,0,0,0,.14v1h1.55v-1a.35.35,0,0,0,0-.14.18.18,0,0,0-.1-.09l-.16-.05-.15,0v-.17h1.37Zm4.77,2.93a1.22,1.22,0,0,1-.8.28,1.41,1.41,0,0,1-.45-.07,1.46,1.46,0,0,1-.38-.17l-.1.17h-.19l0-1.13h.19a1.88,1.88,0,0,0,.14.38,1.55,1.55,0,0,0,.2.32,1.06,1.06,0,0,0,.29.22.84.84,0,0,0,.37.08.78.78,0,0,0,.28,0,.43.43,0,0,0,.2-.11.58.58,0,0,0,.11-.18,1,1,0,0,0,0-.25.6.6,0,0,0-.12-.36.64.64,0,0,0-.33-.27l-.35-.13A2.73,2.73,0,0,1,85,64a1,1,0,0,1-.44-.33.84.84,0,0,1-.15-.46h-.16a1.21,1.21,0,0,0-.07-.2,1.59,1.59,0,0,0-.13-.22.9.9,0,0,0-.15-.19.33.33,0,0,0-.16-.09H83.2v2.65a.32.32,0,0,0,0,.14.18.18,0,0,0,.12.1.58.58,0,0,0,.17,0l.21,0v.16H82.17v-.16l.2,0a.48.48,0,0,0,.18,0,.36.36,0,0,0,.12-.08.35.35,0,0,0,0-.16V62.52h-.52a.38.38,0,0,0-.16.09l-.15.19a1.19,1.19,0,0,0-.12.22,2.05,2.05,0,0,0-.08.2h-.16v-.9h2.88v.73a.91.91,0,0,1,.07-.25.77.77,0,0,1,.22-.29.94.94,0,0,1,.32-.19,1,1,0,0,1,.39-.07,1,1,0,0,1,.4.07,1.68,1.68,0,0,1,.33.16l.1-.16h.19l0,1.1h-.19q-.06-.19-.12-.36a1,1,0,0,0-.17-.31.64.64,0,0,0-.24-.22.77.77,0,0,0-.36-.08.55.55,0,0,0-.37.14.44.44,0,0,0-.16.35.61.61,0,0,0,.1.36.76.76,0,0,0,.29.23l.34.14.32.13.27.13a1,1,0,0,1,.22.18.8.8,0,0,1,.21.58A.93.93,0,0,1,86.24,65.44Zm7.38-.71H92.19v-.28h1.43Z"
      />
      <motion.polygon
        fill="currentColor"
        points="60.92 64.3 61.91 64.3 61.41 63.01 60.92 64.3"
      />
      <motion.path
        fill="currentColor"
        d="M26,8.75c-.06,0-3.62.41-4,.41a9.08,9.08,0,0,1-1.75-.6v.73l.8.35a.9.9,0,0,1,.62.85V20.71c0,.47-.15.8-.45.8A11.67,11.67,0,0,1,19.28,21a2.3,2.3,0,0,1-.84-1.61V9.27l.4-1L14.13,3v28.7L0,27.17v1.48l26,8.44V9.41c0-.14.06-.34.06-.42S26,8.78,26,8.75ZM21.65,33.19c0,.56-.27.92-.93.69l-1.45-.56a1,1,0,0,1-.74-1l-.05-9.56c0-.76.51-1.14,1.08-1l1.3.42a1.34,1.34,0,0,1,.8,1.42Z"
      />
      <motion.path
        fill="currentColor"
        d="M67.44,9.63l-.35.09a1.31,1.31,0,0,1-.41.08A3.56,3.56,0,0,1,66,9.6L54.57,5.87A5.07,5.07,0,0,1,53.06,5a13.12,13.12,0,0,1-2-2L48.5,0V44l4.79-3.87a.66.66,0,0,1,.56-.28,1.22,1.22,0,0,1,.6.13l3,.82V40l-3-1a3.27,3.27,0,0,1-.73-.6,2,2,0,0,1-.19-1V23.68c0-1,.38-1,.56-1.11a3,3,0,0,1,.93.08l10.85,3.58a1.28,1.28,0,0,1,.72.43,1.11,1.11,0,0,1,.16.53V40.61l-7.89-2.54v1.58l5.87,1.89a1.37,1.37,0,0,1,.41.22,1.19,1.19,0,0,1,.26.34l.33.8a.81.81,0,0,1,.08.31,3.44,3.44,0,0,1-.08.5L71.81,36V14.09s.07-2.67.17-3.59.15-1.13.15-1.13Zm-.67,15.06c0,.76-.27.92-.93.69L54.1,21.46a1,1,0,0,1-.75-1.05l0-12.71a1.22,1.22,0,0,1,1.51-1L66,10.3a1.44,1.44,0,0,1,.8,1.47Z"
      />
      <motion.path
        fill="currentColor"
        d="M43.69,13.44l-4.78.21-5-1.65a5.37,5.37,0,0,1-.76-.58c-.31-.3-1.09-1.19-1.09-1.19l-3.1-3.32V26.69a54.85,54.85,0,0,1-2.15,14.1c-1.38,5.07-3.51,7-3.51,7a11.45,11.45,0,0,0,5.66-3.87,19,19,0,0,0,3.55-7.64A3.26,3.26,0,0,1,33,34.51a1.22,1.22,0,0,1,1-.24l4.17,1.26a1.47,1.47,0,0,1,.71.58,2.74,2.74,0,0,1,.12,1v8.65c0,1.12-.58,1.65-1.59,1.26s-4.42-1.58-4.42-1.58L36.6,49a1.83,1.83,0,0,1,.67,1,2.31,2.31,0,0,1,.11,1.11l6.06-7.57V16.3a13.65,13.65,0,0,1,.08-1.71C43.62,13.79,43.69,13.44,43.69,13.44ZM38.92,34.08c0,.76-.27.92-.93.69l-4.14-1.45a1,1,0,0,1-.74-1.06l.37-7.44c0-1.12.77-1.22,1.51-1l3.15,1a1.43,1.43,0,0,1,.8,1.47Zm0-10.72c0,.76-.27.92-.93.69l-3.72-1.31a1,1,0,0,1-.74-1l-.05-7.59a1.22,1.22,0,0,1,1.51-1l3.15,1a1.44,1.44,0,0,1,.8,1.48Z"
      />
      <motion.path
        fill="currentColor"
        d="M83.84,13.8s2.46,9.07,2.46,9.66-.2.69-.67.69a4.55,4.55,0,0,1-1.3-.35L73.72,20.52V22.1l8.14,2.66S82.07,35.05,80,41.55,77,49.38,75.93,51a15.56,15.56,0,0,1-2.21,2.71s.31.24,1.52-.37,4.7-2.34,6.72-5a27.82,27.82,0,0,0,4-9.43c.5-2.38.52-3.37.94-3.68a1.24,1.24,0,0,1,1.07,0l5.34,1.69V36l-5.43-1.77a1.31,1.31,0,0,1-.88-.64,2.25,2.25,0,0,1-.14-1.11s.32-3.73.32-4.38-.06-1.56.35-1.9a1.12,1.12,0,0,1,1-.09l13.81,4.45a2.59,2.59,0,0,0,.72.1c.4,0,.75,0,.75-.14a4.35,4.35,0,0,0-.59-.66l-3.73-3-1.11,1.55-9.2-3s-.29,0-.29-.52.91-.92,1.2-1.33a5.15,5.15,0,0,0,.7-2.36,3.93,3.93,0,0,0-.9-2.78,15.18,15.18,0,0,0-3.27-2.92C85.75,15,83.84,13.8,83.84,13.8Z"
      />
      <motion.path
        fill="currentColor"
        d="M94.63,36.3,100,36l-.37,2.48-.35,9.69L91.11,58.42s.29-.42-.43-1.76a54.63,54.63,0,0,0-4.44-5.42s2.63,1.24,4.45,2,2.59.19,2.9-1.57.82-8.5.94-11S94.63,36.3,94.63,36.3Z"
      />
      <motion.path
        fill="currentColor"
        d="M105.65,7.28v16.2s0,.59-.48.59-.64-.16-.64-.16l-3.22-1v.82a33.58,33.58,0,0,1,3.52,1.2c.75.4.76.67.76.9s0,7.25-.55,10a29.37,29.37,0,0,1-1.81,5.81c-.45,1-1.32,2.45-1.32,2.45a.71.71,0,0,0,.31.07,11.55,11.55,0,0,0,6.32-7.06A39.37,39.37,0,0,0,110,27.68c.18-.76.54-.79.79-.79a8.59,8.59,0,0,1,1.36.45l8.77,2.86s.75.27.91.61a3.74,3.74,0,0,1,.2,1V42.88s.11,1.72-.53,2.11-1,.27-2.06-.16-3.93-1.75-3.93-1.75,3.4,4,3.89,4.55a4.74,4.74,0,0,1,.88,1.77,4.47,4.47,0,0,1-.1.57l6.56-8.26V18.18s.09-1.38.11-1.82a3.27,3.27,0,0,1,.21-.87l-5.26.33.27,1.69V28.62s0,.49-.19.66-1,0-1,0l-9.72-3.13a2.16,2.16,0,0,1-.8-.77,2.36,2.36,0,0,1-.21-1.2v-10s-.07-.28.33-.68,1.44,0,1.44,0l8.78,2.84v-.84l-6.35-2.06a.85.85,0,0,1-.69-.82c0-.69,3.59-2.8,3.86-3.38a.71.71,0,0,0-.1-.93c-.11-.19-2.77-1.82-3.28-2.28s-2.71-2.14-2.71-2.14.42,6.18.42,7-.41,1.3-.89,1.3-1.46-.83-2-1.36S105.65,7.28,105.65,7.28Z"
      />
      <motion.path
        fill="currentColor"
        d="M112.11,15.45s1.76,5.22,2.27,7,.48,3.55,1.83,3.55,2.72-1.21,2.72-3.32-1.89-4.16-3.6-5.32A28.59,28.59,0,0,0,112.11,15.45Z"
      />
      <motion.path
        fill="currentColor"
        d="M112.11,29.46s1.76,5.23,2.27,7,.48,3.55,1.83,3.55,2.72-1.22,2.72-3.32-1.89-4.16-3.6-5.32A29.73,29.73,0,0,0,112.11,29.46Z"
      />
      <motion.polygon
        fill="currentColor"
        points="141.73 31.24 128.05 26.94 128.05 25.34 141.73 29.65 141.73 31.24"
      />
    </motion.svg>
  );
};

export default AnimatedLogo;