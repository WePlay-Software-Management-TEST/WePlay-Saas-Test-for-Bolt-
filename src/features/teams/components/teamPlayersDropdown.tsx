import React, { useCallback } from 'react';
import { type Option, type AutoCompletePlayers, type PlayersOptions } from 'core/models/input.model';
import Select, { components, type StylesConfig, type MenuProps } from 'react-select';
import { getAgeFromDate } from 'core/utils/utils';
import { abbrState, getDefaultClassNameStylesReactSelect } from 'core/context/global.const';
import { useTranslation } from 'react-i18next';
import { DropdownMenuOption } from 'core/components/input/autoComplete/components/dropdownMenuOption';
import { ReactSelectSearchIcon } from 'core/components/input/autoComplete/components/reactSelectSearchIcon';

/**
 * @component Dropdown component, shows Players you would like to add to a certain team.
 * for more information check: https://react-select.com/home
 * @param { Array<Option<PlayersOptions>> } options - List of options
 * @param { string } cyData - cypress testing tag.
 * @param { 'top' | 'bottom' } menuPlacement - dropdown menu position.
 * @param { boolean } isCaptainInTeam - whether the team have a captain.
 * @param { (contactsId?: string, teamId?: string, isCaptain?: boolean, label?: string) => Promise<void> } addPlayerButton - Should show a C illustration beside the avater to indicate Player Status as Captain
 * @returns { JSX.Element }
 */
export function TeamPlayersDropdown ({
  menuPlacement = 'auto',
  cyData, options,
  addPlayerButton, isCaptainInTeam = false
}: AutoCompletePlayers): JSX.Element {
  const { t } = useTranslation(['teams']);

  const selectStyles: StylesConfig<Option<PlayersOptions>, false> = {
    control: (props) => ({
      ...props
    }),
    menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' })
  };

  const getSubText = useCallback((data: Option<PlayersOptions>): string => {
    return `${t('teamPlayerAge')} 
    ${getAgeFromDate(data.extraData?.Birthdate)} • 
    ${t('teamPlayerLocation')} ${data?.extraData?.city ?? ''}, ${abbrState(data.extraData?.state ?? '')}`;
  }, []);

  const menu = (props: MenuProps<Option<PlayersOptions>>): JSX.Element => {
    return (
      <>
      <h6 className='mobile:flex hidden py-2 text-grey-40 font-medium text-xs text-left
      -ml-[30px]'>{t('addToTeamsButton')}</h6>
      <components.Menu {...props} />
      </>);
  };

  return (
    <div className='!shadow-2xl !shadow-[#0000003D] mobile:!shadow-none bg-white !rounded-lg mobile:w-full'>
    <Select
          data-cy={cyData}
          classNames={getDefaultClassNameStylesReactSelect<PlayersOptions>(menuPlacement, cyData)}
          components={{
            Input: ReactSelectSearchIcon<PlayersOptions>,
            Option: (props: any) => <DropdownMenuOption
            disableSecondaryButton={isCaptainInTeam}
            secondaryButtonText={t('teamPlayerAddButtonText')}
            primaryButtonText={t('teamPlayerAddButtonText2')}
            disabledSubText={t('teamPlayerInTeamOption')}
            getSubText={getSubText}
            onClickSecondaryButton={async (data) => {
              await addPlayerButton?.(data.value, data.extraData?.teamsId, true, data.label);
            }}
            onClickPrimaryButton={async (data) => {
              await addPlayerButton?.(data.value, data.extraData?.teamsId, false, data.label);
            }}
            {...props}/>,
            Menu: menu
          }
        }
          options={options}
          isSearchable={true}
          menuPlacement={menuPlacement}
          isClearable={true}
          menuIsOpen
          placeholder= 'Search Players...'
          noOptionsMessage={() => { return 'No Players Found'; }}
          controlShouldRenderValue={false}
          styles={selectStyles}
          minMenuHeight= {500}
          />
          </div>);
};
