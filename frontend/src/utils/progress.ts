import { PROBLEMS, RANK_TIERS, type Problem, type RankTier, type Topic } from '../data/problems';

const progressKey = 'codme_academy_progress_v1';

export type AcademyProgress = {
  solved: string[];
  bookmarked: string[];
  favorites: string[];
  xp: number;
  streak: number;
  bestStreak: number;
  lastSolvedDate: string | null;
  dailySolved: Record<string, string[]>;
  remindersEnabled: boolean;
};

export type ProgressSummary = {
  solvedSet: Set<string>;
  bookmarkedSet: Set<string>;
  favoriteSet: Set<string>;
  solvedCount: number;
  completion: number;
  xp: number;
  rank: RankTier;
  nextRank: RankTier | null;
  rankProgress: number;
  streak: number;
  bestStreak: number;
  todaySolved: number;
  dailyGoal: number;
  topicMastery: { topic: Topic; solved: number; total: number; percent: number }[];
  nextProblem: Problem;
};

const rankThresholds: Record<RankTier, number> = {
  Beginner: 0,
  Silver: 300,
  Gold: 900,
  Platinum: 1800,
  Diamond: 3200,
  Master: 5000,
  Grandmaster: 7600,
  Iridescent: 10800,
};

const emptyProgress: AcademyProgress = {
  solved: [],
  bookmarked: [],
  favorites: [],
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastSolvedDate: null,
  dailySolved: {},
  remindersEnabled: false,
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

export function loadProgress(): AcademyProgress {
  try {
    const raw = localStorage.getItem(progressKey);
    if (!raw) return migrateOldProgress(emptyProgress);
    return migrateOldProgress({ ...emptyProgress, ...JSON.parse(raw) });
  } catch {
    return migrateOldProgress(emptyProgress);
  }
}

export function saveProgress(progress: AcademyProgress) {
  localStorage.setItem(progressKey, JSON.stringify({
    ...progress,
    solved: unique(progress.solved),
    bookmarked: unique(progress.bookmarked),
    favorites: unique(progress.favorites),
  }));
  localStorage.setItem('codme_solved', JSON.stringify(unique(progress.solved)));
}

function migrateOldProgress(progress: AcademyProgress): AcademyProgress {
  try {
    const legacySolved = JSON.parse(localStorage.getItem('codme_solved') || '[]') as string[];
    if (legacySolved.length) {
      progress = { ...progress, solved: unique([...progress.solved, ...legacySolved]) };
      progress.xp = Math.max(progress.xp, progress.solved.reduce((sum, id) => sum + (PROBLEMS.find((problem) => problem.id === id)?.xp || 0), 0));
    }
  } catch {
    // Ignore corrupt legacy data.
  }
  return progress;
}

export function markSolved(problem: Problem) {
  const progress = loadProgress();
  const alreadySolved = progress.solved.includes(problem.id);
  const today = todayKey();
  const yesterday = yesterdayKey();
  const dailySolved = {
    ...progress.dailySolved,
    [today]: unique([...(progress.dailySolved[today] || []), problem.id]),
  };

  const nextProgress: AcademyProgress = {
    ...progress,
    solved: alreadySolved ? progress.solved : [...progress.solved, problem.id],
    xp: alreadySolved ? progress.xp : progress.xp + problem.xp,
    lastSolvedDate: today,
    dailySolved,
    streak:
      progress.lastSolvedDate === today
        ? progress.streak || 1
        : progress.lastSolvedDate === yesterday
          ? progress.streak + 1
          : 1,
    bestStreak: progress.bestStreak,
  };
  nextProgress.bestStreak = Math.max(nextProgress.bestStreak, nextProgress.streak);
  saveProgress(nextProgress);
  return nextProgress;
}

export function toggleBookmark(problemId: string) {
  const progress = loadProgress();
  const bookmarked = progress.bookmarked.includes(problemId)
    ? progress.bookmarked.filter((id) => id !== problemId)
    : [...progress.bookmarked, problemId];
  saveProgress({ ...progress, bookmarked });
}

export function toggleFavorite(problemId: string) {
  const progress = loadProgress();
  const favorites = progress.favorites.includes(problemId)
    ? progress.favorites.filter((id) => id !== problemId)
    : [...progress.favorites, problemId];
  saveProgress({ ...progress, favorites });
}

export function setReminderPreference(enabled: boolean) {
  const progress = loadProgress();
  saveProgress({ ...progress, remindersEnabled: enabled });
}

export function getRank(xp: number) {
  let rank: RankTier = 'Beginner';
  for (const tier of RANK_TIERS) {
    if (xp >= rankThresholds[tier]) rank = tier;
  }
  return rank;
}

export function summarizeProgress(progress = loadProgress()): ProgressSummary {
  const solvedSet = new Set(progress.solved);
  const bookmarkedSet = new Set(progress.bookmarked);
  const favoriteSet = new Set(progress.favorites);
  const rank = getRank(progress.xp);
  const rankIndex = RANK_TIERS.indexOf(rank);
  const nextRank = RANK_TIERS[rankIndex + 1] || null;
  const currentXp = rankThresholds[rank];
  const nextXp = nextRank ? rankThresholds[nextRank] : currentXp + 1;
  const topicTotals = new Map<Topic, { solved: number; total: number }>();

  for (const problem of PROBLEMS) {
    const current = topicTotals.get(problem.topic) || { solved: 0, total: 0 };
    current.total += 1;
    if (solvedSet.has(problem.id)) current.solved += 1;
    topicTotals.set(problem.topic, current);
  }

  const nextProblem = PROBLEMS.find((problem, index) => !solvedSet.has(problem.id) && (index === 0 || solvedSet.has(PROBLEMS[index - 1].id))) || PROBLEMS[0];

  return {
    solvedSet,
    bookmarkedSet,
    favoriteSet,
    solvedCount: solvedSet.size,
    completion: Math.round((solvedSet.size / PROBLEMS.length) * 100),
    xp: progress.xp,
    rank,
    nextRank,
    rankProgress: Math.min(100, Math.round(((progress.xp - currentXp) / (nextXp - currentXp)) * 100)),
    streak: progress.streak,
    bestStreak: progress.bestStreak,
    todaySolved: progress.dailySolved[todayKey()]?.length || 0,
    dailyGoal: 2,
    topicMastery: Array.from(topicTotals.entries())
      .map(([topic, value]) => ({ topic, ...value, percent: Math.round((value.solved / value.total) * 100) }))
      .sort((a, b) => b.percent - a.percent || b.total - a.total),
    nextProblem,
  };
}

export async function requestDailyReminderPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') {
    setReminderPreference(true);
    return 'granted';
  }
  const permission = await Notification.requestPermission();
  setReminderPreference(permission === 'granted');
  return permission;
}
