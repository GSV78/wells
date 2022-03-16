import React from 'react';
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

let cx = classNames.bind(styles);

const ObjectsItem: React.FC<ObjectType> = (props: ObjectType) => {
  const dispach: DispachObjectsType = useDispatch();
  const dispachObject: DispachToObjectType = useDispatch();
  const dispachLib: DispachType = useDispatch();
  const lib = useSelector((state: AppStateType) => state.lib);

  const onLoadObject = (id: number) => {
    dispachObject(loadObjectFromServerThunk(id));
    props.items.forEach((item) => {
      let libItem = lib.filter((el) => {
        return el.name === item.name;
      })[0];
      dispachObject(changePriceInObject(item.price, libItem.name));
      dispachLib(putNewPrice(libItem.id, libItem.name, item.price, libItem.unit, libItem.category));
    });
  };

  let [deletePopup, setDeletePopup] = React.useState(false);
  const onDeleteItem = () => setDeletePopup(true);

  type DeletePropsType = { id: number };

  const DeleteMessage: React.FC<DeletePropsType> = ({ id }) => {
    const onDeleteItemAccept = () => dispach(deleteObjectsItem(id));
    const onDeleteItemAbort = () => setDeletePopup(false);
    return (
      <div className={cx('popup', { unvisible: !deletePopup })}>
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

  // let [viewObject, setViewObject] = React.useState(false);

  // const MaterialsObjectResult = props.items.map((el: ObjectItemsType) => {
  //   return el.category === 'material' ? (
  //     <div key={el.name + el.id}>
  //       <span className={styles.resultName}>{el.name}</span>: {el.price} руб * {el.count} {el.unit}{' '}
  //       = {el.price * el.count} руб.
  //     </div>
  //   ) : null;
  // });

  // const WorksObjectResult = props.items.map((el: ObjectItemsType) => {
  //   return el.category === 'work' ? (
  //     <div key={el.name + el.id}>
  //       <span className={styles.resultName}>{el.name}</span>: {el.price} руб * {el.count} {el.unit}{' '}
  //       = {el.price * el.count} руб.
  //     </div>
  //   ) : null;
  // });

  // const Object: React.FC<ObjectType> = (props: ObjectType) => {
  //   return (
  //     <div className={cx('result', { unvisible: !viewObject })}>
  //       <h2>{props.name}</h2>
  //       <h3>
  //         <b>Материалы:</b>
  //       </h3>
  //       <div className={styles.materials}>{MaterialsObjectResult}</div>
  //       <h3>Итого по материалам: {props.priceMaterials} руб.</h3>
  //       <h3>
  //         <b>Работы:</b>
  //       </h3>
  //       <div className={styles.works}>{WorksObjectResult}</div>
  //       <h3>Итого по работам: {props.priceWorks} руб.</h3>
  //       <h2>
  //         Всего: <span className={styles.sum}>{props.totalSum} руб.</span>
  //       </h2>
  //     </div>
  //   );
  // };

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
      {/* <Object {...props} /> */}
    </>
  );
};

export default ObjectsItem;
