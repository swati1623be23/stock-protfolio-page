import { useState, useEffect } from 'react'
import StockCard from '../components/StockCard'
import SearchBar from '../components/SearchBar'
import StockDetail from '../components/StockDetails'
import { getAllStocksData, getFavorites, addFavorite, removeFavorite } from '../services/api'

const DashboardPage = () => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStock, setSelectedStock] = useState(null)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Load stocks and favorites in parallel
      const [stocksData, favoritesData] = await Promise.all([
        getAllStocksData(),
        getFavorites()
      ])
      
      if (stocksData && stocksData.length > 0) {
        setStocks(stocksData)
      } else {
        setError('Failed to load stock data. Please try again.')
      }
      
      if (favoritesData.success) {
        setFavorites(favoritesData.favorites || [])
      }
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isFavorite = (symbol) => {
    return favorites.some(fav => fav.symbol === symbol)
  }

  const handleToggleFavorite = async (stock) => {
    const { symbol, name } = stock
    
    if (isFavorite(symbol)) {
      // Remove from favorites
      const result = await removeFavorite(symbol)
      if (result.success) {
        setFavorites(favorites.filter(fav => fav.symbol !== symbol))
      }
    } else {
      // Add to favorites
      const result = await addFavorite(symbol, name)
      if (result.success) {
        setFavorites([...favorites, { symbol, name }])
      }
    }
  }

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-container">
      <div className="animated-bg"></div>
      <div className="dashboard-page">
        <div className="container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">📊 Stock Market Dashboard</h1>
            <p className="dashboard-subtitle">Real-time stock prices</p>
            {favorites.length > 0 && (
              <p className="favorites-count">❤️ {favorites.length} Favorite{favorites.length !== 1 ? 's' : ''}</p>
            )}
          </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading stock data...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>⚠️ {error}</p>
            <button onClick={loadInitialData}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <div className="stocks-grid">
            {filteredStocks.length === 0 ? (
              <div className="empty-state">
                <p>No stocks found matching "{searchTerm}"</p>
              </div>
            ) : (
              filteredStocks.map((stock, index) => (
                <StockCard 
                  key={index} 
                  stock={stock} 
                  onClick={setSelectedStock}
                  isFavorite={isFavorite(stock.symbol)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            )}
          </div>
        )}
      </div>

      {selectedStock && (
        <StockDetail stock={selectedStock} onClose={() => setSelectedStock(null)} />
      )}
    </div>
  </div>
)
}

export default DashboardPage