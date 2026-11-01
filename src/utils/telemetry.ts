/**
 * Telemetry formatting utilities for the Celestial Telemetry Archive
 */

/**
 * Convert astronomical units to light-years
 */
export function auToLightYears(au: number): number {
  return au / 63241.077;
}

/**
 * Format astronomical units into human-readable distance.
 * For large interstellar distances (>= 1,000 AU), Light-Years (ly) is the primary unit.
 * For solar system scales (< 1,000 AU), AU is primary with light-years / km also noted.
 */
export function formatDistanceAU(au: number): string {
  if (au >= 1000) {
    const ly = au / 63241.077;
    return `${ly.toFixed(2)} ly (~${Math.round(au).toLocaleString('en-US')} AU)`;
  }
  if (au < 0.01) {
    const km = Math.round(au * 149597870.7);
    const ly = (au / 63241.077).toExponential(2);
    return `${au.toFixed(5)} AU (~${km.toLocaleString('en-US')} km · ${ly} ly)`;
  }
  const ly = (au / 63241.077).toFixed(5);
  return `${au.toFixed(2)} AU (~${ly} ly)`;
}

/**
 * Format compact distance label for badges, ladder rungs, and cards.
 * Uses Light-Years for stellar objects and AU for solar system targets.
 */
export function formatCompactDistance(au: number): string {
  if (au >= 1000) {
    const ly = au / 63241.077;
    return `${ly.toFixed(2)} ly`;
  }
  if (au < 0.01) {
    return `${au.toFixed(4)} AU`;
  }
  return `${au.toFixed(2)} AU`;
}

/**
 * Structured dual-unit distance representation (primary headline + secondary context)
 */
export function formatDualDistance(au: number): { primary: string; secondary: string; isLightYears: boolean } {
  if (au >= 1000) {
    const ly = au / 63241.077;
    return {
      primary: `${ly.toFixed(2)} ly`,
      secondary: `~${Math.round(au).toLocaleString()} AU`,
      isLightYears: true,
    };
  }
  if (au < 0.01) {
    const km = Math.round(au * 149597870.7);
    return {
      primary: `${au.toFixed(5)} AU`,
      secondary: `~${km.toLocaleString()} km`,
      isLightYears: false,
    };
  }
  const ly = (au / 63241.077).toFixed(5);
  return {
    primary: `${au.toFixed(2)} AU`,
    secondary: `~${ly} ly`,
    isLightYears: false,
  };
}

/**
 * Format distance in kilometers, with exponential representation for interstellar scales
 */
export function formatDistanceKM(au: number): string {
  const km = au * 149597870.7;
  if (km >= 1e12) {
    return `${km.toExponential(2)} km (~${(km / 1e12).toFixed(2)}T km)`;
  }
  return `~${Math.round(km).toLocaleString()} km`;
}

/**
 * Format light travel delay from minutes into seconds, minutes, hours, or years
 */
export function formatLightTravelTime(minutes: number): string {
  if (minutes < 0.1) {
    const seconds = (minutes * 60).toFixed(2);
    return `${seconds} seconds`;
  }
  if (minutes < 60) {
    return `${minutes.toFixed(1)} mins`;
  }
  if (minutes < 1440) {
    const hours = (minutes / 60).toFixed(1);
    return `${hours} hours`;
  }
  const years = (minutes / 525960).toFixed(1);
  return `${years} years`;
}

/**
 * Format apparent magnitude with sign and description
 */
export function formatMagnitude(mag: number): string {
  const sign = mag > 0 ? `+${mag.toFixed(2)}` : mag.toFixed(2);
  let brightness = 'Standard';
  if (mag <= -20) brightness = 'Daylight Incandescent';
  else if (mag <= -9) brightness = 'Dazzling Lunar';
  else if (mag <= -2) brightness = 'Brilliant Planet';
  else if (mag <= 1.5) brightness = '1st Magnitude Star';
  else if (mag <= 6.0) brightness = 'Naked Eye Limit';
  else brightness = 'Telescopic';

  return `${sign} (${brightness})`;
}

/**
 * Return human-readable Bortle class designation
 */
export function getBortleDescription(bortle: number): { label: string; color: string; bg: string } {
  switch (bortle) {
    case 1:
      return { label: 'Class 1: Excellent Dark Sky', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-500/40' };
    case 2:
      return { label: 'Class 2: Typical Truly Dark', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-500/40' };
    case 3:
      return { label: 'Class 3: Rural Sky', color: 'text-cyan-400', bg: 'bg-cyan-950/60 border-cyan-500/40' };
    case 4:
      return { label: 'Class 4: Rural/Suburban Transition', color: 'text-cyan-400', bg: 'bg-cyan-950/60 border-cyan-500/40' };
    case 5:
      return { label: 'Class 5: Suburban Sky', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-500/40' };
    case 6:
      return { label: 'Class 6: Bright Suburban', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-500/40' };
    case 7:
      return { label: 'Class 7: Suburban/Urban Transition', color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-500/40' };
    case 8:
    case 9:
      return { label: `Class ${bortle}: City / Inner-City Sky`, color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-500/40' };
    default:
      return { label: `Class ${bortle}`, color: 'text-zinc-400', bg: 'bg-zinc-900 border-zinc-700' };
  }
}

/**
 * Resolves rawImage path so both public web paths ('/images/...') and relative asset paths ('../../assets/...') work seamlessly
 */
export function resolveImagePath(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('/')) return path;
  if (path.includes('assets/sightings/')) {
    const filename = path.split('/').pop();
    return `/images/sightings/${filename}`;
  }
  return path;
}

/**
 * Category metadata for badges and colors
 */
export const CATEGORY_META: Record<string, { label: string; color: string; border: string; bg: string; icon: string }> = {
  'solar-system': {
    label: 'Solar System',
    color: 'text-amber-300',
    border: 'border-amber-500/40',
    bg: 'bg-amber-950/40',
    icon: '🪐',
  },
  'lunar': {
    label: 'Lunar',
    color: 'text-cyan-300',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-950/40',
    icon: '🌙',
  },
  'solar': {
    label: 'Solar',
    color: 'text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-950/40',
    icon: '☀️',
  },
  'deep-sky': {
    label: 'Deep Sky',
    color: 'text-fuchsia-400',
    border: 'border-fuchsia-500/40',
    bg: 'bg-fuchsia-950/40',
    icon: '🌌',
  },
  'stellar': {
    label: 'Stellar',
    color: 'text-blue-300',
    border: 'border-blue-500/40',
    bg: 'bg-blue-950/40',
    icon: '✨',
  },
};

