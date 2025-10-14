import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Button } from './ui/button';
import { GoogleIcon } from './icons/GoogleIcon';
import FacebookIcon from './icons/FacebookIcon';

const SocialLogin = () => {
  const [isloadingGoogle, setIsLoadingGoogle] = React.useState(false);
  const [isloadingFacebook, setIsLoadingFacebook] = React.useState(false);
  const signInWithGoogle = async () => {
    setIsLoadingGoogle(true);
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/panel/dashboard',
    });
    setIsLoadingGoogle(false);
  };
  const signInWithFacebook = async () => {
    setIsLoadingFacebook(true);
    await authClient.signIn.social({
      provider: 'facebook',
      callbackURL: '/panel/dashboard',
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
