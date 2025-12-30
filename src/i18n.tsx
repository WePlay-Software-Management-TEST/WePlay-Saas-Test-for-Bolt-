import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import registrationTranslation from 'i18n/english/registration.json';
import loginTranslation from 'i18n/english/login.json';
import forgotPasswordTranslation from 'i18n/english/forgotPassword.json';
import sidePanelTranslation from 'i18n/english/sidePanel.json';
import headerTranslation from 'i18n/english/header.json';
import playerTranslation from 'i18n/english/player.json';
import breadCrumbsTranslation from 'i18n/english/breadcrumbs.json';
import inputTextTranlation from 'i18n/english/globalInput.json';
import toastMessagesTranslation from 'i18n/english/toastMessages.json';
import modalTranslations from 'i18n/english/modals.json';
import componentsTranslation from 'i18n/english/components.json';
import teamsTranslation from 'i18n/english/teams.json';
import screenWarningTranslation from 'i18n/english/screenWarning.json';
import tournamentTranslation from 'i18n/english/tournaments.json';
import leagueTranslation from 'i18n/english/league.json';
import settingsTranslation from 'i18n/english/settings.json';
import error from 'i18n/english/error.json';

const resources = {
  en: {
    registration: registrationTranslation,
    login: loginTranslation,
    forgotPassword: forgotPasswordTranslation,
    sidePanel: sidePanelTranslation,
    header: headerTranslation,
    player: playerTranslation,
    breadCrumbs: breadCrumbsTranslation,
    inputText: inputTextTranlation,
    toast: toastMessagesTranslation,
    modals: modalTranslations,
    components: componentsTranslation,
    teams: teamsTranslation,
    warning: screenWarningTranslation,
    tournament: tournamentTranslation,
    settings: settingsTranslation,
    league: leagueTranslation,
    error
  }
};

void i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en'
  });

export default i18next;
