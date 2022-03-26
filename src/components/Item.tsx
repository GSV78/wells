import React from 'react';
import { deleteItem, LibItemType, DispachType, putNewPrice } from '../redux/libReducer';
import { DollarOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import style from './Item.module.css';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import Price from './Price';

let cx = classNames.bind(style);

const Item: React.FC<LibItemType> = (props: LibItemType) => {
  const dispach: DispachType = useDispatch();
  let [deletePopup, setDeletePopup] = React.useState(false);

  const onDeleteItem = () => setDeletePopup(true);

  type DeletePropsType = { id: number };

  const DeleteMessage: React.FC<DeletePropsType> = ({ id }) => {
    const onDeleteItemAccept = () => dispach(deleteItem(id));
    const onDeleteItemAbort = () => setDeletePopup(false);

    return (
      <div className={cx('popup', { invisible: !deletePopup })}>
        <div>Удалить элемент, {props.name}?</div>
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

  return (
    <>
      <div className={style.items}>
        <Typography.Text italic strong className={style.name}>
          {props && props.name}{' '}
        </Typography.Text>
        <Price {...props} />

        <Typography.Text className={style.unit}> руб / {props && props.unit} </Typography.Text>

        <Tooltip title="Удалить">
          <Button
            onClick={onDeleteItem}
            className={style.button}
            danger
            type="ghost"
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
          />
        </Tooltip>
      </div>
      <DeleteMessage id={props.id} />
    </>
  );
};

export default Item;
