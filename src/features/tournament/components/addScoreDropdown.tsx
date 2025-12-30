import React from 'react';
import { type Option, type AutoCompletePlayers, type PlayersOptions } from 'core/models/input.model';
import Select, { components, type StylesConfig, type MenuProps } from 'react-select';
import { getDefaultClassNameStylesReactSelect } from 'core/context/global.const';
import { ReactSelectSearchIcon } from 'core/components/input/autoComplete/components/reactSelectSearchIcon';
import { AddScoreOptions } from 'core/components/input/autoComplete/components/addScoreOption';
import { Controller } from 'react-hook-form';

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
export function AddScoreDropDown ({
  menuPlacement = 'auto',
  cyData, options, addScore, control, fieldName
}: AutoCompletePlayers): JSX.Element {
  const selectStyles: StylesConfig<Option<PlayersOptions>, false> = {
    control: (props) => ({
      ...props
    }),
    menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' })
  };
  const menu = (props: MenuProps<Option<PlayersOptions>>): JSX.Element => {
    return (
      <>
      <h6 className='flex pl-4 pb-2 pt-0 text-grey-40 font-medium text-xs text-left'>Who Scored the goal?</h6>
      <components.Menu {...props} />
      </>);
  };
  return (
    <div className='!shadow-2xl !shadow-[#0000003D] mobile:!shadow-none bg-white !rounded-lg mobile:w-full'>
    <Controller
    control={control}
    name={fieldName ?? ''}
    render={({ field }) => {
      return <Select
        { ...field}
        data-cy={cyData}
        classNames={{
          ...getDefaultClassNameStylesReactSelect<PlayersOptions>(menuPlacement, cyData),
          control: () => '!border-grey-90 !rounded-lg m-3',
          menuList: () => `menuList !border-0 overflow-y-scroll average:!max-h-[500px] short:!max-h-[400px]
   !max-h-[250px] mobile:!max-h-[calc(100vh-145px)] mobile:gap-2 mobile:flex mobile:flex-col mobile:pr-2`
        }}
        components={{
          Input: ReactSelectSearchIcon<PlayersOptions>,
          Option: (props: any) => <AddScoreOptions { ...props } addScore={addScore}/>,
          Menu: menu
        }
      }
        options={options}
        isMulti={true}
        isSearchable={true}
        menuPlacement={menuPlacement}
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        isClearable={true}
        menuIsOpen
        onChange={(options, action) => {
          const newSelectedOption = (options as unknown as Array<Option<PlayersOptions>>).map((opt) => {
            if (opt?.extraData?.playerId !== action?.option?.value) {
              return {
                ...opt,
                value: Math.random()
              };
            }
            return {
              label: opt.label ?? '',
              value: Math.random(),
              extraData: {
                playerId: action?.option?.value,
                ...action?.option?.extraData
              }
            };
          });
          field.onChange(newSelectedOption);
        }}
        placeholder= 'Search Players'
        noOptionsMessage={() => { return 'No Players Found'; }}
        styles={selectStyles}
        minMenuHeight= {500}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
      />;
    }}
    />
    </div>);
};

AddScoreDropDown.displayName = 'AddScoreDropdown';
