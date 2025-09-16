import React, { createContext, useEffect, useMemo, useState } from 'react';

export type SettingsState = {
  currency: string;
  highContrast: boolean;
  largeText: boolean;
};

type SettingsContextValue = SettingsState & {
  setCurrency: (currency: string) => void;
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
};

export const SettingsContext = createContext<SettingsContextValue>({
  currency: 'GBP',
  highContrast: false,
  largeText: false,
  setCurrency: () => undefined,
  setHighContrast: () => undefined,
  setLargeText: () => undefined,
});

const STORAGE_KEY = 'app_settings_v1';

function loadInitialSettings(): SettingsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SettingsState;
  } catch {}
  return {
    currency: 'GBP',
    highContrast: false,
    largeText: false,
  };
}

// Theme class is applied by ThemeProvider; do not duplicate here

function applyAccessibility({
  highContrast,
  largeText,
}: Pick<SettingsState, 'highContrast' | 'largeText'>) {
  const root = document.documentElement;
  root.classList.toggle('high-contrast', !!highContrast);
  root.classList.toggle('large-text', !!largeText);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SettingsState>(() =>
    loadInitialSettings()
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  // Theme is managed globally by ThemeProvider

  useEffect(() => {
    applyAccessibility(state);
  }, [state.highContrast, state.largeText]);

  // System theme changes handled by ThemeProvider

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...state,
      setTheme: (theme) => setState((s) => ({ ...s, theme })),
      setCurrency: (currency) => setState((s) => ({ ...s, currency })),
      setHighContrast: (highContrast) =>
        setState((s) => ({ ...s, highContrast })),
      setLargeText: (largeText) => setState((s) => ({ ...s, largeText })),
    }),
    [state]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
