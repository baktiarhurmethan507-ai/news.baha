import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext"; 
import Header from "./components/Header";
import PostList from "./components/PostList"; 
import PostDetailPage from "./components/PostDetailPage"; 
import Cart from "./components/Cart"; 
import Login from "./components/Login"; 
import Register from "./components/Register"; 
// 1. Импортируем Profile
import Profile from "./components/Profile"; 

import "./assets/style/style.css";

function App() {
  return (
    <CartProvider> 
      <div className="App">
        <Header /> 
        
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/detail/:id" element={<PostDetailPage />} />
            <Route path="/notes" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* 2. Добавляем путь для страницы профиля */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;