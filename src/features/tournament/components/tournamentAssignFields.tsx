import React, { Fragment, useRef, useState, useEffect } from 'react';
import Button from 'core/components/button/button';
import { useTranslation, Trans } from 'react-i18next';
import { ReactComponent as AllDoneBtn } from 'assets/svgs/Done_all_round.svg';
import { ReactComponent as PlusIcon } from 'assets/svgs/plusIcon.svg';
import { ReactComponent as DeleteButton } from 'assets/svgs/deleteSmall.svg';
import Input from 'core/components/input/input';
import SelectInput from 'core/components/input/selectInput';
import RadioButton from 'core/components/button/radioButton';
import { SecondaryModal } from 'core/components/modal/secondaryModal';
import { useFieldForm } from '../hooks/fieldForm.hook';
import { ReactComponent as DropDownIcon } from 'assets/svgs/selectDropdown.svg';
import { useTournamentAssignFields } from '../hooks/tournamentAssignFields.hook';
import { type FieldFormType, type TournamentFormType } from '../models/tournamentForm.model';
import { type Fields, type CreateFieldsInput } from 'API';
import { createGameField } from '../tournament.service';
import produce from 'immer';
import { toastService } from 'core/services/toast.service';
import { TeamPlayerAutoComplete } from 'features/teams/components/teamPlayerAutoComplete';
import { type Contact } from 'graphql/table.models';
import MultiInput from 'core/components/input/multiInput';

/**
 * Function component for managing tournament field assignments.
 *
 * This component handles the creation, management, and assignment of fields for a tournament.
 * It provides functionality to add new fields, assign referees, and generate the tournament.
 *
 * @param {Function} incrementStep - Function to increment the step in the tournament process.
 *
 * @returns {JSX.Element} A JSX element representing the TournamentAssignFields component.
 */
