'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BgColorsOutlined, LeftOutlined, MoonOutlined, RightOutlined, SunOutlined, UpOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Dropdown, Flex, Menu, Segmented, theme as antdTheme } from 'antd';
import { themes, typography } from '../../theme';
import { useMediaQuery } from '../useMediaQuery';
import lockupDark from './assets/code-product-lockup-dark.svg';
import lockupLight from './assets/code-product-lockup-light.svg';
import symbol from './assets/code-product-symbol.svg';
import toggleDark from './assets/sidebar-toggle-dark.svg';
import toggleLight from './assets/sidebar-toggle-light.svg';
import upDownDark from './assets/updown-dark.svg';
import upDownLight from './assets/updown-light.svg';
import './Sidebar.css';

// Prism "Menu" sidebar (Figma node 1213:28650): logo header, inline antd Menu, and a
// footer row for the signed-in user and current dataset.

const themeKey = 'sidebar-theme';
const backKey = 'sidebar-back';
// The logo files are 64 units tall, with the symbol at the same place in each. At 18px the
// symbol's glyph is 16px tall, inset 1px top and bottom.
const logoSize = 18;
const lockupWidth = (263 / 64) * logoSize;
// The footer menu's width when collapsed; expanded, it matches the footer row.
const collapsedUserMenuWidth = 220;
// Leftward pointer speed (px/ms) past the minimum width that collapses the sidebar: a flick, not a drag.
const flickVelocity = 0.5;

function isSubMenu(item) {
  return !!item && 'children' in item && item.type !== 'group';
}

// Dragged past a limit, the edge keeps following with growing resistance, never more than 40px
// beyond it; let go and it settles back to the limit.
function resist(value, min, max) {
  const over = value > max ? value - max : value < min ? value - min : 0;
  if (!over) return value;
  return (over > 0 ? max : min) + Math.sign(over) * 40 * (1 - 1 / (1 + Math.abs(over) / 80));
}

// Our Figma exports add tokens antd doesn't know (footerTextColor, darkColorSplit, ...),
// so read the component tokens straight from the theme config.
function useComponentTokens(name) {
  const { theme } = useContext(ConfigProvider.ConfigContext);
  return theme?.components?.[name] ?? {};
}

// Set by AppShell when the sidebar opens over the page on narrow screens. It then shows expanded
// at the overlay's width, and closing it (its toggle, or picking a page) closes the overlay.
/** @type {import('react').Context<{ width: number, onClose: () => void } | null>} */
export const SidebarOverlayContext = createContext(null);

/** @typedef {'light' | 'dark'} SidebarTheme */

/**
 * @typedef {object} SidebarProps
 * @property {import('antd').MenuProps['items']} items
 * @property {SidebarTheme} [theme]
 * @property {boolean} [collapsed]
 * @property {(collapsed: boolean) => void} [onCollapsedChange]
 * @property {number} [width] Width when expanded, until it's resized; collapsed width comes from the Menu `collapsedWidth` token.
 * @property {boolean} [resizable] Lets the right edge be dragged (or arrowed) between `minWidth` and `maxWidth`.
 * @property {number} [minWidth]
 * @property {number} [maxWidth]
 * @property {(width: number) => void} [onWidthChange] Called with the new width when a resize ends, e.g. to remember it.
 * @property {string} [datasetLabel] Shown above the user in the footer; falls back to the tenant name.
 * @property {string} tenantName
 * @property {import('react').ReactNode} tenantLogo
 * @property {string} tenantColor
 * @property {string} userName
 * @property {import('antd').DropdownProps['menu']} [userMenu] Menu the footer row opens above itself, e.g. account settings or a dataset switcher.
 * @property {(theme: SidebarTheme) => void} [onThemeChange] Adds a Theme row to the footer menu, above its last divider (or at the end).
 * @property {Omit<import('antd').MenuProps, 'items' | 'mode' | 'theme' | 'inlineCollapsed'>} [menuProps]
 */

