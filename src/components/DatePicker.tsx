'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import CalendarIcon from './icons/CalendarIcon';
import { cn } from '@/lib/utils';

export function DatePicker({
  name,
  value,
  className,
}: {
  name: string;
  value?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );

  function formatDateLocal(date?: Date) {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);

  return (
    <div className='flex flex-col gap-3'>
      <input type='hidden' name={name} value={formatDateLocal(date)} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id='date'
            className={cn('w-full justify-between font-normal h-10', className)}
          >
            {formatDateLocal(date)}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            defaultMonth={date}
            captionLayout='dropdown'
            onSelect={date => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
