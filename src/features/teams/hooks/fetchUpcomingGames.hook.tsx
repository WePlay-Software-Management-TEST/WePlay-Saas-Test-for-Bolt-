import { useEffect, useState, useMemo } from 'react';
import { listAllTournaments } from 'features/tournament/tournament.service';

export interface UpcomingGame {
  teamId: string
  tournamentId: string
  tournamentName: string
  matchId: string
  beginTime: Date | string
  createdAt: string
}

type TeamIdInput = string | string[] | undefined;

const useUpcomingGames = (teamIdsInput: TeamIdInput): Set<UpcomingGame> => {
  const [upcomingMatches, setUpcomingMatches] = useState<Set<UpcomingGame>>(new Set());

  const teamIds = useMemo(() => {
    if (typeof teamIdsInput === 'string') {
      return [teamIdsInput];
    }
    return teamIdsInput ?? [];
  }, [teamIdsInput]);

  useEffect(() => {
    if (teamIds.length === 0) {
      setUpcomingMatches(new Set());
      return;
    }

    // TODO: Encapsulate logic for fetching upcoming games from tournaments
    const fetchUpcomingGames = async (): Promise<void> => {
      try {
        const tournaments = await listAllTournaments();
        if (!tournaments || tournaments.length === 0) {
          console.warn('No tournaments found.');
          return;
        }

        const now = new Date();
        const gamesMap = new Map<string, UpcomingGame>();

        tournaments.forEach((tournament) => {
          let startDate: Date | null = null;
          let finishDate: Date | null = null;

          tournament.TournamentRulesVariables?.items.forEach((rule) => {
            try {
              if (!rule?.ruleVariables) return;
              const { startDate: start, finishDate: end } = JSON.parse(rule.ruleVariables);
              if (start) {
                startDate = new Date(start);
              }
              if (end) {
                finishDate = new Date(end);
              }
            } catch (e) {
              console.error('Error parsing tournament rule:', e);
            }
          });

          if (!startDate || !finishDate) return;
          if (now >= (startDate as Date) && now <= (finishDate as Date)) {
            tournament.TFGroups?.items.forEach(group =>
              group?.TFGroupMatches?.items.forEach(gm =>
                gm?.Matches?.items.forEach(match =>
                  match?.MatchParties?.items.forEach(party => {
                    const tid = party?.matchPartiesTeamId;
                    if (!tid || !teamIds.includes(tid)) return;

                    const key = `${match.id}-${tid}`;
                    if (!gamesMap.has(key)) {
                      gamesMap.set(key, {
                        teamId: tid,
                        tournamentId: tournament.id,
                        tournamentName: tournament.tournamentName,
                        matchId: match.id,
                        createdAt: tournament.createdAt,
                        beginTime: match.beginTime as string
                      });
                    }
                  })
                )
              )
            );
          }
        });

        setUpcomingMatches(new Set(gamesMap.values()));
      } catch (err) {
        console.error('Error fetching upcoming games:', err);
      }
    };

    void fetchUpcomingGames();
  }, [teamIds]);

  return upcomingMatches;
};

export default useUpcomingGames;
