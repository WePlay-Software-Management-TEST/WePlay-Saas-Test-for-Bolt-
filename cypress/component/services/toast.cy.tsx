import React from 'react';
import { ToastContainer } from 'react-toastify';
import { toastService, ToastTypes } from 'core/services/toast.service';

describe('toast.service.tsx', () => {
  beforeEach(function () {
    const ToastWrapper = ({ callback }: { callback: () => void }): JSX.Element => {
      return <>
      <button data-cy='toastBtn' onClick={callback}>Click me to show taast</button>
      <ToastContainer toastStyle={{
        fontFamily: 'Inter, Times New Roman, Serif',
        borderRadius: '8px'
      }}
      className={
        'mobile:!p-4 mobile:flex mobile:justify-center mobile:flex-col mobile:gap-4'}
      toastClassName={
        'w-[600px] ml-[80px] mobile:w-full mobile:ml-0'
      }
      />
      </>;
    };

    cy.wrap(ToastWrapper).as('ToastWrapper');
  });
  ToastTypes.forEach(function (toastType) {
    it('When toast type is ' + toastType + ' color should be ' + toastType, function () {
      const Comp = this.ToastWrapper as ({ callback }: { callback: () => void }) => JSX.Element;
      const callback = (): void => {
        toastService(toastType, toastType);
      };
      let typeClass = 'bg-grey-10';
      switch (toastType) {
        case 'info':
          typeClass = 'bg-grey-10';
          break;
        case 'success':
          typeClass = 'bg-indictor-success';
          break;
        case 'error':
          typeClass = 'bg-indictor-error';
          break;
        case 'warning':
          typeClass = 'bg-indictor-warning';
          break;
        case 'secondary':
          typeClass = 'bg-secondary';
      };

      cy.mount(<Comp callback={callback}/>);

      cy.getBySel('toastBtn').click();

      cy.getBySel('toastMessage').should('have.class', typeClass);
      cy.getBySel('toastMsg').should('have.text', toastType);
      cy.getBySel('dismissBtn').should('have.class', 'text-grey-70');
    });
  });

  it('text is above 256 char toast body should expand vertically', function () {
    const Comp = this.ToastWrapper as ({ callback }: { callback: () => void }) => JSX.Element;
    const callback = (): void => {
      toastService('Some ver long text, that should be over 256, overflow is not allowed in this toast, this should ellipsis around, not overflow, will this work???');
    };

    cy.mount(<Comp callback={callback}/>);
    cy.getBySel('toastBtn').click();
    cy.getBySel('toastMessage').invoke('outerWidth').should('be.greaterThan', 56);
  });

  it('toast messages should have rounded edges at 8px', function () {
    const Comp = this.ToastWrapper as ({ callback }: { callback: () => void }) => JSX.Element;
    const callback = (): void => {
      toastService('Some ver long text, that should be over 256, overflow is not allowed in this toast, this should ellipsis around, not overflow, will this work???');
    };

    cy.mount(<Comp callback={callback}/>);
    cy.getBySel('toastBtn').click();
    cy.getBySel('toastMessage').should('have.class', '!rounded-lg');
  });

  it('When "Dismiss button is clicked, toast message should disappear"', function () {
    const Comp = this.ToastWrapper as ({ callback }: { callback: () => void }) => JSX.Element;
    const callback = (): void => {
      toastService('Some ver long text, that should be over 256, overflow is not allowed in this toast, this should ellipsis around, not overflow, will this work???');
    };

    cy.mount(<Comp callback={callback}/>);
    cy.getBySel('toastBtn').click();
    cy.getBySel('dismissBtn').click();
    cy.getBySel('toastMessage').should('not.exist');
  });
});
