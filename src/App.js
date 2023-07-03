import React from 'react';
import './App.css';

import { Products } from './features/shop/Products';
import { Basket } from './features/shop/Basket';

import { shopInstance } from './features/shop/shop.service';

function App() {
  return (
    <div className="App">
        <header>
      <Basket 
        shop={shopInstance}
      />
    </header>
    <main>
      <h1>Каталог товаров</h1>
      <Products 
        shop={shopInstance}
      />
    </main>
    </div>
  );
}

export default App;
