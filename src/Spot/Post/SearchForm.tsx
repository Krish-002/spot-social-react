import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Ensure you have 'react-icons' installed

// Define the props type
interface SearchFormProps {
  handleSearch: (searchTerm: string) => void; // Assumes handleSearch expects a string
}

const SearchForm: React.FC<SearchFormProps> = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearchEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      setErrorMsg('');
      handleSearch(searchTerm);
    } else {
      setErrorMsg('Please enter a search term.');
    }
  };

  return (
    <div className="kb-search-bar search-container">
      <Form onSubmit={handleSearchEvent} className="mb-3">
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <InputGroup>
          <Form.Control
            type="search"
            value={searchTerm}
            placeholder="Search for a song, artist or album"
            onChange={handleInputChange}
            autoComplete="off"
            aria-label="Search song"
          />
          <Button variant="outline-secondary" type="submit">
            <FaSearch />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchForm;
