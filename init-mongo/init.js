db.createUser({
  user: 'user',
  pwd: 'admin',
  roles: [
    {
      role: 'readWrite',
      db: 'user_database',
    },
  ],
});
