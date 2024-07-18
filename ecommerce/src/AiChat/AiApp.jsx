import React, { useState } from 'react';
import StickyLogo from './StickyLogo';
import SupportDialogue from './SupportDialogue';

function AiApp() {
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [dialoguePosition, setDialoguePosition] = useState({ x: 0, y: 0 });

  const toggleDialogue = (event) => {
    setDialogueVisible(!dialogueVisible);
    if (!dialogueVisible) {
      setDialoguePosition({
        x: event.clientX - 200, // Adjust to center the dialogue box
        y: event.clientY - 100,
      });
    }
  };

  return (
    <div>
      <StickyLogo onClick={toggleDialogue} />
      {dialogueVisible && <SupportDialogue onClose={toggleDialogue} position={dialoguePosition} />}
    </div>
  );
}

export default AiApp;
