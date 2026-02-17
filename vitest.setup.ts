import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Robust Mock for Web Speech API
class MockSpeechSynthesisUtterance {
  text = '';
  voice = null;
  rate = 1;
  pitch = 1;
  volume = 1;
  onend = null;
  onerror = null;
  onstart = null;

  constructor(text: string) {
    this.text = text;
  }
}

const mockSpeechSynthesis = {
  getVoices: vi.fn().mockReturnValue([
    { name: "Voice PL", lang: "pl-PL", default: true },
    { name: "Voice EN", lang: "en-US", default: false },
  ]),
  speak: vi.fn((utterance) => {
    mockSpeechSynthesis.speaking = true;
    if (utterance.onstart) utterance.onstart();
    // Simulate end of speaking
    setTimeout(() => {
      mockSpeechSynthesis.speaking = false;
      if (utterance.onend) utterance.onend();
    }, 50);
  }),
  cancel: vi.fn(() => {
    mockSpeechSynthesis.speaking = false;
  }),
  pause: vi.fn(),
  resume: vi.fn(),
  onvoiceschanged: null,
  speaking: false,
};

Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
  writable: true
});

global.window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance as any;

// Global Drizzle Mock Helper
(global as any).createDbMock = () => {
  const mock = {
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    execute: vi.fn().mockResolvedValue([]),
    then: vi.fn((onFullfilled) => {
      if (onFullfilled) return Promise.resolve([]).then(onFullfilled);
      return Promise.resolve([]);
    }),
  };
  return mock;
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Next.js fonts
vi.mock('next/font/google', () => ({
  Atkinson_Hyperlegible: () => ({
    className: 'atkinson-font',
    variable: '--font-atkinson',
    style: { fontFamily: 'Atkinson' }
  }),
}));
