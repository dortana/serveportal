'use client';
import React, { useActionState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Logo from '../Logo';
import { toast } from 'sonner';
import BackIcon from '../icons/BackIcon';
import { resendCodeAction, verifyForgotAction } from '@/actions/auth';

const VerificationForgotForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [remainingTime, setRemainingTime] = React.useState(300);
  const [hideError, setHideError] = React.useState(false);

  const [state, formAction, isPending] = useActionState(
    verifyForgotAction,
    null,
  );

  useEffect(() => {
    if (state?.status && !state.errors) {
      toast.success(t('Success'), {
        description: t('Verification successful, redirecting...'),
      });
      return router.replace('/auth/login');
    } else if (state?.errors) {
      setHideError(false);
      toast.error(t('Error'), {
        description: t('Verification failed, please check your inputs.'),
      });
    }
  }, [state, router, t]);

  /// for resend code

  const [stateResend, formActionResend, isPendingResend] = useActionState(
    resendCodeAction,
    null,
  );

  useEffect(() => {
    if (stateResend?.status && !stateResend.errors) {
      setHideError(true);
      setRemainingTime(300);
      toast.success(t('Success'), {
        description: t('New OTP has been sent to your email.'),
      });
    } else if (stateResend?.errors) {
      setHideError(false);
      toast.error(t('Error'), {
        description: stateResend?.errors?.email,
      });
    }
  }, [stateResend, router, t]);

  const ResendButton = () => {
    return (
      <form
        id='resend-code-form'
        action={formActionResend}
        className={cn(
          'absolute bottom-[167px] right-8',
          !hideError && 'bottom-[190px]',
        )}
      >
        <input type='hidden' name='email' value={email!} />
        <Button
          isLoading={isPendingResend}
          type='submit'
          form='resend-code-form'
          className='bg-white border-none hover:bg-white hover:text-black text-brand text-sm font-semibold flex items-center gap-1 cursor-pointer w-fit p-0 h-fit'
        >
          {t('Resend')}
        </Button>
      </form>
    );
  };

  return (
    <Card className='border-0 shadow-none w-full md:w-2/3 sm:max-w-[440px] relative'>
      <CardHeader>
        <Logo className='text-brand mx-auto mb-4 max-md:hidden' width={70} />
        <CardTitle className='text-2xl'>{t('Verification')}</CardTitle>
        <CardDescription>
          {t('Please enter the code sent to {des}', {
            des: email ?? '',
          })}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className='grid gap-6'>
          <div className='w-full flex items-center justify-between'>
            <InputOTP maxLength={6} name='otp'>
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  autoFocus
                  className={cn(
                    state?.errors?.otp && !hideError && 'border-red-500',
                  )}
                />
                <InputOTPSlot
                  index={1}
                  className={cn(
                    state?.errors?.otp && !hideError && 'border-red-500',
                  )}
                />
                <InputOTPSlot
                  index={2}
                  className={cn(
                    state?.errors?.otp && !hideError && 'border-red-500',
                  )}
                />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className={cn(
                    state?.errors?.otp && !hideError && 'border-red-500',
                  )}
                />
                <InputOTPSlot
                  index={4}
                  className={cn(
                    state?.errors?.otp && !hideError && 'border-red-500',
                  )}
                />
                <InputOTPSlot
                  index={5}
                  className={cn(
                    state?.errors?.otp && !hideError && 'border-red-500',
                  )}
                />
              </InputOTPGroup>
            </InputOTP>

            {remainingTime !== 0 && (
              <CountdownCircleTimer
                isPlaying
                duration={300}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={40}
                strokeWidth={3}
                onUpdate={x => setRemainingTime(x)}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            )}
          </div>
          {state?.errors?.otp && !hideError && (
            <p className='text-xs text-red-500 -mt-4'>{state.errors.otp}</p>
          )}
          <input type='hidden' name='email' value={email!} />
          <CardFooter className='p-0'>
            <Button className='w-full' isLoading={isPending}>
              {t('Verify Code')}
            </Button>
          </CardFooter>
        </CardContent>
      </form>
      {remainingTime === 0 && <ResendButton />}
      <CardContent>
        {remainingTime !== 0 && (
          <div className='text-sm flex items-center justify-center my-4'>
            <span className='text-zinc-500'>
              {t.rich(
                'You need to wait <guidelines></guidelines> seconds inorder to request a new code.',
                {
                  guidelines: () => (
                    <span className='text-black font-semibold ml-1'>
                      {remainingTime}
                    </span>
                  ),
                },
              )}
            </span>
          </div>
        )}
        <div className='text-sm flex items-center justify-center'>
          <div
            onClick={() => router.back()}
            className='text-black font-semibold flex items-center gap-1 cursor-pointer w-fit'
          >
            <BackIcon />
            {t('Go Back')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationForgotForm;
