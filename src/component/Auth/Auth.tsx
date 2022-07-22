import { FC } from "react";
import { login, logout, useAuth, useUser } from "src/hooks/useAuth";
import { MdFace } from "react-icons/md";

type Props = {
  children: JSX.Element;
};

export const Auth: FC = () => {
  const user = useUser();

  const handleLogin = (): void => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };

  const Auth = ({ children }: Props): JSX.Element => {
    const isLoading = useAuth();

    return isLoading ? <p className="text-sm leading-none">Loading...</p> : children;
  };

  return (
    <div className="grid grid-rows-1 content-center justify-items-center w-[100px]">
      {user !== null && user.photoURL != null ? (
        <div className="flex items-center justify-center w-[32px] h-[32px]">
          <img className="rounded-full w-full" src={user.photoURL}></img>
        </div>
      ) : (
        <div className="flex items-center justify-center w-[32px] h-[32px] text-3xl">
          <MdFace />
        </div>
      )}
      <Auth>
        {user !== null ? (
          <button className="text-sm leading-none" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="text-sm leading-none" onClick={handleLogin}>
            Login
          </button>
        )}
      </Auth>
    </div>
  );
};
