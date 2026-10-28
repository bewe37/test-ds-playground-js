'use client';

import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { floatingConfigs, themes, typography } from '../theme';

// The app's equivalent of Storybook's preview decorator: our theme for the current colour mode,
// which the sidebar's Theme row switches.

const ModeContext = createContext({ mode: 'light', setMode: () => {} });

/** @returns {{ mode: 'light' | 'dark', setMode: (mode: 'light' | 'dark') => void }} */
export function useMode() {
  return useContext(ModeContext);
}

// Paints the page with the active theme's background so dark mode isn't drawn on white.
function Canvas({ mode, children }) {
  const { token } = antdTheme.useToken();
  useLayoutEffect(() => {
    document.documentElement.style.colorScheme = mode;
    document.body.style.backgroundColor = token.colorBgContainer;
    document.body.style.color = token.colorText;
  }, [mode, token.colorBgContainer, token.colorText]);
  return children;
}

export function Providers({ children }) {
  const [mode, setMode] = useState('light');
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <ConfigProvider theme={themes[mode]} typography={typography} {...floatingConfigs[mode]}>
        <Canvas mode={mode}>{children}</Canvas>
      </ConfigProvider>
    </ModeContext.Provider>
  );
}
