import {
  getAuth,
  EmailAuthProvider,
  // FacebookAuthProvider,
  GoogleAuthProvider,
  // TwitterAuthProvider,
} from "firebase/auth";
import { auth } from "firebaseui";
import { FunctionComponent } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig: auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    // FacebookAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
    // TwitterAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/",
};

type Props = {
  config: auth.Config | undefined;
};

export const Signin: FunctionComponent<Props> = (props) => {
  const { config } = props;

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1>サインイン</h1>
        {config && <StyledFirebaseAuth firebaseAuth={getAuth()} uiConfig={config} />}
      </div>
    </>
  );
};
