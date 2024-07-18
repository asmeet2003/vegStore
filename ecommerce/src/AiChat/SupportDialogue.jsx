import React, { useState, useEffect, useRef } from 'react';
import ChatWithAi from './ChatWithAi';

const SupportDialogue = ({ onClose, position }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [dialogueSize, setDialogueSize] = useState({ width: 400, height: 300 });
  const dialogueRef = useRef(null);
  const [resizeStartX, setResizeStartX] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogueRef.current && !dialogueRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    const handleMouseMove = (event) => {
      if (isResizing) {
        const newWidth = dialogueSize.width + (event.clientX - resizeStartX);
        if (newWidth >= 200) {
          setDialogueSize((prevSize) => ({
            ...prevSize,
            width: newWidth,
          }));
          setResizeStartX(event.clientX);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onClose, isResizing, dialogueSize.width, resizeStartX]);

  const dialogueStyles = {
    position: 'fixed',
    left: `${position.x - dialogueSize.width}px`, // Adjust left position based on width
    top: `${position.y}px`,
    width: `${dialogueSize.width + 100}px`,

    height: `${dialogueSize.height+100}px`,
    backgroundColor: 'white',
    border: '1px solid gray',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    zIndex: 1000,
    overflow: 'hidden',
  };

  const resizeHandleStyles = {
    width: '10px',
    height: '100%',
    backgroundColor: 'gray',
    position: 'absolute',
    right: '-5px', // Adjusting position to the right of the dialogue box
    top: '0',
    cursor: 'ew-resize', // Horizontal resize cursor
  };

  return (
    <div ref={dialogueRef} style={dialogueStyles}>
      <div
        style={resizeHandleStyles}
        onMouseDown={(event) => {
          setIsResizing(true);
          setResizeStartX(event.clientX);
        }}
      />
      <div className="flex justify-between items-center p-2 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Chat with AI</h2>
        <button onClick={onClose} className="text-gray-300 bg-gray-500 rounded-full text-2xl">
          X
        </button>
      </div>
      <div className="p-2" style={{ maxHeight: 'calc(100% - 40px)', overflowY: 'auto' }}>
        <ChatWithAi />
      </div>
    </div>
  );
};

export default SupportDialogue;
