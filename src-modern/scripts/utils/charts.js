// ==========================================================================
// Chart.js — shared preset
// ==========================================================================
//
// The one place chart styling lives. Components import `createChart` (and the
// small helpers below) from here, never from 'chart.js' directly, because:
//
//   - Only the controllers, elements, scales and plugins this template renders
//     are registered, so the rest of Chart.js is tree-shaken out. Using a new
//     chart type means registering it here, or Chart.js throws
//     `"xyz" is not a registered controller`.
//   - `applyChartTheme()` maps the design tokens (the same CSS variables the
//     rest of the UI uses) onto `Chart.defaults`: Inter, muted tick labels,
//     subtle dashed horizontal gridlines, no vertical grid, rounded bars,
//     circular point styles, and tooltips styled as the panel surface.
//   - Switching light/dark re-themes every live chart. A MutationObserver on
//     <html data-bs-theme> re-reads the tokens and calls `chart.update()`.
//     Series colours come from `chart-palette.js`; pass them as functions
//     (`() => accent()`) so they are re-resolved on that update too.
//
// Currently rendered: line (+ area fill), bar (vertical, horizontal, stacked),
// doughnut (+ gauge), polarArea, radar, treemap.
//
// ==========================================================================

import {
  Chart,
  LineController,
  BarController,
  DoughnutController,
  PolarAreaController,
  RadarController,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js';
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap';

Chart.register(
  LineController,
  BarController,
  DoughnutController,
  PolarAreaController,
  RadarController,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Filler,
  Legend,
  Tooltip,
  TreemapController,
  TreemapElement
);

export { Chart };

// ── Tokens ────────────────────────────────────────────────────────────────

function token(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/** Hex (#rgb / #rrggbb) → rgba() with the given alpha. Other formats pass through. */
export function alpha(hex, a) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  let h = m[1];
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

// ── Defaults ──────────────────────────────────────────────────────────────

export function applyChartTheme() {
  const d = Chart.defaults;
  const muted = token('--ink-muted', '#71717a');
  const secondary = token('--ink-secondary', '#52525b');
  const primary = token('--ink-primary', '#18181b');
  const border = token('--bs-border-color', '#e4e4e7');
  const panel = token('--surface-panel', '#ffffff');

  d.font.family = getComputedStyle(document.body).fontFamily || token('--bs-body-font-family', 'sans-serif');
  d.font.size = 12;
  d.color = muted;
  d.borderColor = border;
  d.responsive = true;
  d.maintainAspectRatio = false;
  d.animation.duration = 500;

  // Lines: smooth, no markers until hover.
  d.elements.line.tension = 0.4;
  d.elements.line.borderWidth = 2;
  d.elements.line.borderCapStyle = 'round';
  d.elements.point.radius = 0;
  d.elements.point.hoverRadius = 5;
  d.elements.point.hitRadius = 10;
  d.elements.point.hoverBorderWidth = 2;
  d.elements.point.pointStyle = 'circle';

  // Rounded bars, capped so a 7-bar chart does not turn into slabs.
  d.elements.bar.borderRadius = 6;
  d.datasets.bar.maxBarThickness = 48;

  // Slices: a thin ring in the panel colour separates adjacent arcs.
  d.elements.arc.borderWidth = 2;
  d.elements.arc.borderColor = panel;

  // Scales: subtle dashed gridlines, no axis rule, no tick marks.
  d.scale.grid.color = border;
  d.scale.grid.drawTicks = false;
  d.scale.border.display = false;
  d.scale.border.dash = [4, 4];
  d.scale.ticks.padding = 8;
  d.scale.ticks.color = muted;

  // Legend: small dots, secondary ink.
  const legend = d.plugins.legend;
  legend.labels.usePointStyle = true;
  legend.labels.pointStyle = 'circle';
  legend.labels.boxWidth = 8;
  legend.labels.boxHeight = 8;
  legend.labels.padding = 16;
  legend.labels.color = secondary;

  // Tooltip: the panel surface with a hairline border, as the UI's popovers.
  const tip = d.plugins.tooltip;
  tip.backgroundColor = panel;
  tip.borderColor = border;
  tip.borderWidth = 1;
  tip.cornerRadius = 8;
  tip.padding = { x: 12, y: 10 };
  tip.caretSize = 5;
  tip.titleColor = primary;
  tip.titleFont = { weight: '600' };
  tip.titleMarginBottom = 6;
  tip.bodyColor = secondary;
  tip.bodySpacing = 4;
  tip.boxPadding = 6;
  tip.boxWidth = 8;
  tip.boxHeight = 8;
  tip.usePointStyle = true;
}

applyChartTheme();

// Re-theme every live chart when the colour mode changes, whichever control
// changed it (header switch, ThemeManager, OS preference). The update is
// direct ('none'): an animated update leaves some elements (treemap cells)
// holding the colours they were drawn with, and the page itself switches
// colours instantly anyway.
new MutationObserver(() => {
  applyChartTheme();
  Object.values(Chart.instances).forEach((chart) => chart.update('none'));
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });

// ── Mounting ──────────────────────────────────────────────────────────────

/**
 * Render a chart into a container <div>.
 *
 * A fixed-height wrapper + <canvas> is appended to the container, so page
 * markup keeps using plain `<div id="…Chart">` placeholders. Chart.js observes
 * the wrapper and resizes with it (window resize and sidebar toggle included).
 *
 * @param {HTMLElement} container
 * @param {object} config       - Chart.js config
 * @param {object} [opts]
 * @param {number} [opts.height=300]      - canvas height in px
 * @param {Array<[number, number]>} [opts.responsiveHeight] - [maxWidth, height]
 *        pairs, widest first; the last one whose max-width matches wins
 * @param {string} [opts.label]           - accessible name for the canvas
 * @returns {Chart|null}
 */
export function createChart(container, config, { height = 300, responsiveHeight = [], label } = {}) {
  if (!container) return null;
  destroyChart(container);

  const wrap = document.createElement('div');
  wrap.className = 'chart-canvas-wrap';
  const canvas = document.createElement('canvas');
  canvas.setAttribute('role', 'img');
  const name = label || container.getAttribute('aria-label') || container.closest('.card')?.querySelector('.card-title')?.textContent?.trim();
  if (name) canvas.setAttribute('aria-label', name);
  wrap.appendChild(canvas);
  container.replaceChildren(wrap);

  const setHeight = () => {
    let h = height;
    for (const [maxWidth, value] of responsiveHeight) {
      if (window.matchMedia(`(max-width: ${maxWidth - 0.02}px)`).matches) h = value;
    }
    wrap.style.height = `${h}px`;
  };
  setHeight();

  const chart = new Chart(canvas, config);
  if (responsiveHeight.length) {
    const onResize = () => setHeight();
    window.addEventListener('resize', onResize);
    const destroy = chart.destroy.bind(chart);
    chart.destroy = () => {
      window.removeEventListener('resize', onResize);
      destroy();
    };
  }
  return chart;
}

/** Destroy the chart rendered into `container`, if any. */
export function destroyChart(container) {
  const canvas = container?.querySelector('canvas');
  if (canvas) Chart.getChart(canvas)?.destroy();
}

// ── Option builders ───────────────────────────────────────────────────────

/**
 * Vertical gradient for an area fill. Scriptable, so it is rebuilt against the
 * current chart area on every resize and re-resolved on a theme change.
 *
 * @param {() => string} colour - returns a hex colour (e.g. `() => accent()`)
 */
export function areaGradient(colour, from = 0.3, to = 0.02) {
  return ({ chart }) => {
    const c = colour();
    const area = chart.chartArea;
    if (!area) return alpha(c, from);
    const g = chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
    g.addColorStop(0, alpha(c, from));
    g.addColorStop(1, alpha(c, to));
    return g;
  };
}

/**
 * Category + value axes. Only the value axis draws (dashed) gridlines.
 *
 * @param {object} [o]
 * @param {boolean} [o.horizontal] - value axis on x (indexAxis: 'y')
 * @param {boolean} [o.stacked]
 * @param {(v: number) => string} [o.format] - value-axis tick formatter
 * @param {string} [o.title] - value-axis title
 * @param {string} [o.categoryTitle]
 * @param {boolean} [o.beginAtZero=true] - false auto-ranges the value axis
 */
export function cartesianScales({ horizontal = false, stacked = false, format, title, categoryTitle, beginAtZero = true } = {}) {
  const category = {
    stacked,
    grid: { display: false },
    ticks: { maxRotation: 0, autoSkipPadding: 12 },
    ...(categoryTitle && { title: { display: true, text: categoryTitle } }),
  };
  const value = {
    stacked,
    beginAtZero,
    ...(!beginAtZero && { grace: '10%' }),
    grid: { display: true },
    ticks: { maxTicksLimit: 6, ...(format && { callback: (v) => format(v) }) },
    ...(title && { title: { display: true, text: title } }),
  };
  return horizontal ? { x: value, y: category } : { x: category, y: value };
}

/** Axes, legend and tooltip hidden — for inline sparklines. */
export const sparklineOptions = {
  animation: false,
  layout: { padding: 2 },
  scales: { x: { display: false }, y: { display: false, grace: '10%' } },
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  elements: { point: { radius: 0, hoverRadius: 0 } },
};

/**
 * Centre text for doughnuts used as gauges / progress rings. Inline plugin —
 * add it to a chart's `plugins: []` and configure through
 * `options.plugins.centerText = { value: () => string, label?: string }`.
 */
export const centerTextPlugin = {
  id: 'centerText',
  afterDatasetsDraw(chart, _args, opts) {
    const arc = chart.getDatasetMeta(0)?.data?.[0];
    if (!arc || !opts?.value) return;
    const { ctx } = chart;
    const { x, y } = arc;
    const family = Chart.defaults.font.family;
    const value = typeof opts.value === 'function' ? opts.value(chart) : opts.value;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (opts.label) {
      ctx.font = `500 12px ${family}`;
      ctx.fillStyle = token('--ink-muted', '#71717a');
      ctx.fillText(opts.label, x, y - 16);
    }
    ctx.font = `600 28px ${family}`;
    ctx.fillStyle = token('--ink-primary', '#18181b');
    ctx.fillText(value, x, opts.label ? y + 10 : y);
    ctx.restore();
  },
};

/**
 * Values printed inside the end of each bar (horizontal or vertical). Inline
 * plugin — add it to `plugins: []` and configure through
 * `options.plugins.barValues = { format?: (v) => string, color?: string | (datasetIndex) => string }`.
 * A label that does not fit inside its bar is drawn just past the end instead.
 */
export const barValuesPlugin = {
  id: 'barValues',
  afterDatasetsDraw(chart, _args, opts) {
    const { ctx } = chart;
    const horizontal = chart.options.indexAxis === 'y';
    const format = opts?.format || ((v) => Number(v).toLocaleString());
    ctx.save();
    ctx.font = `600 11px ${Chart.defaults.font.family}`;
    chart.data.datasets.forEach((dataset, di) => {
      const meta = chart.getDatasetMeta(di);
      if (meta.hidden) return;
      meta.data.forEach((bar, i) => {
        const text = format(dataset.data[i]);
        const width = ctx.measureText(text).width;
        const { x, y, base } = bar.getProps(['x', 'y', 'base'], true);
        const room = Math.abs((horizontal ? x : y) - base);
        const inside = room > (horizontal ? width + 12 : 20);
        const fill = typeof opts?.color === 'function' ? opts.color(di) : opts?.color;
        ctx.fillStyle = inside ? fill || '#ffffff' : Chart.defaults.color;
        ctx.textBaseline = 'middle';
        if (horizontal) {
          ctx.textAlign = inside ? 'right' : 'left';
          ctx.fillText(text, inside ? x - 8 : x + 6, y);
        } else {
          ctx.textAlign = 'center';
          ctx.fillText(text, x, inside ? y + 10 : y - 8);
        }
      });
    });
    ctx.restore();
  },
};

/**
 * Each slice's share of the total, printed on the slice (doughnut / pie).
 * Inline plugin — add it to `plugins: []`; `options.plugins.sliceLabels =
 * { color?: string, min?: number }` hides labels on slices under `min` %.
 */
export const sliceLabelsPlugin = {
  id: 'sliceLabels',
  afterDatasetsDraw(chart, _args, opts) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    const values = chart.data.datasets[0]?.data || [];
    const total = values.reduce((sum, v) => sum + (Number(v) || 0), 0);
    if (!total) return;
    ctx.save();
    ctx.font = `600 11px ${Chart.defaults.font.family}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = opts?.color || '#ffffff';
    meta.data.forEach((arc, i) => {
      const share = (values[i] / total) * 100;
      if (!chart.getDataVisibility(i) || share < (opts?.min ?? 5)) return;
      const { x, y } = arc.tooltipPosition();
      ctx.fillText(`${share.toFixed(1)}%`, x, y);
    });
    ctx.restore();
  },
};
