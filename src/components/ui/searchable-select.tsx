'use client';

import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export interface SelectItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
}

interface SearchableSelectProps {
  items: SelectItem[];
  name: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

export default function SearchableSelect({
  items,
  placeholder = 'Select ...',
  onChange,
  name,
  className,
  defaultValue,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<SelectItem | null>(
    items.find(item => item.value === defaultValue) || null,
  );
  const t = useTranslations();
  const selectItem = (item: SelectItem) => {
    setSelected(item);
    setOpen(false);
    onChange?.(item.value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input type='hidden' name={name} value={selected?.value || ''} />
      {/* TRIGGER BUTTON */}
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className={cn('w-full justify-between h-10', className)}
        >
          <div className='flex items-center gap-2'>
            {selected?.icon && <span className='w-5 h-5'>{selected.icon}</span>}
            {!selected && (
              <span className='text-muted-foreground font-normal'>
                {placeholder}
              </span>
            )}
            {selected && <span>{selected.label}</span>}
          </div>
          <ChevronDown className='w-4 h-4 opacity-30' />
        </Button>
      </PopoverTrigger>

      {/* DROPDOWN */}
      <PopoverContent
        className='p-0 w-[var(--radix-popover-trigger-width)]'
        align='start'
        side='bottom'
      >
        <Command>
          <CommandInput placeholder={t('Search ...')} />
          <CommandEmpty>{t('No results found.')}</CommandEmpty>

          <CommandGroup>
            {items.map(item => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => selectItem(item)}
              >
                {/* Checkmark */}
                <Check
                  className={cn(
                    'h-5 w-5',
                    selected?.value === item.value
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />

                {item.icon}

                {/* Labels */}
                <div className='flex flex-col'>
                  <span>{item.label}</span>
                  {item.description && (
                    <span className='text-xs text-muted-foreground'>
                      {item.description}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
