import { useState, useEffect } from 'react';
import { listAllTournaments } from 'features/tournament/tournament.service';
import { isTournamentActive } from 'features/tournament/helpers/utils';

export function useTeamStatus (teamId: string): { isActive: boolean, loading: boolean } {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId) {
      setLoading(false);
      return;
    }

    const fetchStatus = async (): Promise<void> => {
      try {
        const tournaments = await listAllTournaments();

        const active = tournaments?.some(tournament => {
          const teamInTournament = tournament.TFGroups?.items?.some(group =>
            group?.TFGroupMatches?.items?.some(groupMatch =>
              groupMatch?.Matches?.items?.some(match =>
                match?.MatchParties?.items?.some(
                  party => party?.matchPartiesTeamId === teamId
                )
              )
            )
          );
          if (!teamInTournament) return false;

          return isTournamentActive(tournament);
        });
        setIsActive(!!active);
      } catch (err) {
        console.error('error while getting team status ', err);
      } finally {
        setLoading(false);
      }
    };
    void fetchStatus();
  }, [teamId]);

  return { isActive, loading };
}
