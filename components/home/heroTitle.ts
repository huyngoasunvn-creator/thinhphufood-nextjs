const LEADING_WEAK_WORDS = new Set([
  'va',
  'và',
  'cho',
  'cua',
  'của',
  'voi',
  'với',
  'tai',
  'tại',
  'tu',
  'từ',
  'den',
  'đến',
  'trong',
  'tren',
  'trên',
]);

const TRAILING_WEAK_WORDS = new Set([
  'va',
  'và',
  'cho',
  'cua',
  'của',
  'voi',
  'với',
  'tu',
  'từ',
  'la',
  'là',
  'mot',
  'một',
]);

const normalizeText = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, ' ');

const getTargetLineCount = (words: string[]) => {
  if (words.length <= 4) return 2;
  if (words.length <= 8) return 3;
  return 4;
};

const getLinePenalty = (
  words: string[],
  start: number,
  end: number,
  targetLength: number
) => {
  const lineWords = words.slice(start, end);
  const line = lineWords.join(' ');
  const firstWord = lineWords[0]?.toLowerCase() || '';
  const lastWord = lineWords[lineWords.length - 1]?.toLowerCase() || '';

  let penalty = Math.pow(line.length - targetLength, 2);

  if (LEADING_WEAK_WORDS.has(firstWord)) {
    penalty += 120;
  }

  if (TRAILING_WEAK_WORDS.has(lastWord)) {
    penalty += 120;
  }

  if (lineWords.length === 1 && words.length > 4) {
    penalty += 80;
  }

  return penalty;
};

export const splitHeroTitle = (title?: string | null) => {
  const rawTitle = title || '';
  const normalizedTitle = normalizeText(rawTitle);

  if (!normalizedTitle) {
    return [];
  }

  if (rawTitle.includes('\n')) {
    return rawTitle
      .split('\n')
      .map((line) => normalizeText(line))
      .filter(Boolean);
  }

  const words = normalizedTitle.split(' ').filter(Boolean);

  if (words.length <= 3) {
    return [normalizedTitle];
  }

  const lineCount = Math.min(getTargetLineCount(words), words.length);
  const targetLength = normalizedTitle.length / lineCount;
  const dp = Array.from({ length: lineCount + 1 }, () =>
    Array(words.length + 1).fill(Number.POSITIVE_INFINITY)
  );
  const nextBreak = Array.from({ length: lineCount }, () =>
    Array(words.length + 1).fill(-1)
  );

  dp[lineCount][words.length] = 0;

  for (let lineIndex = lineCount - 1; lineIndex >= 0; lineIndex -= 1) {
    for (let wordIndex = words.length - 1; wordIndex >= 0; wordIndex -= 1) {
      const remainingWords = words.length - wordIndex;
      const remainingLines = lineCount - lineIndex;

      for (
        let breakIndex = wordIndex + 1;
        breakIndex <= words.length - (remainingLines - 1);
        breakIndex += 1
      ) {
        const currentLinePenalty = getLinePenalty(
          words,
          wordIndex,
          breakIndex,
          targetLength
        );
        const nextPenalty = dp[lineIndex + 1][breakIndex];

        if (!Number.isFinite(nextPenalty)) {
          continue;
        }

        let totalPenalty = currentLinePenalty + nextPenalty;

        if (remainingWords === remainingLines) {
          totalPenalty += 60;
        }

        if (totalPenalty < dp[lineIndex][wordIndex]) {
          dp[lineIndex][wordIndex] = totalPenalty;
          nextBreak[lineIndex][wordIndex] = breakIndex;
        }
      }
    }
  }

  const lines: string[] = [];
  let currentIndex = 0;

  for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
    const breakIndex = nextBreak[lineIndex][currentIndex];

    if (breakIndex === -1) {
      break;
    }

    lines.push(words.slice(currentIndex, breakIndex).join(' '));
    currentIndex = breakIndex;
  }

  return lines.length > 0 ? lines : [normalizedTitle];
};
