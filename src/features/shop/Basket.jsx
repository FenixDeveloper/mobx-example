import React, { useState } from 'react';
import { observer } from "mobx-react";
import { declOfNum } from '../../lib/utils';
import styles from './Shop.module.css';
import { Amount } from './Products';

const formatMessage = (amount, price) => {
    const goods = declOfNum(amount, ['товар', 'товара', 'товаров']);
    return `В корзине ${amount} ${goods} на сумму ${price}₽`;
}


export const BasketItem = observer(({ id, shop }) => {
    const { name, amount } = shop.products.get(id);
    return <div>
        <span>{name}</span>
        <Amount
            amount={amount}
            onAdd={() => shop.add(id)}
            onRemove={() => shop.remove(id)}
        />
    </div>
});

export const Basket = observer(({ shop }) => {
    const [opened, setOpened] = useState(false);

    return <div className={styles.basketContainer}>
        <button onClick={() => setOpened(!opened)}>
            {formatMessage(shop.orderItems.length, shop.total)}
        </button>
        {opened ? <div className={styles.basketContent}>
            { shop.orderItems.map(id => <BasketItem 
            key={id} 
            id={id} 
            shop={shop}
            />) }
        </div> : null}
    </div>
});