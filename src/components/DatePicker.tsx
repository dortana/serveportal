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
  const formatDate = (d?: Date) => {
    if (!d) return 'Select date';
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  };
  return (
    <div className='flex flex-col gap-3'>
      <input type='hidden' name={name} value={date ? date.toISOString() : ''} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id='date'
            className={cn('w-full justify-between font-normal h-10', className)}
          >
            {formatDate(date)}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
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
