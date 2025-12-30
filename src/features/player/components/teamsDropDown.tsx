import React, { useCallback } from 'react';
import { type Option, type AutoCompletePlayers, type TeamsOptions } from 'core/models/input.model';
import Select, { components, type StylesConfig, type MenuProps } from 'react-select';
import { abbrState, getDefaultClassNameStylesReactSelect } from 'core/context/global.const';
import { useTranslation } from 'react-i18next';
import { DropdownMenuOption } from 'core/components/input/autoComplete/components/dropdownMenuOption';
import { ReactSelectSearchIcon } from 'core/components/input/autoComplete/components/reactSelectSearchIcon';
/**
 * @component Dropdown component, shows Teams you would like to player to.
 * for more information check: https://react-select.com/home
 * @param { Array<Option<TeamsOptions>> } options - List of options
 * @param { string } cyData - cypress testing tag.
 * @param { 'top' | 'bottom' } menuPlacement - dropdown menu position.
 * @param { (contactsId?: string, teamId?: string, isCaptain?: boolean, label?: string) => Promise<void> } addPlayerButton - Should show a C illustration beside the avater to indicate Player Status as Captain
 * @returns { JSX.Element }
 */
export function TeamDropdown ({
  menuPlacement = 'auto',
  cyData, options,
  addPlayerButton
}: AutoCompletePlayers): JSX.Element {
  const { t } = useTranslation(['teams']);

  const selectStyles: StylesConfig<Option<TeamsOptions>, false> = {
    control: (props) => ({
      ...props
    }),
    menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' })
  };

  const getSubText = useCallback((data: Option<TeamsOptions>): string => {
    return `${data?.extraData?.city ?? ''}, ${abbrState(data.extraData?.state ?? '')}`;
  }, []);

  const menu = (props: MenuProps<Option<TeamsOptions>>): JSX.Element => {
    return (
      <>
      <h6 className='mobile:flex hidden py-2 text-grey-40 font-medium text-xs text-left -ml-[30px]'>{t('AddToTeamsButton')}</h6>
      <components.Menu {...props} />
      </>);
  };

  const disableOption = (data: Option<TeamsOptions>): boolean => {
    return data.extraData?.isCaptainInTeam ?? false;
  };
  return (
    <div className='!shadow-2xl !shadow-[#0000003D] mobile:!shadow-none bg-white !rounded-lg mobile:w-full'>
    <Select
          data-cy={cyData}
          classNames={getDefaultClassNameStylesReactSelect<TeamsOptions>(menuPlacement, cyData)}
          components={{
            Menu: menu,
            Input: ReactSelectSearchIcon<TeamsOptions>,
            Option: (props: any) => <DropdownMenuOption
            disableSecondaryButtonCallback={disableOption}
            disableSecondaryButton = {undefined}
            secondaryButtonText={t('teamPlayerAddButtonText')}
            primaryButtonText={t('teamPlayerAddButtonText2')}
            disabledSubText={t('teamPlayerInTeamOption')}
            getSubText={getSubText}
            onClickSecondaryButton={async (data) => {
              await addPlayerButton?.(undefined, data.value, true, data.label);
            }}
            onClickPrimaryButton={async (data) => {
              await addPlayerButton?.(undefined, data.value, false, data.label);
            }}
            {...props}/>
          }
        }
          options={options}
          isSearchable={true}
          menuPlacement={menuPlacement}
          isClearable={true}
          menuIsOpen
          placeholder= {t('globalActionSearch')}
          noOptionsMessage={() => { return t('noTeamsFoundLabel'); }}
          controlShouldRenderValue={false}
          styles={selectStyles}
          minMenuHeight= {500}
          />
          </div>);
};
