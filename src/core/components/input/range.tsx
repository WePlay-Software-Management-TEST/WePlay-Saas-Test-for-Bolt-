import React from 'react';
import ReactSlider from 'react-slider';

interface RangeSliderProps {
  min: number
  max: number
  defaultValue?: number[]
  value?: number[]
  onChange: ((value: number[], index: number) => void) | undefined
}
const RangeSlider = (
  { min, max, defaultValue, onChange, value }: RangeSliderProps
): JSX.Element => {
  return (
    <ReactSlider
    className="w-full flex items-center justify-center h-7"
    thumbClassName='w-6 h-6 min-h-6 min-w-6 bg-dodger-blue-60 rounded-full cursor-pointer'
    trackClassName="bg-dodger-blue-60 text-grey-10 h-[6px]"
    defaultValue={defaultValue}
    min={min}
    max={max}
    onChange={onChange}
    value={value}
    ariaLabel={['Lower thumb', 'Upper thumb']}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    renderThumb={(props) => <div {...props}></div>}
    renderTrack={(props, state) => {
      const points = Array.isArray(state.value) ? state.value.length : null;
      const isMulti = !Number.isNaN(points) && points !== null && points > 0;
      const isLast = isMulti ? state.index === points : state.index !== 0;
      const isFirst = state.index === 0;
      return <div {...props} className={`${!isFirst && !isLast ? '!bg-dodger-blue-60 h-[6px] rounded-md' : '!bg-grey-70 h-[6px] rounded-md'}`}></div>;
    }}
    pearling
    withTracks={true}
    minDistance={5}
/>
  );
};
export default RangeSlider;
