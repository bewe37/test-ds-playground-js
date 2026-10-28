import { theme as antdTheme } from 'antd';
import darkTokens from '../tokens/dark.json';
import lightTokens from '../tokens/light.json';
import './floating.css';

// Builds antd themes from the Figma variable exports in tokens/.
// Re-exporting from Figma only means replacing those JSON files.

// Figma exports references to other variables by ID. Map each ID to the token it points at.
// VariableID:26033:37175 is used for transparent fills (0% opacity) and the focus ring
// (controlOutline, 10% light / 15% dark); it is assumed to be the primary colour.
const aliases = {
  'VariableID:26033:37175': 'colorPrimary',
};

const fallbacks = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontFamilyCode: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
};

function hexToRgba(hex, alpha) {
  const value = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function resolve(key, value, file) {
  // Unset variables export as null; leave them to antd's default.
  if (value === null) return undefined;
  if (typeof value === 'object') {
    const target = aliases[value.color.id];
    const color = target && file.token[target];
    if (typeof color !== 'string') {
      console.warn(`[theme] Unknown Figma variable ${value.color.id} for "${key}"; using the antd default.`);
      return undefined;
    }
    return hexToRgba(color, Math.round(value.opacity) / 100);
  }
  if (typeof value === 'string' && key in fallbacks) {
    return `'${value}', ${fallbacks[key]}`;
  }
  return value;
}

function normalize(tokens, file) {
  const result = {};
  for (const [rawKey, value] of Object.entries(tokens)) {
    // Figma groups palette colours as "blue.1"; antd names them "blue1".
    const key = rawKey.replace(/^([a-z]+)\.(\d+)$/, '$1$2');
    const resolved = resolve(key, value, file);
    if (resolved !== undefined) result[key] = resolved;
  }
  return result;
}

// Figma values known to be wrong, corrected here until they're fixed in Figma.
// Delete an entry once the variable is fixed there.
function applyFixes(token, components) {
  // Tooltip text is colorTextLightSolid, which Figma sets to white on a #f4f4f4 background (light)
  // and to near-black on #27272a (dark). Keep the backgrounds; use body text so it reads on both.
  components.Tooltip = { ...components.Tooltip, colorTextLightSolid: token.colorText };

  // The checkmark and radio dot are colorWhite, drawn on colorPrimary. In dark mode Figma sets both
  // to #eeeeee, so a checked box is a blank square. Use the on-primary colour, as buttons do.
  for (const name of ['Checkbox', 'Tree', 'TreeSelect', 'Cascader']) {
    components[name] = { ...components[name], colorWhite: token.colorTextLightSolid };
  }
  components.Radio = { ...components.Radio, radioColor: token.colorTextLightSolid };
  // Same for the switch handle on the checked track.
  components.Switch = { ...components.Switch, handleBg: token.colorTextLightSolid };

  // Solid danger buttons use dangerColor, which Figma sets to the on-primary colour: dark text in
  // dark mode, where the primary is light. On red it needs light text in both modes.
  components.Button = { ...components.Button, dangerColor: token.colorWhite };
  // Badge counts and ribbons sit on status colours (red, green, ...), so the same applies.
  components.Badge = { ...components.Badge, colorTextLightSolid: token.colorWhite };

  // antd's default blue, left in Figma for hover and range states. Use the neutral equivalents.
  const selectedBg = token.controlItemBgActive;
  token.controlItemBgActiveHover = selectedBg;
  for (const name of ['Dropdown', 'Table', 'Transfer', 'Splitter']) {
    components[name] = { ...components[name], controlItemBgActiveHover: selectedBg };
  }
  components.Table = { ...components.Table, rowSelectedHoverBg: selectedBg };
  for (const name of ['DatePicker', 'TimePicker']) {
    components[name] = { ...components[name], cellHoverWithRangeBg: token.controlItemBgHover, cellRangeBorderColor: token.colorBorder };
  }
  components.Steps = { ...components.Steps, finishIconBorderColor: token.colorPrimary };
  components.Slider = { ...components.Slider, trackHoverBg: token.colorTextQuaternary };
}

// Floating surfaces (tooltips, popovers, dropdowns, menus, pickers, modals, notifications) get a
// 1px outline and a faint shadow instead of antd's heavy three-layer shadow. The outline is
// translucent rather than colorBorder, so it tints whatever is behind it and reads as an edge.
const floating = {
  light: { outline: 'rgba(0, 0, 0, 0.08)', contact: 'rgba(0, 0, 0, 0.04)', shadow: 'rgba(0, 0, 0, 0.06)' },
  dark: { outline: 'rgba(255, 255, 255, 0.1)', contact: 'rgba(0, 0, 0, 0.24)', shadow: 'rgba(0, 0, 0, 0.32)' },
};

// The one outline + shadow every floating surface uses. A tight contact shadow grounds the edge;
// the wide one lifts the surface.
function floatingShadow(mode) {
  const { outline, contact, shadow } = floating[mode];
  return `0 0 0 1px ${outline}, 0 1px 2px ${contact}, 0 4px 12px -2px ${shadow}`;
}

function applyFloatingSurfaces(token, components, mode) {
  const boxShadow = floatingShadow(mode);

  token.boxShadowSecondary = boxShadow;
  // Tooltip and Popover shadow their whole root with filter: drop-shadow, which only approximates
  // box-shadow. Turn it off; floatingConfigs gives their body the same box-shadow as everything else.
  token.dropShadowPopover = 'none';
  // Arrows that antd shadows (Tour, Dropdown with `arrow`, range pickers) draw it on a square rotated
  // so its corner is the tip, with the inner half clipped. A 1px ring on it traces the arrow's two edges.
  token.boxShadowPopoverArrow = `0 0 0 1px ${floating[mode].outline}`;
  // These read the general shadow tokens, which non-floating components share, so override them per component.
  for (const name of ['Modal', 'Notification', 'Message']) components[name] = { ...components[name], boxShadow };
  components.Tour = { ...components.Tour, boxShadowTertiary: boxShadow };

  // In light mode they sit on white, outlined, rather than on Figma's grey #fafafa / #f4f4f4.
  // Figma sets colorBgElevated per component too, so override it on each floating one.
  if (mode === 'light') {
    const surface = token.colorBgContainer;
    token.colorBgElevated = surface;
    for (const name of ['Dropdown', 'Select', 'AutoComplete', 'TreeSelect', 'Cascader', 'DatePicker', 'TimePicker', 'Popover', 'Menu', 'Notification', 'Tour']) {
      components[name] = { ...components[name], colorBgElevated: surface };
    }
    for (const name of ['Modal', 'Message']) components[name] = { ...components[name], contentBg: surface };
  }

  // Tooltips match the other surfaces: Figma gives them their own background (#27272a in dark)
  // and a smaller radius.
  components.Tooltip = { ...components.Tooltip, colorBgSpotlight: token.colorBgElevated, borderRadius: token.borderRadiusLG };
}

// Design decisions made here ahead of Figma. Move them into the Figma variables once settled.
function applyAdjustments(token, components, mode) {
  if (mode === 'light') {
    // Unselected menu items were #595959, which competed with the selected item. The neutral scale
    // jumps from there to #a8a8a8 (the disabled colour, too faint for labels), so this sits between:
    // the lightest grey that still passes WCAG AA for text on white (4.7:1).
    const itemColor = '#737373';
    components.Menu = { ...components.Menu, itemColor, subMenuItemSelectedColor: itemColor };
  }

  // Segmented: hovering only brightens the label; only the selected option gets a surface, and it's
  // clearly lighter than the track. Figma had a hover fill brighter than the selected thumb (dark
  // #151516 on a #101012 track) and idle labels nearly as bright as hovered ones (#dddddd vs #eeeeee).
  components.Segmented = {
    ...components.Segmented,
    itemHoverBg: 'transparent',
    itemActiveBg: 'transparent',
    // Light: white on the grey track. Dark: the selected-option fill dropdowns and selects use.
    itemSelectedBg: mode === 'light' ? token.colorBgContainer : token.controlItemBgActive,
    // Dark's neutral scale jumps from #dddddd to #656565 (fails AA); this sits between at 7.5:1 on the track.
    itemColor: mode === 'light' ? token.colorTextTertiary : '#a3a3a3',
    // The selected thumb's shadow: the floating surfaces' outline, inset so it stays clear of the
    // track's 2px padding, over a faint contact shadow.
    boxShadowTertiary: `inset 0 0 0 1px ${floating[mode].outline}, 0 1px 2px ${floating[mode].contact}`,
  };

  // The app shell's base colour behind pages (Code-V1 Application Shell, where it's colorBgElevated):
  // #fafafa light, #181819 dark. Figma's Layout bodyBg is colorBgLayout, #f4f4f4 / #101012.
  components.Layout = { ...components.Layout, bodyBg: mode === 'light' ? token.neutral2 : token.neutral3 };
}

function buildTheme(file, algorithm, mode) {
  const token = normalize(file.token, file);
  const components = Object.fromEntries(
    Object.entries(file.components).map(([name, tokens]) => [name, normalize(tokens, file)]),
  );
  applyFixes(token, components);
  applyFloatingSurfaces(token, components, mode);
  applyAdjustments(token, components, mode);
  return { algorithm, token, components };
}

export const themes = {
  light: buildTheme(lightTokens, antdTheme.defaultAlgorithm, 'light'),
  dark: buildTheme(darkTokens, antdTheme.darkAlgorithm, 'dark'),
};

// Styles antd has no token for, passed to ConfigProvider's typography prop.
// -1% letter spacing is -0.01em, so it scales with each text size.
export const typography = { style: { letterSpacing: '-0.01em' } };

// Tooltip, Popover and Popconfirm outlines, also passed to ConfigProvider. A real 1px border on the
// body. Tooltips and popovers drop the arrow; Popconfirm keeps it, outlined by floating.css, since
// its arrow points at the action being confirmed.
function buildFloatingConfig(mode) {
  const { outline } = floating[mode];
  const container = { boxShadow: floatingShadow(mode) };
  // floating.css reads the outline colour from this variable.
  const root = { '--floating-outline': outline };
  // Danger dropdown items (e.g. Log out) are colorError text, and colorError behind dark text on
  // hover. Dark's #d32029 manages 3.5:1 and 3.6:1, short of AA's 4.5:1; its lighter red passes both
  // (6:1). A component-level colorError token doesn't reach it (antd's CSS-variable mode reads the
  // global variable), so floating.css redefines the variable on the menu, from --floating-danger.
  const dropdown =
    mode === 'dark'
      ? {
          classNames: { root: 'floating-danger' },
          styles: { root: { '--floating-danger': themes.dark.token?.colorErrorTextHover } },
        }
      : {};
  return {
    dropdown,
    tooltip: { arrow: false, styles: { container } },
    popover: { arrow: false, styles: { container } },
    popconfirm: { classNames: { root: 'floating-arrow' }, styles: { root, container } },
  };
}

export const floatingConfigs = {
  light: buildFloatingConfig('light'),
  dark: buildFloatingConfig('dark'),
};

export const antdDefaultThemes = {
  light: { algorithm: antdTheme.defaultAlgorithm },
  dark: { algorithm: antdTheme.darkAlgorithm },
};