/** @param {SidebarProps} props */
export function Sidebar({
  items,
  theme = 'light',
  collapsed: collapsedProp = false,
  onCollapsedChange,
  width: widthProp = 280,
  resizable = true,
  minWidth = 220,
  maxWidth = 400,
  onWidthChange,
  datasetLabel,
  tenantName,
  tenantLogo,
  tenantColor,
  userName,
  userMenu,
  onThemeChange,
  menuProps,
}) {
  const { token } = antdTheme.useToken();
  const overlay = useContext(SidebarOverlayContext);
  const collapsed = overlay ? false : collapsedProp;
  const clampWidth = (value) => Math.min(maxWidth, Math.max(minWidth, value));

  // The expanded width: the prop's until the edge is resized, and the live one mid-drag.
  const [ownWidth, setOwnWidth] = useState(widthProp);
  const [prevWidthProp, setPrevWidthProp] = useState(widthProp);
  if (widthProp !== prevWidthProp) {
    setPrevWidthProp(widthProp);
    setOwnWidth(widthProp);
  }
  const [dragWidth, setDragWidth] = useState(null);
  const dragStart = useRef(null);
  const width = overlay?.width ?? dragWidth ?? ownWidth;
  const canResize = resizable && !collapsed && !overlay;
  const commitWidth = (value) => {
    const next = clampWidth(value);
    setOwnWidth(next);
    onWidthChange?.(next);
  };
  const menu = useComponentTokens('Menu');
  const segmented = useComponentTokens('Segmented');
  const dark = theme === 'dark';

  const footerText = dark ? menu.darkFooterTextColor : menu.footerTextColor;
  const footerSecondaryText = dark ? menu.darkFooterSecondaryTextColor : menu.footerSecondaryTextColor;
  const subItemIndent = Number(menu.itemPaddingInline) + Number(menu.iconSize) + Number(menu.iconMarginInlineEnd);

  // antd swaps the Menu to its collapsed layout the moment inlineCollapsed flips. Keep it
  // inline while the width animates (icons already sit where the rail needs them), then
  // hand over once the sidebar has settled.
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const animates = token.motion && !reducedMotion;
  const [animating, setAnimating] = useState(false);
  const [prevCollapsed, setPrevCollapsed] = useState(collapsed);
  const [openKeys, setOpenKeys] = useState(menuProps?.defaultOpenKeys ?? []);
  const [popupKeys, setPopupKeys] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const keepUserMenuOpen = useRef(false);
  const accountRef = useRef(null);
  // Opened from the keyboard, focus moves into the menu; by pointer it stays put, so the first
  // item doesn't open highlighted under a mouse or finger that's elsewhere.
  const [focusMenuOnOpen, setFocusMenuOnOpen] = useState(false);
  // Over the page, the footer menu's submenu it has drilled into, and which way it last moved.
  const [drill, setDrill] = useState(null);
  // The focused item leaves with the list it was in, so focus follows the drill: onto the back row
  // going in, back onto the submenu's row coming out.
  useEffect(() => {
    if (!drill) return;
    const list = document.querySelector('.sidebar-account-menu:not(.ant-dropdown-hidden) .ant-dropdown-menu-root');
    const key = drill.key ? backKey : drill.from;
    list?.querySelector(`[data-menu-id$="-${key}"]`)?.focus();
  }, [drill]);
  const closeUserMenu = () => {
    setUserMenuOpen(false);
    setDrill(null);
  };
  if (collapsed !== prevCollapsed) {
    setPrevCollapsed(collapsed);
    setAnimating(animates);
    setPopupKeys([]);
    closeUserMenu();
  }
  const menuCollapsed = collapsed && !animating;
  // Inline submenus close (with antd's own height motion) as the sidebar narrows, and reopen on expand.
  const mergedOpenKeys = !collapsed ? openKeys : menuCollapsed ? popupKeys : [];

  const borderWidth = Number(menu.activeBarBorderWidth);
  const innerWidth = width - borderWidth;
  // Everything lines up on the menu icons: left edges at iconInset expanded, centred on the
  // icon column when collapsed, and trailing glyphs end at the same inset from the right.
  const iconInset = token.marginXS + Number(menu.itemPaddingInline);
  const iconCenter = iconInset + Number(menu.iconSize) / 2;
  const logoButton = token.controlHeight;
  // The logo button centres the symbol on the icon column, expanded and collapsed alike, so the
  // symbol holds still while the sidebar collapses.
  const logoInset = iconCenter - logoButton / 2;
  const itemPadding = Number(menu.itemPaddingInline);
  // Between controlHeight (32) and controlHeightLG (40); no token sits at 36.
  const avatarSize = 36;
  const collapsedAccountPadding = iconCenter - avatarSize / 2 - token.marginXS;
  // The avatar's distance from the bottom (footer margin, row padding, centred in the row's two
  // 20px lines), less the symbol's 8px inset in its button: the symbol ends up that far from the top.
  const avatarFromBottom = token.marginXS + token.paddingXS + (40 - avatarSize) / 2;
  const logoTop = avatarFromBottom - (logoButton - 16) / 2;
  const secondaryLabel = datasetLabel ?? tenantName;

  const rootStyle = {
    width: collapsed ? menu.collapsedWidth : width,
    height: '100%',
    boxSizing: 'border-box',
    fontFamily: token.fontFamily,
    position: 'relative',
    background: dark ? menu.darkItemBg : menu.itemBg,
    // The right edge (see .sidebar-edge): lighter than Figma's colorSplit (#d9d9d9 / #27272a), and
    // translucent so it reads on any page colour. Hovering or dragging it shows the stronger line,
    // in the logo mark's green (#21C55D) on dark, and a step lighter on light, where it's otherwise loud.
    '--sidebar-edge': dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)',
    '--sidebar-edge-active': dark ? '#21c55d' : '#4ade80',
    fontWeight: token.fontWeightNormal,
    letterSpacing: typography.style.letterSpacing,
    '--sidebar-sub-indent': `${subItemIndent}px`,
    '--sidebar-item-padding': `${menu.itemPaddingInline}px`,
    '--sidebar-dark-submenu-selected': menu.darkItemColor,
    '--sidebar-account-hover-bg': dark ? menu.darkItemHoverBg : menu.itemHoverBg,
    '--sidebar-selected-bg': dark ? menu.darkItemSelectedBg : menu.itemSelectedBg,
    '--sidebar-selected-color': dark ? menu.darkItemSelectedColor : menu.itemSelectedColor,
    '--sidebar-hover-duration': token.motionDurationSlow,
    '--sidebar-focus-ring': `${token.lineWidthFocus}px solid ${token.colorPrimaryBorder}`,
    // antd motion tokens, on the quick end: a strong ease-out so the edge moves the instant you click.
    '--sidebar-duration': token.motionDurationMid,
    '--sidebar-duration-fast': token.motionDurationFast,
    '--sidebar-ease': token.motionEaseOutQuint,
    '--sidebar-fade-ease': token.motionEaseOut,
  };

  // Collapsed, the logo is the expand button: on hover or focus it swaps to the sidebar icon.
  // Expanded, the lockup covers it, its own symbol exactly on top of this one.
  const mark = (
    <span className="sidebar-logo-icon">
      <img className="sidebar-logo-mark" src={symbol.src} width={logoSize} height={logoSize} alt="" />
      <img className="sidebar-logo-expand" src={dark ? toggleDark.src : toggleLight.src} width={16} height={16} alt="" />
    </span>
  );

  // One pressable row, styled like a menu item. Its padding eases between states: to 0 at the
  // sides so the avatar centres on the icon column, and down to Figma's collapsed spacing.
  const account = (
    <button
      ref={accountRef}
      type="button"
      className="sidebar-account"
      // Both land before the click that opens the menu.
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setFocusMenuOnOpen(true);
      }}
      onPointerDown={() => setFocusMenuOnOpen(false)}
      aria-haspopup={userMenu ? 'menu' : undefined}
      aria-expanded={userMenu ? userMenuOpen : undefined}
      data-open={userMenuOpen || undefined}
      style={{
        width: '100%',
        // With the footer's own marginXS: 8px around the row expanded, 12px above the avatar collapsed.
        paddingBlock: collapsed ? token.paddingXXS : token.paddingXS,
        paddingInline: collapsed ? collapsedAccountPadding : itemPadding,
        borderRadius: Number(menu.itemBorderRadius),
      }}
    >
      <Flex align="center" gap={token.paddingSM} style={{ width: innerWidth - 2 * iconInset, flexShrink: 0 }}>
        <Flex align="center" gap={token.marginXS} style={{ flex: 1, minWidth: 0 }}>
          {/* Not antd Avatar: it stretches images to fill, and the tenant mark keeps its own size. */}
          <Flex
            align="center"
            justify="center"
            aria-hidden
            style={{ width: avatarSize, height: avatarSize, background: tenantColor, borderRadius: '50%', flexShrink: 0 }}
          >
            {tenantLogo}
          </Flex>
          {/* Names the button, collapsed too: there it's faded out, not removed. */}
          <Flex vertical className="sidebar-fade" style={{ flex: 1, minWidth: 0, textAlign: 'start' }}>
            <span className="sidebar-ellipsis" style={{ color: footerSecondaryText, fontSize: token.fontSizeSM, lineHeight: '20px' }}>
              {secondaryLabel}
            </span>
            <span className="sidebar-ellipsis" style={{ color: footerText, fontSize: token.fontSize, lineHeight: '20px' }}>
              {userName}
            </span>
          </Flex>
        </Flex>
        <img className="sidebar-fade" src={dark ? upDownDark.src : upDownLight.src} width={20} height={20} alt="" />
      </Flex>
    </button>
  );

  // keepUserMenuOpen is only set in the menu's onClick handlers below, which antd calls on click.
  // react-hooks/refs can't tell they're event handlers inside a menu config object (rather than an
  // onClick prop), and reports them as reading the ref during render.
  /* eslint-disable react-hooks/refs */

  // The Theme row: its switch picks a mode, a click anywhere else on the row flips it. Either way
  // the menu stays open, so you see the change land.
  let accountMenu = userMenu;
  if (userMenu && onThemeChange) {
    const themeItem = {
      key: themeKey,
      icon: <BgColorsOutlined />,
      label: 'Theme',
      extra: (
        // Stops the row's click too, which would flip the mode straight back. The switch is 2px
        // taller than the row's line box; the negative block margin keeps every row the same height.
        // The track bleeds past the content edge by its padding, so the thumb (what reads as the
        // edge, the dark track barely shows) lines up with the chevron above and the check marks.
        <span
          onClick={(e) => e.stopPropagation()}
          style={{ display: 'inline-flex', marginBlock: -1, marginInlineEnd: -Number(segmented.trackPadding ?? 2) }}
        >
          <Segmented
            size="small"
            value={theme}
            onChange={onThemeChange}
            // Icon-only: the icons' labels name each option for screen readers ("Light", not "sun"). Not
            // a hidden text label: any label makes antd space it from the icon, widening the segment.
            options={[
              { value: 'light', icon: <SunOutlined aria-label="Light" />, title: 'Light' },
              { value: 'dark', icon: <MoonOutlined aria-label="Dark" />, title: 'Dark' },
            ]}
          />
        </span>
      ),
    };
    const accountItems = [...(userMenu.items ?? [])];
    const lastDivider = accountItems.findLastIndex((item) => item?.type === 'divider');
    accountItems.splice(lastDivider === -1 ? accountItems.length : lastDivider, 0, themeItem);
    accountMenu = {
      ...userMenu,
      items: accountItems,
      onClick: (info) => {
        if (info.key !== themeKey) return userMenu.onClick?.(info);
        keepUserMenuOpen.current = true;
        onThemeChange(dark ? 'light' : 'dark');
      },
    };
  }

  // Over the page (mobile) there's no room beside the menu for a submenu's flyout, so a submenu
  // drills in instead: its items replace the menu's, under a row that leads back out.
  if (accountMenu && overlay) {
    const base = accountMenu;
    const baseItems = base.items ?? [];
    const parent = baseItems.find((item) => isSubMenu(item) && item.key === drill?.key);
    accountMenu = {
      ...base,
      items: parent
        ? [{ key: backKey, icon: <LeftOutlined />, label: parent.label }, { type: 'divider' }, ...parent.children]
        : baseItems.map((item) =>
            isSubMenu(item)
              ? {
                  key: item.key,
                  icon: item.icon,
                  label: item.label,
                  // Sized and placed like the desktop flyout's chevron: the glyph sits 3px inside its
                  // box, so pull it out to end on the content edge with the Theme switch.
                  extra: <RightOutlined style={{ fontSize: token.fontSizeIcon, color: token.colorIcon, marginInlineEnd: -3 }} />,
                }
              : item,
          ),
      onClick: (info) => {
        const opens = !parent && baseItems.some((item) => isSubMenu(item) && item.key === info.key);
        if (info.key !== backKey && !opens) return base.onClick?.(info);
        keepUserMenuOpen.current = true;
        setDrill(opens ? { key: info.key, direction: 'forward' } : { key: null, direction: 'back', from: drill?.key ?? undefined });
      },
    };
  }
  /* eslint-enable react-hooks/refs */

  return (
    <Flex
      vertical
      component="nav"
      aria-label="Main"
      className="sidebar"
      data-collapsed={collapsed || undefined}
      data-animating={animating || undefined}
      data-resizing={dragWidth !== null || undefined}
      style={rootStyle}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === 'width') setAnimating(false);
      }}
    >
      {/* Rows keep their expanded width so the closing edge clips them instead of reflowing them. */}
      <Flex
        align="center"
        className="sidebar-header"
        style={{
          width: innerWidth,
          boxSizing: 'border-box',
          flexShrink: 0,
          // 50px tall (around the 32px logo button) in both states, so neither the logo nor the menu
          // below moves as the sidebar collapses. The symbol sits as far from the top as the avatar
          // does from the bottom, with 8px under the button.
          paddingTop: logoTop,
          paddingBottom: token.paddingXS,
          // Figma's "Divider Horizontal" under the logo: no colour, but it takes up 1px.
          borderBottom: `${token.lineWidth}px solid transparent`,
          paddingInlineStart: logoInset,
          paddingInlineEnd: token.paddingSM,
        }}
      >
        <Button
          type="text"
          className="sidebar-logo"
          icon={mark}
          aria-label={collapsed ? 'Expand sidebar' : undefined}
          aria-expanded={collapsed ? false : undefined}
          aria-hidden={collapsed ? undefined : true}
          tabIndex={collapsed ? 0 : -1}
          onClick={collapsed ? () => onCollapsedChange?.(false) : undefined}
        />
        {/* Pulled back over the button so its symbol lands on the button's: collapsing fades only the wordmark. */}
        <img
          className="sidebar-fade sidebar-lockup"
          src={dark ? lockupDark.src : lockupLight.src}
          width={lockupWidth}
          height={logoSize}
          alt="Code"
          style={{ marginInlineStart: -(logoButton + logoSize) / 2 }}
        />
        <Button
          type="text"
          className="sidebar-fade"
          aria-label={overlay ? 'Close sidebar' : 'Collapse sidebar'}
          aria-expanded={collapsed ? undefined : true}
          aria-hidden={collapsed || undefined}
          tabIndex={collapsed ? -1 : 0}
          icon={<img src={dark ? toggleDark.src : toggleLight.src} width={16} height={16} alt="" />}
          onClick={overlay ? overlay.onClose : () => onCollapsedChange?.(true)}
          style={{ marginInlineStart: 'auto' }}
        />
      </Flex>

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              // The design insets items by marginXS and gives open submenus the item background.
              itemMarginInline: token.marginXS,
              subMenuItemBg: menu.itemBg,
              darkSubMenuItemBg: menu.darkItemBg,
              // Collapsed submenus open as flyouts, styled like every other floating surface (antd's
              // default for the dark one is navy #001529). Dark mode's, so a dark sidebar on a light page matches too.
              darkPopupBg: themes.dark.token?.colorBgElevated,
              activeBarBorderWidth: 0,
            },
          },
        }}
      >
        <Menu
          mode="inline"
          theme={theme}
          inlineCollapsed={menuCollapsed}
          inlineIndent={Number(menu.itemPaddingInline)}
          expandIcon={menuCollapsed ? () => null : ({ isOpen }) => <UpOutlined className="sidebar-chevron" rotate={isOpen ? 0 : 180} style={{ fontSize: token.fontSizeIcon }} />}
          items={items}
          {...menuProps}
          openKeys={mergedOpenKeys}
          onOpenChange={(keys) => {
            (menuCollapsed ? setPopupKeys : setOpenKeys)(keys);
            menuProps?.onOpenChange?.(keys);
          }}
          // Over the page, picking a page is done with the sidebar.
          onClick={(info) => {
            menuProps?.onClick?.(info);
            overlay?.onClose();
          }}
          // No padding of its own: the items' itemMarginBlock already gives Figma's 4px above the first one.
          style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: 'transparent', ...menuProps?.style }}
        />
      </ConfigProvider>

      <div className="sidebar-footer" style={{ flexShrink: 0, padding: token.marginXS }}>
        {/* eslint-disable-next-line react-hooks/refs -- the same click handlers (see above). */}
        {accountMenu ? (
          // Opens above the row, ending at the up/down icon.
          <Dropdown
            menu={accountMenu}
            // The drill class slides a drilled-in (or backed-out) list in from the side it came from.
            rootClassName={`sidebar-account-menu${drill ? ` sidebar-drill-${drill.direction}` : ''}`}
            trigger={['click']}
            autoFocus={focusMenuOnOpen}
            // Over the page, the overlay traps focus; the menu renders inside it so focus can move through it.
            getPopupContainer={overlay ? (node) => node.closest('[role="dialog"]') ?? document.body : undefined}
            // Collapsed, beside the rail, its bottom level with the avatar row: past the footer's
            // margin and the rail's border, then antd's usual 4px gap from what opened it.
            placement={collapsed ? 'rightBottom' : 'topRight'}
            align={collapsed ? { offset: [token.marginXS + borderWidth + token.marginXXS, 0] } : undefined}
            open={userMenuOpen}
            onOpenChange={(open, { source }) => {
              if (!open && source === 'menu' && keepUserMenuOpen.current) {
                keepUserMenuOpen.current = false;
                return;
              }
              if (open) return setUserMenuOpen(true);
              // Focus was in the menu (Escape, or picking an item): hand it back to the row, not the page.
              const active = document.activeElement;
              const focusInMenu = active === document.body || !!active?.closest('.sidebar-account-menu');
              closeUserMenu();
              // Next frame: focused now, the Enter that picked an item would go on to click the row and reopen the menu.
              if (focusInMenu) requestAnimationFrame(() => accountRef.current?.focus());
            }}
            // As wide as the footer row, following it as the sidebar resizes. Collapsed, a little
            // roomier than its content (which crowds the Theme switch against its label).
            styles={{ root: { minWidth: collapsed ? collapsedUserMenuWidth : width - 2 * token.marginXS } }}
          >
            {account}
          </Dropdown>
        ) : (
          account
        )}
      </div>

      <div className="sidebar-edge" aria-hidden />
      {canResize && (
        // A window splitter: drag it (flick it left and it collapses), click it to collapse, arrow it
        // (Shift for bigger steps), Home/End for the limits, Enter to collapse.
        <div
          className="sidebar-resize"
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
          aria-valuenow={Math.round(width)}
          aria-valuemin={minWidth}
          aria-valuemax={maxWidth}
          tabIndex={0}
          onPointerDown={(e) => {
            if (e.button !== 0 || dragStart.current) return;
            // No text selection while dragging; capture keeps the drag going off the handle.
            // Preventing the default also stops the mousedown antd closes popups on, so close the
            // footer menu here, as any press outside it would.
            e.preventDefault();
            if (userMenuOpen) closeUserMenu();
            e.currentTarget.setPointerCapture(e.pointerId);
            dragStart.current = { x: e.clientX, width: ownWidth, samples: [{ x: e.clientX, t: e.timeStamp }] };
            setDragWidth(ownWidth);
          }}
          onPointerMove={(e) => {
            const start = dragStart.current;
            if (!start) return;
            const next = start.width + e.clientX - start.x;
            // The pointer's speed over its last 100ms: a slow drag past the minimum just meets
            // resistance, a quick flick past it collapses the sidebar there and then, easing in from
            // wherever the edge was. Expanding brings back the width it had before the drag.
            const samples = [...start.samples.filter((s) => e.timeStamp - s.t < 100), { x: e.clientX, t: e.timeStamp }];
            start.samples = samples;
            const elapsed = samples[samples.length - 1].t - samples[0].t;
            const velocity = elapsed > 0 ? (samples[samples.length - 1].x - samples[0].x) / elapsed : 0;
            if (onCollapsedChange && next < minWidth && velocity < -flickVelocity) {
              dragStart.current = null;
              e.currentTarget.releasePointerCapture(e.pointerId);
              setDragWidth(null);
              onCollapsedChange(true);
              return;
            }
            setDragWidth(resist(next, minWidth, maxWidth));
          }}
          onPointerUp={(e) => {
            const start = dragStart.current;
            if (!start) return;
            dragStart.current = null;
            setDragWidth(null);
            const moved = e.clientX - start.x;
            // Pressed and let go without dragging: a click, which collapses it.
            if (Math.abs(moved) < 3 && onCollapsedChange) onCollapsedChange(true);
            else commitWidth(start.width + moved);
          }}
          onPointerCancel={() => {
            dragStart.current = null;
            setDragWidth(null);
          }}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 64 : 16;
            const next = { ArrowLeft: ownWidth - step, ArrowRight: ownWidth + step, Home: minWidth, End: maxWidth }[e.key];
            if (next !== undefined) {
              e.preventDefault();
              commitWidth(next);
            } else if (e.key === 'Enter') {
              onCollapsedChange?.(true);
            }
          }}
        />
      )}
    </Flex>
  );
}
