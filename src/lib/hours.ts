// Pure open/closed logic, kept dependency-free so it can be tested with plain Node.

export type Hours = { open: number; close: number; workdays: readonly number[]; tz: string };
export type Status = { open: true; closesLabel: string } | { open: false; opensLabel: string };

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** 450 -> "7:30am", 990 -> "4:30pm", 480 -> "8am" */
export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h < 12 ? "am" : "pm";
  return `${h % 12 === 0 ? 12 : h % 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${suffix}`;
}

/** Day of week (0 = Sun) and minutes after midnight of `date` in the practice's time zone. */
function localDayMinutes(date: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const day = DAYS.indexOf(parts.find((p) => p.type === "weekday")?.value ?? "");
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { day, minutes: hour * 60 + minute };
}

/**
 * Open on `workdays` between `open` and `close` (minutes) in `tz`. When closed, also says when
 * the office opens next: "Opens today 7:30am" before opening, otherwise "Opens Mon 7:30am".
 */
export function statusAt(date: Date, hours: Hours): Status {
  const { day, minutes } = localDayMinutes(date, hours.tz);
  const isWorkday = (d: number) => hours.workdays.includes(d);
  if (isWorkday(day) && minutes >= hours.open && minutes < hours.close) {
    return { open: true, closesLabel: `Until ${formatTime(hours.close)}` };
  }

  const at = formatTime(hours.open);
  if (isWorkday(day) && minutes < hours.open) return { open: false, opensLabel: `Opens today ${at}` };

  let next = (day + 1) % 7;
  while (!isWorkday(next)) next = (next + 1) % 7;
  const label = next === (day + 1) % 7 ? "tomorrow" : DAYS[next];
  return { open: false, opensLabel: `Opens ${label} ${at}` };
}
