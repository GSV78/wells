import React from 'react';
import { deleteItem, LibItemType, DispachType, putNewPrice } from '../redux/libReducer';
import { DollarOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import style from './Items.module.css';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

let cx = classNames.bind(style);

const Items: React.FC<LibItemType> = (props: LibItemType) => {
  const dispach: DispachType = useDispatch();
  let [deletePopup, setDeletePopup] = React.useState(false);

  const onDeleteItem = () => setDeletePopup(true);

  type DeletePropsType = { id: number };

  const DeleteMessage: React.FC<DeletePropsType> = ({ id }) => {
    const onDeleteItemAccept = () => dispach(deleteItem(id));

    const onDeleteItemAbort = () => setDeletePopup(false);
    return (
      <div className={cx('popup', { unvisible: !deletePopup })}>
        Удалить элемент, {props.name}?
        <Button
          onClick={onDeleteItemAbort}
          className={cx('buttonPopup')}
          size="small"
          type="primary">
          Отмена
        </Button>
        <Button onClick={onDeleteItemAccept} className={cx('buttonPopup')} size="small" danger>
          Удалить
        </Button>
      </div>
    );
  };

  const [changePriceMode, setChangePriceMode] = React.useState(false);
  const onChangeMode = () => setChangePriceMode(true);
  const [newPrice, setNewPrice] = React.useState(props.price);
  const onChangePrice = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setNewPrice(+target.value);
  };
  const onNewPrice = (
    id: number,
    name: string,
    newPrice: number,
    unit: string,
    category: 'material' | 'work',
  ) => {
    setChangePriceMode(false);
    debugger;
    dispach(putNewPrice(id, name, newPrice, unit, category));
  };
  return (
    <>
      <div className={style.items}>
        <Typography.Text italic strong className={style.name}>
          {props && props.name}{' '}
        </Typography.Text>
        {!changePriceMode ? (
          <>
            <Typography.Text className={style.price}>{props && props.price}</Typography.Text>
            <Button
              onClick={onChangeMode}
              className={style.button}
              type="primary"
              shape="circle"
              icon={<DollarOutlined />}
              size="small"
            />
          </>
        ) : (
          <>
            <input
              className={style.newPrice}
              type="number"
              autoFocus
              onChange={onChangePrice}
              value={newPrice}
            />
            <Button
              onClick={() => onNewPrice(props.id, props.name, newPrice, props.unit, props.category)}
              className={style.button}
              type="dashed"
              shape="circle"
              icon={<CheckCircleOutlined />}
              size="small"
            />
          </>
        )}

        <Typography.Text className={style.unit}> руб / {props && props.unit} </Typography.Text>

        <Button
          onClick={onDeleteItem}
          className={style.button}
          danger
          type="ghost"
          shape="circle"
          icon={<DeleteOutlined />}
          size="small"
        />
      </div>
      <DeleteMessage id={props.id} />
    </>
  );
};

export default Items;
