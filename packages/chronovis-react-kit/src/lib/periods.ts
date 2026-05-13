export function intersectsPeriodRange(
  eventStart: string,
  eventEnd: string | undefined,
  rangeStart: string,
  rangeEnd: string
) {
  const start = new Date(eventStart).getTime();
  const end = new Date(eventEnd ?? eventStart).getTime();
  const periodStart = new Date(rangeStart).getTime();
  const periodEnd = new Date(rangeEnd).getTime();

  return start <= periodEnd && end >= periodStart;
}