export function TournamentAssignFields (
  { createTourneySchedule, tourney, availableFields, referees }:
  {
    createTourneySchedule: () => Promise<void>
    tourney?: TournamentFormType
    availableFields: Fields[]
    referees: Contact[]
  }
): JSX.Element {
  const { t: translate } = useTranslation(['tournament'], { keyPrefix: 'form.tourFieldsStep' });
  const createNewFieldLabel = useRef<HTMLLabelElement>(null);
  const fieldsLabelsRefs = useRef<HTMLLabelElement[]>([]);
  const [mobileTabLabelIndex, setMobileTabLabelIndex] = useState(0);
  const [selectedFields, setSelectedFields] = useState(availableFields);
  const [fieldsInSystem, setFieldsInSystem] = useState(availableFields);

  const {
    fieldNameInputProps: newFieldNameInput,
    fieldLocationInputProps,
    isValid: isNewFieldFormValid, handleSubmit: newFieldSubmit, setError, getFieldState: getFieldFormState, reset
  } = useFieldForm(fieldsInSystem, selectedFields);
  const {
    getFIeldFormProps, fields, replace, isValid, numOfFields, selectedMatchesPerDay, getFieldState
  } = useTournamentAssignFields(referees);

  const [fieldsSlice, setFieldsSlice] = useState(numOfFields ?? availableFields.length);
  const [OptionReferees] = useState(referees.map((referee) => {
    return {
      label: `${referee.FirstName} ${referee.LastName ?? ''}`,
      value: referee.id,
      extraData: {
        city: referee.ContactAddresses?.items[0]?.City ?? '',
        state: referee.ContactAddresses?.items[0]?.State ?? '',
        experience: referee.RefereeInformation?.yearsOfExperience
      }
    };
  }));

  useEffect(() => {
    setFieldsSlice((prev) => {
      if (prev === numOfFields) return prev;

      if (numOfFields === null) {
        return availableFields.length;
      }
      return numOfFields;
    });
  }, [numOfFields, availableFields]);

  useEffect(() => {
    if (selectedFields.length === 0) return;
    if (selectedFields === undefined) return;
    if (
      tourney !== undefined && !getFieldState('numOfFields').isDirty && !getFieldFormState('fieldName').isDirty
    ) return;

    const mainReferees = [OptionReferees?.[0]].filter(referee => referee !== undefined);
    const lineReferees = [OptionReferees?.[1]].filter(referee => referee !== undefined);

    replace(selectedFields?.map((field) => {
      return {
        fieldName: field?.fieldName,
        matchesPerDay: selectedMatchesPerDay,
        assignMechanism: 'AUTO',
        mainReferees,
        lineReferees,
        fieldID: field.id
      };
    }));
  }, [selectedMatchesPerDay, replace, OptionReferees, tourney]);

  const updateFieldsForm = (selectedFields: Fields[]): void => {
    const mainReferees = [OptionReferees?.[0]].filter(referee => referee !== undefined);
    const lineReferees = [OptionReferees?.[1]].filter(referee => referee !== undefined);

    replace(selectedFields?.map((field) => {
      return {
        fieldName: field?.fieldName,
        matchesPerDay: selectedMatchesPerDay,
        assignMechanism: 'AUTO',
        mainReferees,
        lineReferees,
        fieldID: field.id
      };
    }));
  };

  useEffect(() => {
    setSelectedFields(produce(() => {
      const slicedFields = availableFields.slice(0, fieldsSlice);
      return slicedFields;
    }));
  }, [fieldsSlice, availableFields]);

  const onChangeFieldMobile = (value: number | string, isSelected: boolean = true, field?: Fields): void => {
    if (value === 'new-field') {
      createNewFieldLabel.current?.click();
      return;
    }
    if (!isSelected && field !== undefined) {
      setSelectedFields(produce((draft) => {
        draft.push(field);
      }));
      return;
    };

    setMobileTabLabelIndex(Number(value));
    fieldsLabelsRefs.current[Number(value) ?? 0].click();

    const elem = document.activeElement as HTMLElement;
    if (elem !== null) {
      elem.blur();
    }
  };

  const removeField = (field: FieldFormType): void => {
    const updatedAllGameFields = selectedFields.filter((selectFields) => selectFields.id !== field.fieldID);
    setSelectedFields(produce(draft => {
      const index = draft?.findIndex(selectedField => selectedField.id === field.fieldID);
      if (index !== -1) {
        draft.splice(index, 1);
      };
      toastService(`${field.fieldName} has been removed from this tournament`, 'secondary');
    }));

    const mainReferees = [OptionReferees?.[0]].filter(referee => referee !== undefined);
    const lineReferees = [OptionReferees?.[1]].filter(referee => referee !== undefined);

    replace(updatedAllGameFields?.map((field) => {
      return {
        fieldName: field?.fieldName,
        matchesPerDay: selectedMatchesPerDay,
        assignMechanism: 'AUTO',
        mainReferees,
        lineReferees,
        fieldID: field.id
      };
    }));
  };

  const FieldOptionsMobileDropdown = (): JSX.Element => {
    return <div className='dropdown'>
      <label
      tabIndex={0}
      className="hidden mobile:flex justify-center items-center select select-bordered w-full !bg-none gap-2 body-sm-text font-semibold text-grey-10" >
        {fields?.[mobileTabLabelIndex]?.fieldName}<DropDownIcon/>
      </label>
        <ul tabIndex={0} className='dropdown-content bg-white !p-0 z-[1] menu w-full shadow-2xl border border-grey-90 rounded-lg'>
        { fields.map((field, index) => {
          const fieldAlreadySelected = selectedFields.map((field) => field.id).includes(field.fieldID);
          return <li key={field.id} className='px-4 py-2 !flex !flex-row justify-between'>
            <label
            onClick={() => { onChangeFieldMobile(index, fieldAlreadySelected, selectedFields.find((fieldAPI) => fieldAPI.id === field.fieldID)); }}
            className='bg-white flex flex-col justify-start items-start !p-0'>
              <span className='body-xs-text text-grey-10'>{field?.fieldName}</span>
              <span className='body-xxs-text'>{field?.location}</span>
            </label>
            { !fieldAlreadySelected && <PlusIcon className='fill-grey-10 stroke-grey-10 !p-0'/> }
          </li>;
        })}
        <li className='px-4 py-2 border-t border-grey-90 select-fields-hover text'>
          <label
            className='flex w-full !p-0 justify-between items-center body-sm-text font-semibold text-grey-10'
            onClick={() => { onChangeFieldMobile('new-field'); }}>
              {translate('addFieldBtn')}<PlusIcon className='fill-grey-10 stroke-grey-10'/>
          </label>
        </li>
        </ul>
    </div>;
  };

  return (
    <>
    <section className='flex flex-col gap-6'>
      <div className='flex flex-col'>
        <h5 className=' pb-2 body-xl-text text-grey-10 font-semibold'> <Trans t={translate} i18nKey={'selectedFieldsHeader'} values={{ fieldsCount: fields.length }} /></h5>
        <p className='body-xs-text pb-4'><Trans t={translate} i18nKey={'selectedFieldsParagraph'} values={{ fieldsCount: fields.length }} /></p>
          <FieldOptionsMobileDropdown />
        <div role="tablist" className="tabs tabs-bordered join">
          { fields.map((field, index) => {
            const { fieldLineRefereesInput, fieldMainRefereesInput, fieldMatchesPerDayInput, fieldNameInputProps, autoAssignReferee, manualAssignReferee } = getFIeldFormProps(index, field.fieldName);
            return <Fragment key={field.id}>
              <label role='tab' ref={(ref) => {
                if (fieldsLabelsRefs.current !== null && ref !== null) {
                  fieldsLabelsRefs.current[index] = ref;
                }
                return fieldsLabelsRefs?.current[index];
              }} htmlFor={`tab-${field.id}`} className={`whitespace-nowrap flex-nowrap group transition ease-in-out duration-150 mobile:hidden btn label-tab join-item hover:!bg-grey-90 hover:!border-grey-90 rounded-tab-custom !border-grey-90 !bg-white !text-grey-10 ${index === selectedFields.length - 1 ? 'last-tab-rounded' : ''}`}>{field?.fieldName}
              <button className='svg-button-label transition-transform hidden group-hover:block' onClick={() => { removeField(field); }}>
                <DeleteButton/>
              </button>
              </label>
            <input type="radio" defaultChecked={index === 0} id={`tab-${field.id}`} name="fields_tab" role="tab" className="tab hidden label-checked" aria-label={field?.fieldName} />
            <form role="tabpanel" className='tab-content pt-8 mobile:pt-4'>
              <h6 className='body-md-text text-grey-10'><Trans t={translate} i18nKey={'fieldDetails'} values={{ fieldName: field?.fieldName }} /></h6>
                <div className='flex gap-6 pt-6 mobile:flex-col mobile:gap-1 mobile:pt-2'>
                  <Input {...fieldNameInputProps} />
                  <SelectInput {...fieldMatchesPerDayInput} />
                </div>
                <h6 className='body-md-text text-grey-10 pt-8 pb-6 mobile:pt-2 mobile:pb-2'><Trans t={translate} i18nKey={'fieldRefereesDetails'} values={{ fieldName: field?.fieldName }} /></h6>
                <div className='flex flex-col gap-6 mobile:gap-3'>
                  <div>
                  <p className='body-xs-text pb-3'>{translate('refereeRadioHeader')}</p>
                    <span className='flex gap-6 mobile:gap-4'>
                      <RadioButton {...manualAssignReferee}/>
                      <RadioButton {...autoAssignReferee}/>
                    </span>
                  </div>
                    {
                      referees.length <= 0 && <div className='gap-2 flex flex-col'>
                        <h4 className='text-indictor-error font-semibold text-xl'>No Referees Available!</h4>
                        <p className='text-grey-40 font-normal text-sm'>To assign referees to matches, please add new referees under <a href='/settings' className='text-secondary underline'>Settings</a> page.</p>
                        </div>
                    }
                    <div className='flex gap-4 mobile:flex-col mobile:gap-2'>
                      <TeamPlayerAutoComplete {...fieldMainRefereesInput} />
                      <TeamPlayerAutoComplete {...fieldLineRefereesInput} />
                    </div>
                    </div>
            </form>
          </Fragment>;
          })
          }
          <Button
            text={translate('addFieldBtn')}
            type='secondary'
            size='small'
            showIcon={true}
            htmlFor='addNewFieldModal'
            id="addNewFieldBtn"
            cyData="addNewFieldBtn"
            buttonHtmlTag='label'
            iconPosition='right'
            className={`stroke-grey-10 mobile:hidden whitespace-nowrap flex-nowrap ${fields.length === 0 ? '' : 'rounded-l-none'}`}
            Icon={PlusIcon}
            rounded-l-none
          />
          <label ref={createNewFieldLabel} className='hidden' htmlFor='addNewFieldModal'></label>
        </div>
      </div>
    <div className='flex gap-10 mobile:flex-col mobile:gap-4 '>
    <Button
      text={translate('generateTourneyBtn')}
      id="generateTourneyBtn"
      cyData="generateTourneyBtn"
      type='primary'
      iconPosition='right'
      showTextOnMobile
      size='small'
      showIcon={true}
      asyncOnClick={createTourneySchedule}
      Icon={AllDoneBtn}
      isValidChecked={isValid || tourney !== undefined}
    />
    </div>
  </section>
  <SecondaryModal header='Add Field' id='addNewFieldModal' mainButtonProps={{
    text: 'Add Field',
    type: 'primary',
    cyData: 'saveFieldBtn',
    isValidChecked: isNewFieldFormValid,
    asyncOnClick: newFieldSubmit(async (value) => {
      const alreadyAvailableField = fieldsInSystem.find((field) => field.id === value.fieldName.value);
      const fieldInAllGame = Boolean(selectedFields.find((field) => field.id === value.fieldName.value));
      const thereIsSimiliarName = Boolean(fields.find((field) => field.fieldName.toLowerCase() === value.fieldName.label.toLowerCase()));
      if (thereIsSimiliarName) {
        setError('fieldName', { message: "There's already a field with the same name" });
        return;
      }
      if (alreadyAvailableField !== undefined && !fieldInAllGame) {
        setSelectedFields(produce((draft) => {
          draft.push(alreadyAvailableField);
        }));
        updateFieldsForm([...selectedFields, alreadyAvailableField]);
        if (createNewFieldLabel.current !== null) {
          createNewFieldLabel.current.click();
        }
        reset();
        toastService(`${value.fieldName.label} have been added to this tournament.`, 'secondary');
        return;
      }

      if (alreadyAvailableField !== undefined && !fieldInAllGame) {
        setError('fieldName', { message: "Can't add field cause it's already selected" });
        return;
      }

      if (thereIsSimiliarName) {
        setError('fieldName', { message: "There's already a field with the same name" });
        return;
      }

      const fieldInput: CreateFieldsInput = {
        fieldLocation: value.location,
        fieldName: value.fieldName.label
      };
      try {
        const field = await createGameField(fieldInput);
        const typeSafeField = field?.createFields as unknown as Fields;
        setSelectedFields(produce((draft) => {
          draft.push(typeSafeField);
        }));
        setFieldsInSystem(produce((draft) => {
          draft.push(typeSafeField);
        }));
        updateFieldsForm([...selectedFields, typeSafeField]);
        reset();
      } catch (err) {
        console.log(err);
        return;
      }

      toastService(`${value.fieldName.label} have been added to your business.`, 'secondary');
      if (createNewFieldLabel.current !== null) {
        createNewFieldLabel.current.click();
      }
    })
  }}>
  <div className='flex flex-col gap-4 md:w-[560px] pb-6'>
    <MultiInput {...newFieldNameInput} />
    <Input {...fieldLocationInputProps} />
  </div>
  </SecondaryModal>
</>
  );
};
