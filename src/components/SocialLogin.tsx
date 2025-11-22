import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Button } from './ui/button';
import { GoogleIcon } from './icons/GoogleIcon';
import FacebookIcon from './icons/FacebookIcon';
import { accountTypeSetAction } from '@/actions/app';

const SocialLogin = ({
  accountType,
}: {
  accountType?: 'customer' | 'expert';
}) => {
  const [isloadingGoogle, setIsLoadingGoogle] = React.useState(false);
  const [isloadingFacebook, setIsLoadingFacebook] = React.useState(false);
  const signInWithGoogle = async () => {
    setIsLoadingGoogle(true);
    if (accountType) {
      await accountTypeSetAction(accountType);
    }
    await authClient.signIn.social({
      provider: 'google',
      callbackURL:
        accountType === 'expert'
          ? '/expert-panel/dashboard'
          : '/panel/dashboard',
    });
    setIsLoadingGoogle(false);
  };
  const signInWithFacebook = async () => {
    setIsLoadingFacebook(true);
    if (accountType) {
      await accountTypeSetAction(accountType);
    }
    await authClient.signIn.social({
      provider: 'facebook',
      callbackURL:
        accountType === 'expert'
          ? '/expert-panel/dashboard'
          : '/panel/dashboard',
    });
    setIsLoadingFacebook(false);
  };
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        onClick={signInWithGoogle}
        isLoading={isloadingGoogle}
        className='flex-1'
      >
        <GoogleIcon />
        Google
      </Button>
      <Button
        variant='outline'
        onClick={signInWithFacebook}
        isLoading={isloadingFacebook}
        className='flex-1'
      >
        <FacebookIcon />
        Facebook
      </Button>
    </div>
  );
};

export default SocialLogin;
