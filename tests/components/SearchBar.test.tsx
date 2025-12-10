import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/search/SearchBar';

describe('SearchBar Component', () => {
  it('should render with placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    expect(
      screen.getByPlaceholderText('Search recipes...')
    ).toBeInTheDocument();
  });

  it('should render custom placeholder', () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        placeholder="Find your recipe"
      />
    );

    expect(screen.getByPlaceholderText('Find your recipe')).toBeInTheDocument();
  });

  it('should display current value', () => {
    render(<SearchBar value="chocolate" onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Search recipes...');
    expect(input).toHaveValue('chocolate');
  });

  it('should call onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search recipes...');
    await user.type(input, 'p');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('p');
  });

  it('should show clear button when value is not empty', () => {
    render(<SearchBar value="test" onChange={() => {}} />);

    const clearButton = screen.getByLabelText('Clear search');
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when value is empty', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const clearButton = screen.queryByLabelText('Clear search');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should clear value when clicking clear button', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchBar value="chocolate" onChange={handleChange} />);

    const clearButton = screen.getByLabelText('Clear search');
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('should render search icon', () => {
    const { container } = render(<SearchBar value="" onChange={() => {}} />);

    // Search icon is rendered by lucide-react
    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });
});
