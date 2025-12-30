import React, { useState } from 'react';
import { GooglePlacesAutoComplete } from 'core/components/input/googlePlacesAutoComplete';
import { type GoogleAutoCompleteInputProps } from 'core/models/input.model';
import { useForm } from 'react-hook-form';

describe('googleAutoComplete.cy.tsx', () => {
  beforeEach(() => {
    const WrappedComp = (): JSX.Element => {
      const { control, register, getFieldState, formState } = useForm<{ googleTest: string }>({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
      });

      const [someState, setSomeState] = useState('');

      const props: GoogleAutoCompleteInputProps = {
        legendText: 'google',
        placeholder: 'GOOOGLE',
        errPlaceholder: 'Hey there Bot!, can you read this?',
        formControl: control,
        registrationOption: register('googleTest', { required: { value: true, message: 'REQUIRED' } }),
        id: 'Gig',
        cyData: 'googSearch',
        fieldNameControl: 'googleTest',
        fieldState: getFieldState('googleTest', formState),
        onSelect: (places) => {
          setSomeState(places?.formatted_address ?? '');
        }
      };

      return (
      <>
      <GooglePlacesAutoComplete {...props}/>
      { someState !== '' && <div data-cy='testDiv'>{someState}</div>}
      </>
      );
    };

    cy.mount(<WrappedComp />);
  });

  it('Should show placeholder and legend text', () => {
    cy.contains('google');
    cy.getBySel('input-error-placeholder-span')
      .should('be.visible')
      .contains('Hey there Bot!, can you read this?');
    cy.get('input[placeholder*="GOOOGLE"]').should('exist');
  });

  it('Should show suggestions depending on the searchoptions when user starts typing', () => {
    cy.getBySel('googSearch').type('washin', { delay: 550 });
    cy.getBySel('googSearch').type('{downArrow}{downArrow}{enter}', { delay: 300 });
    cy.getBySel('testDiv').should('exist');
    cy.getBySel('testDiv').should('contain.text', 'Washington');
  });

  it('Error Messages Should show when error happens', () => {
    cy.get('input').focus().blur();
    cy.getBySel('input-error-span').contains('REQUIRED');
  });
});

describe('googleAutoComplete change searchOptions', () => {
  it('Changing SearchOptions from city/state/postal to only cities', () => {
    const WrappedComp = (): JSX.Element => {
      const { control, register, getFieldState, formState, setValue } = useForm<{ googleTest: string }>({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
      });

      const [someState, setSomeState] = useState('');

      const props: GoogleAutoCompleteInputProps = {
        legendText: 'google',
        placeholder: 'GOOOGLE',
        formControl: control,
        registrationOption: register('googleTest'),
        id: 'Gig',
        cyData: 'googSearch',
        fieldNameControl: 'googleTest',
        searchOptions: {
          types: ['(cities)'],
          componentRestrictions: { country: 'us' },
          fields: ['formatted_address', 'address_components']
        },
        fieldState: getFieldState('googleTest', formState),
        onSelect: (places) => {
          const address = places?.formatted_address ?? '';

          setValue('googleTest', address, { shouldValidate: true, shouldDirty: true });
          setSomeState(places?.formatted_address ?? '');
        }
      };

      return (
      <>
      <GooglePlacesAutoComplete {...props}/>
      { someState !== '' && <div data-cy='testDiv'>{someState}</div>}
      </>
      );
    };

    cy.mount(<WrappedComp />).then(() => {
      cy.getBySel('googSearch').type('Salem', { delay: 550 });
      cy.getBySel('googSearch').type('{downArrow}{downArrow}{enter}');
      cy.getBySel('testDiv').should('exist').contains('Salem');
    });
  });
});
