import React from 'react';
import { type UpcomingGame } from 'features/teams/hooks/fetchUpcomingGames.hook';
import { type Team } from 'graphql/table.models';
import { getSoonestUpcomingGame } from 'features/tournament/helpers/utils';
import moment from 'moment';

interface UpcomingMatchRendererProps {
  data?: Team
  upcomingMatches: Set<UpcomingGame>
}

const formatUpcomingMatch = ({ match }: { match?: UpcomingGame }): string => {
  if (!match) return '-';

  return `${match?.tournamentName} - ${moment(match?.beginTime).format('DD/MM/YYYY')}`;
};

const UpcomingPlayerMatchRenderer: React.FC<UpcomingMatchRendererProps> = ({ data, upcomingMatches }) => {
  if (!data) return <></>;

  const soonestMatch = getSoonestUpcomingGame(upcomingMatches, data.id);

  return (
    <span>
      { formatUpcomingMatch({ match: soonestMatch }) }
    </span>
  );
};

export default UpcomingPlayerMatchRenderer;
