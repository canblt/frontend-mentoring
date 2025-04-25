import Link from 'next/link';
import { CardContainer } from '@/components/Card';
import { User } from '@services/user';

export const UserCard = ({ user }: { user: User }) => {
  return (
    <CardContainer>
      <h2>{user.name}</h2>
      <p>
        {user.role} at {user.company}
      </p>
      <Link href={`mailto: ${user.email}`}>Contact here</Link>
    </CardContainer>
  );
};
