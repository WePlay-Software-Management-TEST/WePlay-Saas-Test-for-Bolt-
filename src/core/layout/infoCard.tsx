import React, { useCallback, useMemo, memo, useEffect, useState, useRef } from 'react';
import { type ButtonProps } from 'core/models/button.model';
import { type InfoCardProps } from '../../features/player/player.model';
import { ReactComponent as EditIcon } from 'assets/svgs/Edit_light.svg';
import { ReactComponent as CheckIcon } from 'assets/svgs/checkInCircle.svg';
import { getInitials, setImperialLabels } from 'core/utils/utils';
import Button from 'core/components/button/button';
import { useNavigate } from 'react-router-dom';
import DropdownButton from 'core/components/button/dropdownButton';
import { InitialsAvatar } from 'core/components/misc/initialsAvatar';
import { ReactComponent as PlusIcon } from 'assets/svgs/plusIcon.svg';
import AuthorizedRoute from 'core/routeGuards/authorizedRoute';

/**
 * @component Card Component That is being used frequently across our UI Design, which include the following:
 * Photo, Header, Description & Other details that are Usecase Specific.
 * @param { string } image - Image Source, if empty string, it's going to show Initials taked from the textHeader prop.
 * @param { string } textHeader - header Text
 * @param { string } modalID - Modal ID for the Modal that is going to show when clicked on the Add Button.
 * @param { string } id - Element Specific ID, in other words, the ID of what we are showing using the infoCard.
 * @param { string } editButtonText - Text that is going to show inside the Edit button
 * @param { string } endTournamentButtonText - Text that is going to show inside the End Tournament button
 * @param { string } dropdownText - Text that is going to show inside the Dropdown button
 * @param { string } editButtonOnClickNavigate - Where to navigate to, when clicked on Edit Button.
 * @param { Record<string, string> } otherProps - Other information you like to add.
 * @param { Record<string, string> } otherPropsHeaders - Other information Header texts, be sure that the keys match otherProps keys
 * @param { string[] | undefined } options - Array of Options to show for the dropdown
 * @param { boolean | undefined } border - Show bottom border
 * @param { JSX.Element | undefined } children - React Component to replace the default Options inside the Dropdown
 * @param { Record<string, string> | undefined } classNames - Custom Classes you like to add to your own custom information box.
 * @returns { JSX.Element }
 */
