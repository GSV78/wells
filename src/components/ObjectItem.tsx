import React, { useState } from 'react';
import { deleteItem, LibItemType, DispachType, putNewPrice } from '../redux/libReducer';
import { DollarOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import style from './Item.module.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToObject, DispachToObjectType } from '../redux/objectReducer';

let cx = classNames.bind(style);

const ObjectItem: React.FC<LibItemType> = (props: LibItemType) => {
  const dispatch: DispachToObjectType = useDispatch();
  const [count, setCount] = useState(+0);

  const onChangeCount = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setCount(+target.value);
  };
  const onBlur = (e: React.FormEvent<EventTarget>): void => {
    dispatch(
      addItemToObject({
        id: props.id,
        name: props.name,
        price: props.price,
        unit: props.unit,
        category: props.category,
        count: count as number,
      }),
    );
  };

  return (
    <div
      className={cx('items', {
        active: count,
      })}>
      <Typography.Text italic strong className={style.name}>
        {props && props.name}{' '}
      </Typography.Text>

      <Typography.Text className={style.price}>{props && props.price}</Typography.Text>
      <input
        className={style.newPrice}
        type="number"
        onChange={onChangeCount}
        onBlur={onBlur}
        value={count}
      />
      <Typography.Text className={style.price}>{props && props.price * count}</Typography.Text>
    </div>
  );
};

export default ObjectItem;
