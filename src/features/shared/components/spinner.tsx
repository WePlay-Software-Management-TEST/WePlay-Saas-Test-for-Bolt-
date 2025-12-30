import React from 'react';

interface SpinnerProps {
  /** tailwind size classes for the spinner itself, e.g. "h-8 w-8" */
  size?: string
  /** tailwind border-thickness class, e.g. "border-t-2" */
  thickness?: string
  /** tailwind border-color class, e.g. "border-blue-500" */
  color?: string
  /** extra classes on the spinner element */
  className?: string
  /** classes on the wrapper (centering) div */
  containerClassName?: string
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'h-16 w-16',
  thickness = 'border-t-2',
  color = 'border-blue-50',
  className = '',
  containerClassName = ''
}) => {
  return (
    <div className={`flex justify-between items-center gap-3 md:mx-4 ${containerClassName}`}>
      <p className="hidden md:block text-sm text-nowrap">Saving...</p>
      <div
        className={`
          animate-spin
          rounded-full
          ${size}
          ${thickness}
          ${color}
          border-solid
          ${className}
        `}
      />
    </div>
  );
};

export default Spinner;
