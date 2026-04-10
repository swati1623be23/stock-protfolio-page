const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search stocks by name or symbol (AAPL, TSLA, etc)..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button className="clear-btn" onClick={() => onSearchChange('')}>
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar