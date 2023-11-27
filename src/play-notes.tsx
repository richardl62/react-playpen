import React, { useState } from 'react';

const AudioContext = window.AudioContext;

export const PlayNotes = () => {
  const audioContext = new AudioContext();

  const [oscillatorNode, setOscillatorNode] = useState<OscillatorNode|null>(null);

  const playNote = (frequency: number) => {

    const localOscillatorNode = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    localOscillatorNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    localOscillatorNode.frequency.value = frequency;
    localOscillatorNode.start();

    if(oscillatorNode) {
      oscillatorNode.stop();
    }
    setOscillatorNode(localOscillatorNode);
  };

  const stopNote = () => {
    if (oscillatorNode) {
      oscillatorNode.stop();
      setOscillatorNode(null);
    }
  };

  return (
    <div>
      <button onClick={() => playNote(440)}>Play A4</button> {/* A4 note */}
      <button onClick={() => playNote(261.63)}>Play C4</button> {/* C4 note */}
      <button onClick={stopNote}>Stop Note</button>
    </div>
  );
};

