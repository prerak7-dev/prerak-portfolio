const monthNumbers = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function parseTimelinePoint(value, isEnd = false) {
  const clean = String(value || '').trim();
  if (!clean || /ongoing|present|current/i.test(clean)) return null;
  const monthMatch = clean.match(/^([A-Za-z]{3,})\s+(\d{4})$/);
  if (monthMatch) {
    const month = monthNumbers[monthMatch[1].slice(0, 3).toLowerCase()] ?? 0;
    return new Date(Number(monthMatch[2]), month + (isEnd ? 1 : 0), isEnd ? 0 : 1);
  }
  const yearMatch = clean.match(/^(\d{4})$/);
  if (yearMatch) return new Date(Number(yearMatch[1]), isEnd ? 11 : 0, isEnd ? 31 : 1);
  return null;
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatTimelineDate(date) {
  return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export function normalizeTimelineItems(items) {
  let previousEnd = null;
  const timelineColors = ['#ef4444', '#0891b2', '#f97316', '#a3e635', '#f8c84e', '#9ca3af'];
  return items.map((item, index) => {
    const dateText = String(item.meta || '').split('/')[0].trim();
    const ongoing = /ongoing|present|current/i.test(dateText);
    const [startText, endText] = dateText.includes(' - ') ? dateText.split(' - ') : [dateText, dateText];
    const inferredStart = previousEnd ? addMonths(previousEnd, 1) : new Date(new Date().getFullYear(), 0, 1);
    const startDate = parseTimelinePoint(startText) || inferredStart;
    const endDate = ongoing ? new Date() : (parseTimelinePoint(endText, true) || startDate);
    previousEnd = endDate;
    return {
      ...item,
      sourceIndex: index,
      startDate,
      endDate,
      rangeLabel: ongoing ? `${formatTimelineDate(startDate)} - Present` : dateText,
      shortStart: startDate.getFullYear(),
      icon: getTimelineIconName(item),
      color: timelineColors[index % timelineColors.length],
    };
  }).sort((a, b) => a.startDate - b.startDate);
}

function getTimelineIconName(item) {
  const text = `${item.title} ${item.subtitle}`.toLowerCase();
  if (text.includes('data') || text.includes('analyst') || text.includes('analytics')) return 'analytics';
  if (text.includes('college') || text.includes('education') || text.includes('academic')) return 'school';
  if (text.includes('study') || text.includes('learning')) return 'menu_book';
  if (text.includes('developer') || text.includes('application') || text.includes('software')) return 'code';
  if (text.includes('tool') || text.includes('backend') || text.includes('system')) return 'extension';
  return 'work';
}

export function getTimelineBounds(items) {
  const start = new Date(Math.min(...items.map((item) => item.startDate.getTime())));
  const end = new Date(Math.max(...items.map((item) => item.endDate.getTime())));
  start.setMonth(0, 1);
  end.setMonth(11, 31);
  return {
    start,
    end,
    startLabel: String(start.getFullYear()),
    endLabel: end.getFullYear() === new Date().getFullYear() ? 'Present' : String(end.getFullYear()),
  };
}

export function positionOnTimeline(date, bounds) {
  const total = bounds.end.getTime() - bounds.start.getTime();
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, ((date.getTime() - bounds.start.getTime()) / total) * 100));
}
