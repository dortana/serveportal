import React from 'react';
import { Input } from '@/components/ui/input';
import { formatCurrencyHuf } from '@/lib/utils';

interface NumberInputProps extends React.ComponentProps<'input'> {
  allowDecimals?: boolean; // future use
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ onChange, ...props }, ref) => {
    const [formattedValue, setFormattedValue] = React.useState('0 HUF');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
      ];

      if (allowedKeys.includes(key)) return;

      if (!/^\d$/.test(key)) {
        e.preventDefault();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const displayed = e.target.value;
      const raw = displayed.replace(/\s+/g, '');

      setFormattedValue(formatCurrencyHuf(displayed));

      e.target.value = displayed;

      onChange?.({
        ...e,
        target: {
          ...e.target,
          value: raw,
        },
      });
    };

    return (
      <>
        <Input
          {...props}
          ref={ref}
          type='text'
          inputMode='numeric'
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <span className='text-green-500 text-xs absolute top-1.5 right-0'>{`(${formattedValue})`}</span>
      </>
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
