'use client';

import React from 'react';
import { Root as SliderRoot, Track, Range, Thumb } from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const DualRangeSlider = React.forwardRef(
  ({ className, label, labelPosition = 'top', ...props }, ref) => {
    const initialValue = Array.isArray(props.value) ? props.value : [props.min, props.max];

    return (
      <SliderRoot
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
      >
        <Track className="relative w-full h-2 overflow-hidden rounded-full grow bg-secondary">
          <Range className="absolute h-full bg-primary" />
        </Track>
        {initialValue.map((value, index) => (
          <Thumb
            key={index}
            className="relative block w-4 h-4 transition-colors border-2 rounded-full border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {label && (
              <span
                className={cn(
                  'absolute flex w-full justify-center',
                  labelPosition === 'top' ? '-top-7' : 'top-4'
                )}
              >
                {label(value)}
              </span>
            )}
          </Thumb>
        ))}
      </SliderRoot>
    );
  }
);

DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };
