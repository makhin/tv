import { beforeEach, describe, expect, it, vi } from 'vitest';

const voiceMocks = vi.hoisted(() => ({
  isAvailable: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  destroy: vi.fn(),
  removeAllListeners: vi.fn(),
}));

vi.mock('@react-native-voice/voice', () => ({
  __esModule: true,
  default: {
    ...voiceMocks,
    onSpeechStart: undefined,
    onSpeechEnd: undefined,
    onSpeechResults: undefined,
    onSpeechError: undefined,
  },
}));

const alertMock = vi.hoisted(() => ({
  alert: vi.fn(),
}));

const toastAndroidMock = vi.hoisted(() => ({
  show: vi.fn(),
  SHORT: 0,
}));

const permissionsAndroidMock = vi.hoisted(() => ({
  request: vi.fn(),
  PERMISSIONS: {
    RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
  },
  RESULTS: {
    GRANTED: 'granted',
  },
}));

vi.mock('react-native', () => ({
  Alert: alertMock,
  PermissionsAndroid: permissionsAndroidMock,
  Platform: { OS: 'android', isTV: true },
  TextInput: class MockTextInput {},
  ToastAndroid: toastAndroidMock,
}));

import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import Voice from '@react-native-voice/voice';

import { useVoiceSearch } from '../useVoiceSearch';
import type { UseVoiceSearchResult } from '../useVoiceSearch';

describe('useVoiceSearch on Android TV', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    voiceMocks.isAvailable.mockRejectedValue(new Error('Voice service unavailable'));
    voiceMocks.start.mockResolvedValue(undefined);
    voiceMocks.stop.mockResolvedValue(undefined);
    voiceMocks.destroy.mockResolvedValue(undefined);
    voiceMocks.removeAllListeners.mockReturnValue(undefined);
  });

  it('treats voice search as supported and attempts to start listening', async () => {
    let hookResult: UseVoiceSearchResult | null = null;
    let renderer: TestRenderer.ReactTestRenderer | null = null;

    const TestComponent = () => {
      hookResult = useVoiceSearch();
      return null;
    };

    await act(async () => {
      renderer = TestRenderer.create(<TestComponent />);
      await Promise.resolve();
    });

    expect(hookResult).not.toBeNull();

    if (!hookResult) {
      throw new Error('Expected voice search hook result to be defined');
    }

    const result: UseVoiceSearchResult = hookResult;
    expect(result.isVoiceSupported).toBe(true);
    expect(Voice.isAvailable).not.toHaveBeenCalled();

    await act(async () => {
      await hookResult!.handleVoiceSearchPress();
    });

    expect(Voice.start).toHaveBeenCalledWith('ru-RU');

    await act(async () => {
      renderer?.unmount();
    });
  });
});
