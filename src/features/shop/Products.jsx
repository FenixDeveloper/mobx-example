import React from 'react';
import { observer } from "mobx-react";
import styles from './Shop.module.css';

export function Amount({ amount, onAdd, onRemove }) {
    return <div className={styles.amount}>
        <button onClick={onRemove}>-</button>
        <span className={styles.amountValue}>{amount}</span>
        <button onClick={onAdd}>+</button>
      </div>;
}

export function ProductCard({ id, name, price, ...props }) {
    return <article className={styles.item}>
      <h2>{name}</h2>
      <span className={styles.sku}>Артикул: {id}</span>
      <p>Цена: <span className={styles.price}>{price}</span></p>
      <Amount {...props} />
    </article>;
}

export const Products = observer(({ shop }) => {  
    return <section className={styles.list}>
    {shop.isLoading ? <p>Товары загружаются</p> : shop.catalog.map(item => <ProductCard
      {...item}
      key={item.id}
      onAdd={() => shop.add(item.id)}
      onRemove={() => shop.remove(item.id)}
    />)}
  </section>
})