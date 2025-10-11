import { signUpAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignUpPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-2xl font-bold'>Sign Up</h1>
      <form action={signUpAction} className='flex flex-col gap-3 w-64'>
        <Input type='text' name='firstName' placeholder='First Name' required />
        <Input type='text' name='lastName' placeholder='Last Name' required />
        <Input type='email' name='email' placeholder='Email' required />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
}
