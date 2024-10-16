import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext, useState } from 'react'

export const server = "https://taskify-backend-miu2.onrender.com/api/v1";
// export const server = "http://localhost:4000/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      loading,
      setLoading,
    }}>
      <App />
    </Context.Provider>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper></AppWrapper>
  </StrictMode>,
)
