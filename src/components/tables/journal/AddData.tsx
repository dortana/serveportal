import AddIcon from '@/components/icons/AddIcon';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import React from 'react';

const AddData = () => {
  const t = useTranslations();
  return (
    <div>
      <Button variant='outline' size='sm' className='h-10'>
        <AddIcon />
        {t('Add Entry')}
      </Button>
    </div>
  );
};

export default AddData;
