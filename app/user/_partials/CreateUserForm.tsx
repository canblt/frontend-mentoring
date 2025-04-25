import { createUser } from '@services/user';
import styles from './createUserForm.module.css';

const handleCreateUser = async (formData: FormData) => {
  'use server';
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const role = formData.get('role') as string;
  await createUser({ name, email, company, role });
};

export const CreateUserForm = () => {
  return (
    <form
      action={handleCreateUser}
      className={styles.form}
    >
      <div className={styles.content}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
        />
      </div>
      <div className={styles.content}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div className={styles.content}>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
        />
      </div>
      <div className={styles.content}>
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          name="role"
        />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};
