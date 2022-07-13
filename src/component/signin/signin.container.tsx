import { EmailAuthProvider } from 'firebase/auth';
import { auth } from 'firebaseui';
import { FunctionComponent, useState, useEffect } from 'react';
import { Signin as SigninComponent } from './signin';

export const Signin: FunctionComponent = () => {
  const [config, setConfig] = useState<auth.Config>();

  useEffect(() => {
    const uiConfig: auth.Config = {
      signInFlow: 'popup',
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        // FacebookAuthProvider.PROVIDER_ID,
        // GoogleAuthProvider.PROVIDER_ID,
        // TwitterAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/',
    };
    setConfig(uiConfig);
  }, []);

  return (
    <>
      <SigninComponent config={config} />
    </>
  );
};
