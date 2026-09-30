// ==========================================================================
// Shared constants — timing, breakpoints, and other tunables.
// Hoist values here when they're used in more than one place.
// ==========================================================================

// Breakpoint at which the sidebar transitions from desktop-collapse to
// mobile-overlay behavior. Mirrors Bootstrap's `lg` breakpoint.
export const MOBILE_BREAKPOINT_PX = 992;

// Debounce / throttle delays (ms)
export const RESIZE_DEBOUNCE_MS = 150;
export const FORM_SUBMIT_FEEDBACK_MS = 300;
export const FORM_SUBMIT_LONG_FEEDBACK_MS = 1500;

// Polling intervals (ms)
export const REALTIME_FAST_POLL_MS = 1000;
export const REALTIME_DASHBOARD_POLL_MS = 30000;
export const SIMULATE_PRESENCE_MS = 10000;
export const SIMULATE_INBOUND_MS = 15000;

// UI animation tunables
export const STAT_ANIMATION_DURATION_MS = 1000;
export const STAT_ANIMATION_STEPS = 30;
