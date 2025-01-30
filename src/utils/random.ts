const adjectives = [
  'Stealth', 'Quantum', 'Sonic', 'Laser', 'Cyber',
  'Nano', 'Plasma', 'Shadow', 'Hyper', 'Cosmic'
];

const nouns = [
  'Blade', 'Shield', 'Pulse', 'Wave', 'Storm',
  'Matrix', 'Nexus', 'Core', 'Sphere', 'Beacon'
];

export const generateGadgetName = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  
  return `${adjective} ${noun} ${number}`;
};

export const generateMissionSuccessProbability = (): number => {
  return Math.floor(Math.random() * 101); // 0-100
};

export const generateSelfDestructCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}; 