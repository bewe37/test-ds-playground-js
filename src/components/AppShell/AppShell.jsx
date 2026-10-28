'use client';

import { useContext, useId, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Drawer, Flex, Layout, Typography, theme as antdTheme } from 'antd';
import { typography } from '../../theme';
import { SidebarOverlayContext } from '../Sidebar';
import toggleIcon from '../Sidebar/assets/sidebar-toggle-light.svg';
import { useMediaQuery, useViewportWidth } from '../useMediaQuery';
import './AppShell.css';

// Code-V1 "Application Shell" (Figma 131:60197): the sidebar beside the page, which sits on the
// Layout body colour. The page (header and content) grows to maxWidth, then stays centred.
// Below the md breakpoint the sidebar leaves the layout: a top bar keeps its toggle in reach, and
// the toggle opens it over the page, leaving a rail's width of the page showing to tap back to.

// Widest the sidebar gets over the page, however wide the screen.
const overlayMaxWidth = 400;

/**
 * @typedef {object} AppShellProps
 * @property {import('react').ReactNode} sidebar Usually a Sidebar; it keeps its own width, the page takes the rest.
 * @property {import('react').ReactNode} [title]
 * @property {import('react').ReactNode} [description]
 * @property {() => void} [onBack] Shows a Back button above the title.
 * @property {number} [maxWidth] Widest the page gets, header included.
 * @property {import('react').ReactNode} [children]
 */

/** @param {AppShellProps} props */
export function AppShell({ sidebar, title, description, onBack, maxWidth = 1650, children }) {
  const { token } = antdTheme.useToken();
  const { theme } = useContext(ConfigProvider.ConfigContext);
  const narrow = useMediaQuery(`(max-width: ${token.screenSMMax}px)`);
  const viewportWidth = useViewportWidth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainId = useId();
  const sidebarId = useId();

  const hasHeader = Boolean(onBack || title);
  // Narrow screens get the tighter side padding; the top bar's toggle icon lines up with it.
  const gutter = narrow ? token.padding : token.paddingMD;
  const collapsedWidth = Number(theme?.components?.Menu?.collapsedWidth ?? 56);
  const overlayWidth = Math.min(viewportWidth - collapsedWidth, overlayMaxWidth);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Layout hasSider={!narrow} className="app-shell" style={{ height: '100%', letterSpacing: typography.style.letterSpacing }}>
      <a
        className="app-shell-skip"
        href={`#${mainId}`}
        style={{ background: token.colorBgElevated, color: token.colorText, outlineColor: token.colorPrimaryBorder }}
      >
        Skip to content
      </a>

      {narrow ? (
        <>
          <header style={{ flexShrink: 0, padding: `${token.paddingXS}px ${gutter - token.paddingXS}px` }}>
            <Button
              type="text"
              aria-label="Open sidebar"
              aria-expanded={sidebarOpen}
              aria-controls={sidebarId}
              icon={<span className="app-shell-toggle-icon" style={{ '--app-shell-icon': `url("${toggleIcon.src}")` }} />}
              onClick={() => setSidebarOpen(true)}
            />
          </header>
          <Drawer
            id={sidebarId}
            aria-label="Sidebar"
            placement="left"
            open={sidebarOpen}
            onClose={closeSidebar}
            closable={false}
            size={overlayWidth}
            styles={{ body: { padding: 0 }, section: { overflow: 'hidden' } }}
          >
            <SidebarOverlayContext.Provider value={{ width: overlayWidth, onClose: closeSidebar }}>
              {sidebar}
            </SidebarOverlayContext.Provider>
          </Drawer>
        </>
      ) : (
        sidebar
      )}

      {/* Only the page scrolls; the sidebar and top bar stay put. */}
      <Layout.Content id={mainId} tabIndex={-1} style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto', outline: 'none' }}>
        <Flex vertical style={{ flex: 1, width: '100%', maxWidth, marginInline: 'auto' }}>
          {hasHeader && (
            <header>
              {onBack && (
                <div style={{ paddingTop: gutter, paddingInline: token.marginXXS }}>
                  <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack}>
                    Back
                  </Button>
                </div>
              )}
              {title && (
                <Flex vertical gap={token.marginXXS} style={{ padding: gutter, paddingTop: narrow ? token.paddingXS : gutter }}>
                  {/* The page's h1, sized as Figma's heading 5. */}
                  <h1
                    style={{
                      margin: 0,
                      color: token.colorTextHeading,
                      fontSize: token.fontSizeHeading5,
                      lineHeight: token.lineHeightHeading5,
                      fontWeight: token.fontWeightNormal,
                    }}
                  >
                    {title}
                  </h1>
                  {description && <Typography.Text type="secondary">{description}</Typography.Text>}
                </Flex>
              )}
            </header>
          )}
          <Flex
            vertical
            gap={token.padding}
            style={{
              flex: 1,
              paddingInline: gutter,
              paddingTop: hasHeader ? 0 : gutter,
              paddingBottom: token.paddingXL,
            }}
          >
            {children}
          </Flex>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}
