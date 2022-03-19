import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import styles from './Item.module.css';
import classNames from 'classnames/bind';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePriceInObject,
  DispachToObjectType,
  loadObjectFromServerThunk,
  ObjectItemsType,
  ObjectType,
} from '../redux/objectReducer';
import { deleteObjectsItem, DispachObjectsType } from '../redux/objectsReducer';
import { DispachType, putNewPrice } from '../redux/libReducer';
import { AppStateType } from '../redux/store';
import { useNavigate } from 'react-router-dom';

let cx = classNames.bind(styles);

const ObjectsItem: React.FC<ObjectType> = (props: ObjectType) => {
  const dispach: DispachObjectsType = useDispatch();
  const dispachObject: DispachToObjectType = useDispatch();
  const dispachLib: DispachType = useDispatch();
  const lib = useSelector((state: AppStateType) => state.lib);
  const navigate = useNavigate();

  const onLoadObject = (id: number) => {
    // onSuccessLoad();
    debugger;
    dispachObject(loadObjectFromServerThunk(id));
    props.items.forEach((item) => {
      let libItem = lib.filter((el) => {
        return el.name === item.name;
      })[0];
      dispachObject(changePriceInObject(item.price, libItem.name));
      dispachLib(putNewPrice(libItem.id, libItem.name, item.price, libItem.unit, libItem.category));
    });
    (() => navigate('/new/'))();
  };

  let [deletePopup, setDeletePopup] = useState(false);
  const onDeleteItem = () => setDeletePopup(true);
  // let [successLoad, setSuccessLoad] = useState(false);
  // const onSuccessLoad = () => setSuccessLoad(true);

  type DeletePropsType = { id: number };

  const DeleteMessage: React.FC<DeletePropsType> = ({ id }) => {
    const onDeleteItemAccept = () => dispach(deleteObjectsItem(id));
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
      <div className={styles.items}>
        <Typography.Text onClick={() => onLoadObject(props.id)} className={styles.objectsName}>
          {props && props.name}{' '}
        </Typography.Text>
        <Button
          onClick={onDeleteItem}
          className={styles.button}
          danger
          type="ghost"
          shape="circle"
          icon={<DeleteOutlined />}
          size="small"
        />
      </div>
      <DeleteMessage id={props.id} />
      {/* <div className={cx('successLoad', { invisible: !successLoad })}>загружен</div> */}
    </>
  );
};

export default ObjectsItem;
