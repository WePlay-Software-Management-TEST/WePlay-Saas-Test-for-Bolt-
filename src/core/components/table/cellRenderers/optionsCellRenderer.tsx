import React from 'react';
import { ReactComponent as EditButton } from 'assets/svgs/edit-table.svg';
import { ReactComponent as DeleteButton } from 'assets/svgs/delete-table.svg';
import { NavLink } from 'react-router-dom';

interface OptionsCellRendererProps {
  id: string
  onDelete: () => void
  editTipText?: string
  deleteTipText?: string
  disableHoverEffect?: boolean
  hideButton?: 'edit' | 'delete' | 'none'
  className?: string
};
/**
 * @component AG-Grid Cell Renderer that views the 'Options' Cell that contains 'Delete' and 'Edit' this row
 * @param { string } id - ID of the row that is associated with this options cell.
 * @param { string } editTipText - Text to show for the Edit button tooltip.
 * @param { string } deleteTipText - Text to show for the Delete button tooltip.
 * @param { () => void} onDelete - Callback onClick on the Delete button.
 * @param { 'edit' | 'delete' | 'none' } hideButton - which button to hide.
 * @param { Boolean } disableHoverEffect - Disable Hover effect.
 * @returns { JSX.Element }
 */
export function OptionsCellRenderer (
  {
    id, onDelete, editTipText = 'Edit Player',
    deleteTipText = 'Delete Player',
    hideButton = 'none',
    disableHoverEffect = false,
    className = ''
  }: OptionsCellRendererProps): JSX.Element {
  return (
  <div
    data-cy='optionsCellRenderer'
    className={`xs:gap-2 options-cell-renderer w-full h-full items-center 
    ${
      disableHoverEffect
      ? 'flex'
      : 'lg:hidden xs:flex'
    } ${className}
    `}>
    <NavLink
      to={`edit/${id}`}
      data-cy='edit-cell-renderer'
      className={`tooltip tooltip-info tooltip-left ${hideButton === 'edit' ? '!hidden' : ''}`}
      data-tip={editTipText}>
        <EditButton />
    </NavLink>
    <button
      data-cy='delete-cell-renderer'
      id='delete-action-cell'
      onClick={onDelete}
      className={`tooltip tooltip-info tooltip-left deleteActionCell ${hideButton === 'delete' ? '!hidden' : ''}`}
      data-tip={deleteTipText}>
      <DeleteButton/>
    </button>
</div>);
};
