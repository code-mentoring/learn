import React, { useState } from 'react';
import Slider, { Marks } from 'rc-slider';

// TODO: change to module
import './style.css';
import 'rc-slider/assets/index.css';

interface SliderFieldProps {
  min?: number;
  max?: number;
  onChange?: (v: number) => void;
  value?: number;
}

export const SliderField: React.FunctionComponent<SliderFieldProps> = ({
  min = 0,
  max = 10,
  onChange,
  value = 0
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  const marks: Marks = {};
  [...Array(max + 1).keys()].forEach(i => {
    marks[i] = '';
  });

  return <>
    <Slider
      min={min}
      max={max}
      value={sliderValue}
      railStyle={{ height: '8px', borderRadius: '0px' }}
      dotStyle={{
        width: '2px',
        height: '18px',
        bottom: '-8px',
        borderRadius: '0',
        borderColor: '#DCD8F0',
        backgroundColor: 'inherit'
      }}
      handleStyle={{
        width: '24px',
        height: '24px',
        bottom: '-5px',
        border: '4px solid #0DD2AB'
      }}
      activeDotStyle={{
        borderColor: '#0BB996'
      }}
      trackStyle={{
        height: '8px',
        backgroundColor: '#23DDB8',
        borderRadius: '0px'
      }}
      marks={marks}
      step={null}
      onChange={(v: number) => {
        setSliderValue(v);
        if (onChange) onChange(v);
      }}
    />
  </>;
};
