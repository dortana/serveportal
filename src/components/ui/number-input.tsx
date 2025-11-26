import React from 'react';
import { Input } from '@/components/ui/input';

interface NumberInputProps extends React.ComponentProps<'input'> {
  allowDecimals?: boolean; //in future
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ onChange, ...props }, ref) => {
    const formatHuf = (value: string) => {
      // remove non-digits
      const digits = value.replace(/\D/g, '');

      // format with Hungarian thousands separator (space)
      return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
      ];

      // allow navigation keys
      if (allowedKeys.includes(key)) return;

      // block non-digits
      if (!/^\d$/.test(key)) {
        e.preventDefault();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      const formatted = formatHuf(rawValue);

      // manually update the value
      e.target.value = formatted;

      onChange?.(e);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type='text'
        inputMode='numeric'
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
