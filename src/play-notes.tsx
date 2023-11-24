import React, { useEffect, useState } from 'react';

const AudioContext = window.AudioContext;

export const PlayNotes = () => {
  const [audioContext, setAudioContext] = useState<AudioContext|null>(null);
  const [oscillatorNode, setOscillatorNode] = useState<OscillatorNode|null>(null);
  const [gainNode, setGainNode] = useState<GainNode|null>(null);

  useEffect(() => {
    const audioContext = new AudioContext();
    const oscillatorNode = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillatorNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    setAudioContext(audioContext);
    setOscillatorNode(oscillatorNode);
    setGainNode(gainNode);
  }, []);

  const playNote = (frequency: number) => {
    if (audioContext && oscillatorNode && gainNode) {
      oscillatorNode.frequency.value = frequency;
      oscillatorNode.start();
    }
  };

  const stopNote = () => {
    if (oscillatorNode) {
      oscillatorNode.stop();
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

