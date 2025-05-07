
import './App.css';
import {Navigate,BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import HomePage from "./pages/home.js"
import ProductsPage from "./pages/products.js"
import Cart from "./pages/Cart.js"
import ProductDetailsPage from "./pages/product.js"
import ErrorBoundary from './pages/ErrorBoundary.js'
function App() {
  return (
      <Router>
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
      <Route path="/home" element={<HomePage />} />
       <Route path="/products" element={<ProductsPage />} />
       <Route path="/product/:productId" element={<ProductDetailsPage />} />
       <Route path="/product/:productId/userId/:userId" element={<ProductDetailsPage />} />
       <Route path="/cart" element={<Cart/>} />
      </Routes>
      </Router>
  );
}
export default App;
