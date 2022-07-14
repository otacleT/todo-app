import { getAuth, signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useCallback } from 'react';
import { AiFillGithub, AiFillTwitterCircle } from 'react-icons/ai';
import { useAuthState } from './hooks/authentication';

/**@package */
export const Header: FunctionComponent = () => {
  const { isSignedIn, userName } = useAuthState();
  const router = useRouter();

  const handleSignin = useCallback(() => {
    router.push('/signin');
  }, [router]);

  const handleSignOut = useCallback(() => {
    signOut(getAuth());
    router.push('/signin');
  }, [router]);

  return (
    <header className='w-full shadow-md shadow-black/25'>
      <div className='h-[70px] max-w-3xl px-3 mx-auto  flex justify-between items-center'>
        <h1>
          <Link href='/'>
            <a>
              <Image
                src='/logo.png'
                layout='intrinsic'
                objectFit='contain'
                width={95}
                height={40}
              />
            </a>
          </Link>
        </h1>
        <nav>
          <ul className='flex justify-between items-center'>
            <li className='px-3'>
              <a
                href='https://github.com/MIYABETaisei'
                target='_black'
                rel='noopenner'
                className='text-3xl'
              >
                <AiFillGithub />
              </a>
            </li>
            <li className='px-3'>
              <a
                href='https://twitter.com/otacleT'
                target='_black'
                rel='noopenner'
                className='text-3xl'
              >
                <AiFillTwitterCircle />
              </a>
            </li>
            <li className='px-3'>
              <div>{userName}</div>
            </li>
            <li className='px-3'>
              <div>
                {isSignedIn ? (
                  <>
                    <button className='text-3md' onClick={handleSignOut}>
                      ログアウト
                    </button>
                  </>
                ) : (
                  <button className='text-3md' onClick={handleSignin}>
                    ログイン
                  </button>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
