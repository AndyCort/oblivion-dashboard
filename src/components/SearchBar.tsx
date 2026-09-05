import { useState } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { WidgetBase } from './ui/Shared';

const SearchWidget = styled(WidgetBase)`
  padding: 0;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.25rem;
  font-weight: 300;
  outline: none;
  padding-left: 3.5rem;
  font-family: 'Inter', sans-serif;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <SearchWidget className={className}>
      <SearchIconWrapper>
        <Search size={24} />
      </SearchIconWrapper>
      <SearchInput
        type="text"
        placeholder="Search the web..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        autoComplete="off"
      />
    </SearchWidget>
  );
}
