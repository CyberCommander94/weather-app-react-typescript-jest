import "./search-input.scss"
import React, { useState, ChangeEvent } from 'react';
interface SearchInputProps {
  onChange: (value: string) => void;
  defaultValue?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({onChange, defaultValue = '' }) => {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange(value);
    }
  };

  return (
    <div className="search-input-wrapper">
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder='Search Location...'
        spellCheck="false"
      />
    </div>
  );
}

export default SearchInput;
