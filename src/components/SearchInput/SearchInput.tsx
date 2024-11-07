import "./search-input.scss"
import searchIcon from "../../assets/images/icons/search.svg"

const SearchInput = () => {
  return (
    <input
      className="search-input"
      type="text"
      placeholder='Search Location...'
    />
  );
}

export default SearchInput;
