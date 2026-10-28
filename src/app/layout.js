import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'antd demo',
  description: 'Ant Design with the Prism theme, in Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts named in tokens/*.json (fontFamily, fontFamilyCode), as Storybook's preview-head.html loads them. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        />
      </head>
      <body>
        {/* Renders antd's styles on the server, so pages don't flash unstyled. */}
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
