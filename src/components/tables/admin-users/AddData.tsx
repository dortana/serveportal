import AddIcon from '@/components/icons/AddIcon';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRolesIcon } from './icon-renderer';

const AddData = () => {
  const t = useTranslations();
  const rolesIcon = useRolesIcon();
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm' className='h-10'>
              <AddIcon />
              {t('Add Entry')}
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{t('Add Entry')}</DialogTitle>
              <DialogDescription>
                {t('Add new entry into the table')}
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='entryNo'>{t('Entry No.')}</Label>
                <Input id='entryNo' name='entryNo' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='account'>{t('Account')}</Label>
                <Input id='account' name='account' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='documentType'>{t('Document Type')}</Label>
                <Select name='documentType'>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={t('Select one ...')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {rolesIcon.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          <div className='flex items-center gap-2'>
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>{t('Cancel')}</Button>
              </DialogClose>
              <Button type='submit'>{t('Save')}</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddData;
