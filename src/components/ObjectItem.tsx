import React, { useState } from 'react';
import { LibItemType } from '../redux/libReducer';
import { Tooltip, Typography } from 'antd';
import style from './Item.module.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToObject, DispachToObjectType, ObjectItemsType } from '../redux/objectReducer';
import { AppStateType } from '../redux/store';
import Price from './Price';

let cx = classNames.bind(style);
let initialCount: number;

const ObjectItem: React.FC<LibItemType> = (props: LibItemType) => {
  const items: Array<ObjectItemsType> = useSelector((state: AppStateType) => state.object.items);
  const libItem: LibItemType = useSelector((state: AppStateType) =>
    state.lib.filter((el) => el.name === props.name),
  )[0];
  const sameItem: Array<ObjectItemsType> = items && items.filter((el) => el.name === props.name);

  initialCount = sameItem.length ? sameItem[0].count : 0;

  const dispatch: DispachToObjectType = useDispatch();
  const [count, setCount] = useState(initialCount);

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
      <Typography.Text italic strong className={style.objectName}>
        {props && props.name}{' '}
      </Typography.Text>

      <Price {...libItem} />

      <Tooltip title="Количество">
        <input
          className={style.newPrice}
          type="number"
          onChange={onChangeCount}
          onBlur={onBlur}
          value={count}
        />
      </Tooltip>
      <Tooltip title="Стоимость">
        <Typography.Text className={style.price}>{props && props.price * count}</Typography.Text>
      </Tooltip>
    </div>
  );
};

export default ObjectItem;
