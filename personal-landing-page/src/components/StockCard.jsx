const StockCard = ({ stock, onClick, isFavorite, onToggleFavorite }) => {
  const { symbol, name, data } = stock
  
  if (!data) {
    return (
      <div className="stock-card loading">
        <div className="skeleton"></div>
      </div>
    )
  }
  
  const currentPrice = data.c?.toFixed(2) || 0
  const change = data.d?.toFixed(2) || 0
  const changePercent = data.dp?.toFixed(2) || 0
  const isPositive = change >= 0
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    onToggleFavorite(stock)
  }
  
  return (
    <div className="stock-card" onClick={() => onClick(stock)}>
      <div className="stock-info">
        <h3 className="stock-symbol">{symbol}</h3>
        <p className="stock-name">{name}</p>
      </div>
      <div className="stock-price-info">
        <div className="current-price">${currentPrice}</div>
        <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '▲' : '▼'} {change} ({changePercent}%)
        </div>
      </div>
      <button 
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  )
}

export default StockCard