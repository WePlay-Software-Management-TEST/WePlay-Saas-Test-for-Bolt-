import { type AuthContextState, USER_ROLES } from './auth.context.models';

export const authRoutes = {
  [USER_ROLES.ADMIN]: [
    '/player/edit/:id',
    '/player/create',
    '/player/:id',
    '/teams/:id',
    '/teams',
    '/teams/create',
    '/teams/edit/:id',
    '/settings',
    '/tournament',
    '/tournament/:id',
    '/tournament/create',
    '/tournament/edit/:id',
    '/league/create'
  ],
  [USER_ROLES.REFEREE]: [
    '/player/:id',
    '/teams/:id',
    '/teams',
    '/player',
    '/tournament/:id',
    '/tournament',
    '/settings'
  ],
  [USER_ROLES.PLAYER]: []
};

export const unAllowedComponenets = {
  [USER_ROLES.ADMIN]: [],
  [USER_ROLES.REFEREE]: [
    'tourney.edit',
    'tourney.delete',
    'player.options',
    'tourney.options',
    'teams.options',
    'player.edit',
    'player.create',
    'player.delete',
    'team.edit',
    'team.delete',
    'team.create',
    'create.all',
    'settings.orgSettings',
    'settings.orgUsers'
  ],
  [USER_ROLES.PLAYER]: []
};

export const authContextInitial: AuthContextState = {
  authRoutes,
  authComps: unAllowedComponenets
};
