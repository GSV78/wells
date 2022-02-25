import React from 'react';
import { LibItemType } from '../redux/libReducer';
import { DollarOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tooltip, Button, Typography } from 'antd';
import style from './Items.module.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(style);

const Items: React.FC<LibItemType> = (props: LibItemType) => {
  let [deletePopup, setDeletePopup] = React.useState(false);

  const onDeleteItem = () => setDeletePopup(!deletePopup);

  const DeleteMessage: React.FC<{}> = () => {
    return <div className={cx({ unvisible: !deletePopup })}>А ты уверен???</div>;
  };

  let [changePriceMode, setChangePriceMode] = React.useState(false);
  return (
    <>
      <div className={style.items}>
        <Typography.Text italic strong className={style.name}>
          {props && props.name}{' '}
        </Typography.Text>
        <Typography.Text className={style.price}>{props && props.price}</Typography.Text>

        <Tooltip title="изменить цену">
          <Button
            className={style.button}
            type="primary"
            shape="circle"
            icon={<DollarOutlined />}
            size="small"
          />
        </Tooltip>

        <Typography.Text className={style.unit}> руб / {props && props.unit} </Typography.Text>

        <Tooltip title="удалить">
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
      <DeleteMessage />
    </>
  );
};

export default Items;
