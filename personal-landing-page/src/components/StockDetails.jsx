const StockDetail = ({ stock, onClose }) => {
  if (!stock || !stock.data) return null
  
  const { symbol, name, data } = stock
  const currentPrice = data.c?.toFixed(2) || 0
  const high = data.h?.toFixed(2) || 0
  const low = data.l?.toFixed(2) || 0
  const volume = data.v?.toLocaleString() || 0
  const open = data.o?.toFixed(2) || 0
  const change = data.d?.toFixed(2) || 0
  const isPositive = change >= 0
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="stock-detail">
          <h2>{symbol} - {name}</h2>
          <div className="detail-price">
            <span className={`detail-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '▲' : '▼'}
            </span>
            <span className="current-price-large">${currentPrice}</span>
            <span className={`change-percent ${isPositive ? 'positive' : 'negative'}`}>
              {change} ({data.dp?.toFixed(2)}%)
            </span>
          </div>
          
          <div className="detail-stats">
            <div className="stat">
              <label>Day High</label>
              <span>${high}</span>
            </div>
            <div className="stat">
              <label>Day Low</label>
              <span>${low}</span>
            </div>
            <div className="stat">
              <label>Open</label>
              <span>${open}</span>
            </div>
            <div className="stat">
              <label>Volume</label>
              <span>{volume}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockDetail