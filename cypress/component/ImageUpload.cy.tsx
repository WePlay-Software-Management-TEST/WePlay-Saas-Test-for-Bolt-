import React from 'react';
import ImageUpload from 'core/components/input/imageUpload';
import { useForm } from 'react-hook-form';
import { type PreviewFile } from 'core/models/uploadimage.model';
import invalidTestImage from '../../cypress/fixtures/images/imagelessthan1mb.png';

// Cypress cy.selectFile() is throwing an error on Webkit:
// "Timed out retrying after 4000ms: undefined is not an object (evaluating 'dataTransfer.items.add')"
// issue is still open, for tracking purposes here's the issue url:
// https://github.com/cypress-io/cypress/issues/24815

describe('ImageUpload Component', () => {
  before(() => {
    cy.wrap('cypress/fixtures/images/imagebiggerthan1mb.jpg').as('testImage');
    cy.wrap('cypress/fixtures/images/lessThan1mb.gif').as('invalidTestImage');
  });
  beforeEach(() => {
    const Wrapper = (): JSX.Element => {
      const { setValue } = useForm<{ image: File[] }>();
      return (
        <>
          <ImageUpload
          formFieldName='image'
          setValue={setValue}
          cyDataDraggable='uploadImageBox'
          cyDataInput='uploadImageInput'/>
        </>
      );
    };
    cy.mount(<Wrapper/>);
  });

  it('Upload Image renders correctly', () => {
    cy.getBySel('uploadImageBox').should('have.css', 'outline-style', 'dashed');
    cy.getBySel('placeholderText').should('have.css', 'color', 'rgb(102, 102, 102)');
    cy.getBySel('uploadImageInput').should('have.value', '');
    cy.getBySel('previewImage').should('not.exist');
  });

  it('Adjust image dialog renders correctly', { browser: '!webkit' }, function () {
    cy.getBySel('uploadImageBox').selectFile(
      this.testImage,
      { force: true, action: 'drag-drop' }
    );
    cy.getBySel('closeDialogHeaderButton').should('be.visible');
    cy.getBySel('closeDialogFormButton').should('be.visible');
    cy.getBySel('confirmDialogButton').should('be.visible');
    cy.getBySel('croppingImage').should('be.hidden');
  });

  it('Closing Dialog without saving should not view preview', { browser: '!webkit' }, function () {
    cy.getBySel('uploadImageBox').selectFile(
      this.testImage,
      { force: true, action: 'drag-drop' }
    ).then(() => {
      cy.getBySel('closeDialogHeaderButton').click().then(() => {
        cy.wait(100).then(() => {
          cy.getBySel('previewImage').should('not.exist');
          cy.getBySel('previewImgTag').should('not.exist');
          cy.getBySel('editImageButton').should('not.exist');
        });
      });
    });
  });

  it('Closing edit Dialog saving should view preview of previously saved image', { browser: '!webkit' }, function () {
    cy.getBySel('uploadImageBox').selectFile(
      this.testImage,
      { force: true, action: 'drag-drop' }
    ).then(() => {
      cy.getBySel('confirmDialogButton').click().then(() => {
        cy.getBySel('editImageButton').click().selectFile(
          this.testImage,
          { force: true, action: 'drag-drop' }
        );
        cy.getBySel('closeDialogHeaderButton').click().then(() => {
          cy.wait(100).then(() => {
            cy.getBySel('previewImage').should('exist');
            cy.getBySel('previewImgTag').should('exist');
            cy.getBySel('editImageButton').should('exist');
          });
        });
      });
    });
  });

  it('Error Message should appear when image the user picked does not meet the validation', { browser: '!webkit' }, function () {
    cy.getBySel('uploadImageInput').selectFile(
      this.invalidTestImage,
      { force: true, action: 'drag-drop' }
    ).then(() => {
      cy.wait(300);
      cy.getBySel('errorText').should('exist');
      cy.getBySel('previewImage').should('not.exist');
      cy.getBySel('previewImgTag').should('not.exist');
      cy.getBySel('editImageButton').should('not.exist');
    });
  });
});

describe('UploadImage component testing filesPreview Prop', () => {
  it('When filesPreview gets pass, preview component should be visible on first render', () => {
    cy.request({ url: invalidTestImage, encoding: 'base64' }).then((res) => {
      cy.log(res.body);
      const previewImage = new File([res.body], 'testFile.png');
      const Wrapper = (): JSX.Element => {
        const { setValue } = useForm<{ image: File[] }>({
        });
        const filesPreview: PreviewFile[] = [{
          ...previewImage as PreviewFile,
          preview: URL.createObjectURL(previewImage)
        }];
        return (
          <>
            <ImageUpload
            formFieldName='image'
            setValue={setValue}
            cyDataDraggable='uploadImageBox'
            filesPreview={filesPreview}
            cyDataInput='uploadImageInput'/>
          </>
        );
      };
      cy.mount(<Wrapper/>).then(() => {
        cy.getBySel('previewImage').should('exist');
        cy.getBySel('previewImgTag').should('exist');
        cy.getBySel('editImageButton').should('exist');
      });
    });
  });
});
