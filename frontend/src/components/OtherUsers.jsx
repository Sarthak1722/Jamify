import React from "react";
import OtherUser from './OtherUser.jsx';
import { useSelector } from 'react-redux'

const OtherUsers = ({ users }) => {
  const {otherUsers} = useSelector(store => store.user);

  if(!otherUsers) return null;
  return (
    <div className="space-y-1 px-1 pb-3 sm:px-0">
        {users?.length ? users.map((user)=> {
            return (
                <OtherUser key={user._id} user={user}/>
            )
        }) : (
          <div className="mx-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-6 text-center">
            <p className="text-sm font-medium text-white">No chats found</p>
            <p className="mt-1 text-xs leading-5 text-zinc-400">
              Try a different name or wait for more friends to come online.
            </p>
          </div>
        )}    
    </div>
  );
};

export default OtherUsers;
