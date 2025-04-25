import { NextPageWithLayout } from '@/app/interfaces';
import { CreateUserForm } from '@/app/user/_partials/CreateUserForm';

const Page: NextPageWithLayout = () => {
  return (
    <section>
      <h1>Create a User</h1>
      <CreateUserForm />
    </section>
  );
};

export default Page;
