import { type Tournaments } from 'API';
import { type Option } from 'core/models/input.model';
import { type UpcomingGame } from 'features/teams/hooks/fetchUpcomingGames.hook';

/**
 * Function that generates an array of Option objects representing teams based on the input number of teams in the system.
 * It calculates the next three multiples of 8 from the input number, ensuring it's a multiple of 8 first.
 * If the input is 0, it generates four multiples of 8.
 * The generated Option objects have labels indicating the number of teams and values as strings of the team count.
 * If the input is 0, the first Option is removed; otherwise, an Option representing selecting all teams is added at the beginning.
 *
 * @param teamsInTheSystem The number of teams in the system to base the generation on.
 * @returns An array of Option objects representing teams with labels and values.
 */
export const getTeamsNumbers = (teamsInTheSystem: number): Option[] => {
  const teamsNumbers: Option[] = [];
  const teamNumb = teamsInTheSystem;
  // Increment teamsInTheSystem until it's a multiple of 8
  while (teamsInTheSystem % 8 !== 0) {
    teamsInTheSystem++;
  }
  // Generate the next three multiples of 8
  let iterator = 3;
  if (teamsInTheSystem === 0) {
    iterator = 4;
  };
  for (let i = 0; i < iterator; i++) {
    const teams = teamsInTheSystem + i * 8;
    teamsNumbers.push({ label: `${teams} Teams`, value: `${teams}` });
  }
  if (teamsInTheSystem === 0) {
    teamsNumbers.shift();
  } else {
    teamsNumbers.unshift({ label: `Select All ${teamNumb} teams`, value: `${teamNumb}` });
  }
  return teamsNumbers;
};
/**
 * Converts a given time string to a Date object based on the specified format.
 *
 * @param time The time string to convert to Date object (format: "HH:mm").
 * @param format The format of the time string (default: "HH:mm").
 * @returns A Date object representing the converted time.
 * @throws Error if the time string is not in the correct format ("HH:mm").
 * @throws Error if the specified format is not supported (only "HH:mm" is supported).
 */
export function timeToDate (time?: string | null, format = 'h:m', date?: Date | null): Date {
  if (time === null || time === undefined) {
    return new Date();
  }
  let now = new Date();
  if (date !== undefined && date !== null) {
    now = date;
  }
  const [hours, mins] = time.split(':').map((num) => (Number(num)));
  if (Number.isNaN(hours) || Number.isNaN(mins)) {
    throw new Error(`${time} isn't correct format, it should be "10:30" `);
  }
  switch (format) {
    case 'h:m':
      now.setHours(hours);
      now.setMinutes(mins);
      now.setSeconds(0);
      return now;
    default:
      throw new Error(`${format} is unsupported format, supported formats are "h:m".`);
  }
}

/**
 * Function that calculates the difference in minutes between two Date objects.
 *
 * @param date1 The first Date object.
 * @param date2 The second Date object.
 * @returns The difference in minutes between the two Date objects.
 */
export function getMinutesDifference (date1: Date, date2: Date): number {
  let diff = (date1.getTime() - date2.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

/**
 * Function that returns whether a tournament is currently active or not
 *
 * @param tournament tournament object
 * @returns whether there's an active tournament for parameter object
 */
export const isTournamentActive = (tournament: Tournaments): boolean => {
  if (tournament.haveEnded === true) {
    return false;
  }

  const { startDate, finishDate } =
    tournament.TournamentRulesVariables?.items?.reduce<{
      startDate: Date | null
      finishDate: Date | null
    }>(
      (acc, rule) => {
        if (!rule?.ruleVariables) return acc;
        try {
          const vars = JSON.parse(rule.ruleVariables);
          if (!acc.startDate && vars.startDate) acc.startDate = new Date(vars.startDate);
          if (!acc.finishDate && vars.finishDate) acc.finishDate = new Date(vars.finishDate);
        } catch (err) {
          console.warn('start or end date parse error', err);
        }
        return acc;
      },
      { startDate: null, finishDate: null }
    ) ?? { startDate: null, finishDate: null };

  if (!startDate || !finishDate) {
    return false;
  }

  const now = new Date();
  return now >= startDate && now <= finishDate;
};

/*
 * Returns the soonest upcoming game for a given team,
 * or `undefined` if there are none in the future.
 *
 * Now takes any iterable (Set, Array, etc).
 */
export function getSoonestUpcomingGame (
  matches: Iterable<UpcomingGame>,
  teamId: string
): UpcomingGame | undefined {
  return [...matches]
    .map(m => ({
      ...m,
      beginTime: m.beginTime instanceof Date ? m.beginTime : new Date(m.beginTime)
    }))
    .filter(match => match.teamId === teamId)
    .sort((a, b) => a.beginTime.getTime() - b.beginTime.getTime())[0];
}
