'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUsers, User } from '@services/user';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasError, setError] = useState<boolean>(false);

  // Fetch users on mount with a server action, this only makes sense for dynamic data https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#useeffect
  // For static data you would just execute the function directly in the component
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Fetching Users failed:', error);
        setError(true);
      });
  }, []);

  if (hasError) {
    return (
      <p>
        Something went wrong while fetching users. Is the backend turned on?
      </p>
    );
  }

  return (
    <section>
      <h1>Select a User</h1>
      <ul>
        {users.map(({ _id, name }) => (
          <li key={_id.toString()}>
            <Link href={`/user/${_id}`}>
              {_id.toString()} | {name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Users;
