'use client';
import React, { useEffect, useState } from 'react';

type TypeWriterProps = {
  words: string[];
  typingSpeed?: number; // ms per character while typing
  deletingSpeed?: number; // ms per character while deleting
  delayBetween?: number; // pause between full word and delete
  className?: string;
  loop?: boolean;
};

const TypeWriter: React.FC<TypeWriterProps> = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 1500,
  className = '',
  loop = true,
}) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(prev => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(prev => currentWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // When typing complete → pause, then start deleting
    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delayBetween);
    }

    // When deleting complete → move to next word
    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetween,
    loop,
  ]);

  return (
    <span className={`inline-block ${className}`}>
      {text}
      <span className='animate-pulse'>|</span>
    </span>
  );
};

export default TypeWriter;