export function InfoCard ({
  image,
  textHeader,
  bio,
  id,
  editButtonText,
  modalID,
  endTournamentButtonText,
  dropdownText,
  children,
  editButtonOnClickNavigate,
  otherProps,
  otherPropsHeaders,
  options = [],
  border = true,
  classNames,
  showAddButton = true,
  // TODO: move buttone outside this comp
  onEndTourney,
  onEndTourneyDisabled = false
}: InfoCardProps): JSX.Element {
  const navigate = useNavigate();

  const [useShortText, setShortText] = useState(false);
  const [initials, setInitials] = useState('');

  const editProfileButtonProp = useRef<ButtonProps>({
    text: editButtonText,
    type: 'secondary',
    onClickCallable: () => { navigate(`${editButtonOnClickNavigate}${id}`); },
    showIcon: true,
    iconPosition: 'left',
    Icon: EditIcon,
    size: 'small',
    cyData: 'editProfileButton',
    className: 'mobile:w-[40px] mobile:h-[32px] mobile:p-0 mobile:min-h-[32px] mobile:!rounded-[4px]'
  }
  );

  const endTournamentButtonProp = {
    text: endTournamentButtonText as string,
    type: 'secondary',
    onClickCallable: onEndTourney,
    isDisabled: onEndTourneyDisabled,
    showIcon: true,
    iconPosition: 'left',
    Icon: CheckIcon,
    size: 'small',
    cyData: 'endTournamentButton',
    className: 'mobile:w-[40px] mobile:h-[32px] mobile:p-0 mobile:min-h-[32px] mobile:!rounded-[4px]'
  };

  useEffect(() => {
    Object.keys(otherProps).forEach((propKey) => {
      if (useShortText) return;
      if (otherProps[propKey].length > 7) {
        setShortText(true);
      }
    });

    setInitials(getInitials(textHeader));
  }, []);

  const setMetricLabel = useCallback(setImperialLabels, []);

  const playerInfo = useMemo((): JSX.Element => {
    return (
      <div
    className={`
    flex justify-between xs:bg-grey-98
    xs:rounded-lg xs:p-4 lg:p-0 lg:rounded-none
    mobile:overflow-x-auto
    mobile:translate-x-0
    mobile:translate-y-0
    mobile:w-full
    mobile:p-4
    mobile:border
    mobile:border-grey-90
    lg:bg-transparent gap-6 lg:translate-x-0 lg:translate-y-0
    ${bio === '' ? 'xs:translate-y-[110%]' : 'xs:translate-y-1/2'}
    xs:-translate-x-[14rem] xs:w-[95vw] lg:w-auto duration-150`} >
        {
          Object.keys(otherProps).map((propKey) => {
            return (
            <div
            className={`${otherProps[propKey] !== '' ? 'tooltip tooltip-info tooltip-left' : ''} flex flex-col`}
            key={propKey}
            data-tip={setMetricLabel(propKey, otherProps[propKey])}>
              <p className='body-xxs-text text-left text-nowrap whitespace-nowrap'>{ otherPropsHeaders[propKey] }</p>
              <h6
              className={`text-grey-10 text-left font-semibold leading-7 xs:text-base xl:text-2xl
              lg:text-[14px] text-ellipsis overflow-hidden max-w-[250px] lg:max-w-[120px]
              xl:max-w-[220px] xs:max-w-[120px] whitespace-nowrap ${classNames?.[propKey] ?? ''}`}
              data-cy={propKey}>
                {
                 otherProps[propKey] !== ''
                   ? setMetricLabel(propKey, otherProps[propKey])
                   : '-'
                 }
              </h6>
            </div>
            );
          })
        }
      </div>
    );
  }, [otherProps, useShortText]);

  return (
  <div className={
    `flex flex-col p-6 gap-8 mobile:gap-0 w-full 
    ${border ? 'lg:border-b border-0' : ''} 
    border-grey-90 xs:pb-14 lg:pb-6 mobile:p-4`}>
  <div className='flex gap-6 w-auto mobile:hidden'>
    <div className='
        flex justify-center
        items-center
        lg:pt-0 w-[200px] h-[200px] min-h-[200px] min-w-[200px] bg-dodger-blue-90 rounded-3xl'>
      { image !== '' && <img
      className='
      w-[200px] h-[200px] min-h-[200px] min-w-[200px]
      rounded-3xl bg-contain bg-center object-cover'
      src={ image }/>}
      { image === '' && <InitialsAvatar initials={initials} size='huge'/>}
    </div>
    <div className='flex flex-col justify-between xs:py-5 lg:py-2 xs:w-[65%] lg:w-full md:w-[73%]'>
      <div className='flex lg:justify-between xs:justify-start'>
        <div className='lg:w-3/4 sm:w-[85%] flex flex-col'>
      <h4 className='font-semibold leading-8 text-grey-10'>{ textHeader }</h4>
      <p data-cy='playerCardBio'
      className='body-xs-text text-left pt-2 pr-3
       flex-wrap pb-3 w-auto'>
        { bio }</p>
        </div>
      {
        dropdownText !== undefined && <AuthorizedRoute type='authComps' id='player.create'><DropdownButton cyData='dropDownAddToTeam' buttonText={dropdownText} options={options}
        className='xs:hidden lg:block max-h-12' >{children}</DropdownButton></AuthorizedRoute>
      }
      </div>

      <div className='flex lg:flex-row  xs:flex-col lg:justify-between'>
        <div className='flex gap-6 xs:pt-8 lg:pt-0'>
          <AuthorizedRoute type='authComps' id='player.create'>
        <>
        <Button {...editProfileButtonProp.current}/>
        <Button {...endTournamentButtonProp as ButtonProps}/>
        {
          dropdownText !== undefined &&
          <DropdownButton
          className='xs:block lg:hidden' cyData='dropDownAddToTeam'
          buttonText={dropdownText} options={options}>{children}
        </DropdownButton>
        }
        </>
        </AuthorizedRoute>
        </div>
        { playerInfo }
      </div>
    </div>
  </div>
    <div className='hidden mobile:flex mobile:flex-col'>
      <div className='flex items-center justify-between'>
      <span className='flex gap-2 items-center justify-start'>
        <div data-cy='mobileAvatarInfoCard' className='
            flex justify-center
            items-center
            lg:pt-0 w-[32px] h-[32px] min-h-[32px] min-w-[32px] bg-dodger-blue-90 rounded-[8px]'>
          { image !== '' && <img
          className='
          w-[32px] h-[32px] min-h-[32px] min-w-[32px]
          rounded-[8px] bg-contain bg-center object-cover'
          src={ image }/>}
          { image === '' && <InitialsAvatar initials={initials} size='huge' containerClassName='w-6 h-6' textClassName='text-[14px]'/>}
        </div>
        <h4 className='font-semibold leading-5 text-grey-10 text-[16px] text-center
        text-ellipsis whitespace-nowrap max-w-[180px] overflow-hidden'>{ textHeader }</h4>
        </span>
        <div className='flex justify-center items-center gap-2 '>
            <Button {...editProfileButtonProp.current} cyData='editProfileButtonMobile'/>
            <Button {...endTournamentButtonProp as ButtonProps} cyData='endTournamentButtonMobile'/>
            { (showAddButton ?? true) &&
              <label data-cy='mobileAddModal' htmlFor={modalID} className='btn rounded-[4px] w-[40px] h-[32px] p-0 min-h-0 bg-transparent
              border-grey-90'><PlusIcon className='fill-grey-10 stroke-grey-10'/></label>
            }
            </div>
      </div>
    <p data-cy='playerCardBio'
        className='body-xs-text text-left pt-2 pr-3
        flex-wrap pb-3 w-auto'>
          { bio }</p>
    { playerInfo }
    </div>
  </div>
  );
};

export const MemorizedInfoCard = memo(InfoCard);
