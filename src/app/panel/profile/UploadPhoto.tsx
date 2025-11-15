import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import UploadIcon from '@/components/icons/UploadIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const UploadPhoto = ({ user }: { user: User }) => {
  const t = useTranslations();
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{t('Profile Image')}</CardTitle>
        <CardDescription>
          {t('Upload a profile image to personalize your account.')}
        </CardDescription>
      </CardHeader>
      <CardContent className='bg-tertiary rounded-bl-md rounded-br-md h-auto flex items-center gap-4 p-4 justify-around'>
        <Avatar className='size-20 md:size-28'>
          <AvatarImage src={user.image ?? 'https://github.com/shadcn.png'} />
          <AvatarFallback>
            {user.firstName.charAt(0).toUpperCase() +
              user.lastName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex items-center gap-2 flex-wrap justify-end'>
          <Button className='w-40 md:w-48' isLoading={false} variant='outline'>
            <UploadIcon />
            {t('Upload New')}
          </Button>
          <Button
            className='w-40 md:w-48'
            isLoading={false}
            variant='destructive'
          >
            <TrashIcon />
            {t('Delete')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadPhoto;
