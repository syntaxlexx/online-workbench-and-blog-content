import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const {data: sessionData} = useSession();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xp font-bold">
        {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : 'Not logged in'}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown-end dropdown">
          {sessionData?.user ? (
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar brn"
              onClick={() => void signOut()}
            >
              <div className="w-10 rounded-full">
                <img src={sessionData?.user?.image ?? ''} alt={sessionData?.user?.name ?? ''} />
              </div>

            </label>
          ) : (
            <button className="btn-ghost rounded-btn btn" onClick={() => void signIn()}>
              Sign In
            </button>
          )
          }
        </div>
      </div>
    </div>
  )
}