import { Stack, TextField, Button } from '@mui/material';
import { FormEvent, useState } from 'react';

interface AuthorFiltersProps {
  onFilter: (name: string, minBooks: number) => void;
}

export default function AuthorFilters({ onFilter }: AuthorFiltersProps) {
  const [name, setName] = useState('');
  const [minBooks, setMinBooks] = useState(0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onFilter(name, minBooks);
  };

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setName(value);
    onFilter(value, minBooks); // live update
  }

  function handleMinBooksChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value) || 0;
    setMinBooks(value);
    onFilter(name, value); // live update
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Author filters"
      style={{ width: '100%' }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          label="Search author"
          value={name}
          onChange={handleNameChange}
          fullWidth
          inputProps={{ 'aria-label': 'Search author by name' }}
        />
        <TextField
          label="Min Books"
          type="number"
          value={minBooks}
          onChange={handleMinBooksChange}
          sx={{ width: 140 }}
          inputProps={{ min: 0, 'aria-label': 'Minimum number of books' }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ whiteSpace: 'nowrap' }}
        >
          Apply
        </Button>
      </Stack>
    </form>
  );
}
