import React from 'react';
import { DialogClose } from '@radix-ui/react-dialog';
import { operation_places } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getTranslations } from 'next-intl/server';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import SelectCity from './SelectCity';
import LocationIcon from '../icons/LocationIcon';
import { cityGetAction } from '@/actions/app';

const CitySelector = async ({ className }: { className?: string }) => {
  const t = await getTranslations();
  const currentCity = await cityGetAction();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn('flex items-center gap-1 cursor-pointer', className)}
        >
          <LocationIcon className='size-5' />
          <span className='text-sm'>{currentCity}</span>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:min-w-fit'>
        <DialogHeader className='text-left'>
          <DialogTitle>{t('Choose Your Service Location')}</DialogTitle>
          <DialogDescription>
            {t('Select the city where you want to find trusted professionals.')}
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 py-4'>
          {operation_places[0].cities.map((item, index) => {
            return (
              <SelectCity
                key={index}
                selected={item === currentCity}
                city={item}
              />
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' className='mx-auto'>
              {t('Close')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CitySelector;
