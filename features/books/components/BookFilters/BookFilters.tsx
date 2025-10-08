import { TextField, Button, Stack } from '@mui/material';
import { useState, FormEvent } from 'react';
import { BookFiltersProps } from './interfaces';
export default function BookFilters({ onFilter }: BookFiltersProps) {
  const [input, setInput] = useState('');
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onFilter(input);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          label="Search by title"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
        >
          Search
        </Button>
      </Stack>
    </form>
  );
}
