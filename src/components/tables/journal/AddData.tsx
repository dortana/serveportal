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

const AddData = () => {
  const t = useTranslations();
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm' className='h-10'>
              <AddIcon />
              {t('Add Statement')}
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{t('Add Statement')}</DialogTitle>
              <DialogDescription>
                {t('Add new statement to the table')}
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='entryNo'>{t('Entry No.')}</Label>
                <Input id='entryNo' name='entryNo' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='name-1'>{t('Account Name')}</Label>
                <Input id='name-1' name='name' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='documentType'>{t('Document Type')}</Label>
                <Select>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select one ...' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='ka'>KA</SelectItem>
                      <SelectItem value='ba'>BA</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddData;
