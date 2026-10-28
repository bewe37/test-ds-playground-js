import { useLayoutEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { antdDefaultThemes, floatingConfigs, themes, typography } from '../src/theme';

// Paints the canvas with the active theme's background so dark mode isn't drawn on white.
function Canvas({ mode, children }) {
  const { token } = antdTheme.useToken();
  useLayoutEffect(() => {
    document.documentElement.style.colorScheme = mode;
    document.body.style.backgroundColor = token.colorBgContainer;
    document.body.style.color = token.colorText;
  }, [mode, token.colorBgContainer, token.colorText]);
  return children;
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  globalTypes: {
    dsTheme: {
      description: 'Theme',
      toolbar: {
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'ours', title: 'Our theme' },
          { value: 'antd', title: 'Ant Design default' },
        ],
      },
    },
    mode: {
      description: 'Colour mode',
      toolbar: {
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
    },
  },
  initialGlobals: { dsTheme: 'ours', mode: 'light' },
  decorators: [
    (Story, context) => {
      const mode = context.globals.mode === 'dark' ? 'dark' : 'light';
      const ours = context.globals.dsTheme === 'ours';
      return (
        <ConfigProvider
          theme={ours ? themes[mode] : antdDefaultThemes[mode]}
          typography={ours ? typography : undefined}
          {...(ours ? floatingConfigs[mode] : {})}
        >
          <Canvas mode={mode}>
            <Story />
          </Canvas>
        </ConfigProvider>
      );
    },
  ],
};

export default preview;
