import { Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ObjectItem from '../components/ObjectItem';
import { LibItemType } from '../redux/libReducer';
import { DispachToObjectType, ObjectItemsType, saveObject } from '../redux/objectReducer';
import { AppStateType } from '../redux/store';
import styles from './New.module.css';

function New() {
  const dispatch: DispachToObjectType = useDispatch();
  const lib = useSelector((state: AppStateType) => state.lib);
  const materials = lib && lib.filter((el: LibItemType) => el.category === 'material');
  const works = lib && lib.filter((el: LibItemType) => el.category === 'work');
  const object = useSelector((state: AppStateType) => state.object);
  const materialsOnObject =
    object.items && object.items.filter((el: ObjectItemsType) => el.category === 'material');
  const worksOnObject =
    object.items && object.items.filter((el: ObjectItemsType) => el.category === 'work');

  const MaterialsObject =
    materials &&
    materials.map((el: LibItemType) => {
      return <ObjectItem key={el.name + el.id} {...el} />;
    });

  const WorksObject =
    works &&
    works.map((el: LibItemType) => {
      return <ObjectItem key={el.name + el.id} {...el} />;
    });

  const [objectName, setObjectName] = useState('');
  const onChangeName = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setObjectName(target.value);
  };

  const MaterialsObjectResult =
    materialsOnObject &&
    materialsOnObject.map((el: ObjectItemsType) => {
      return (
        <div key={el.name + el.id}>
          <span className={styles.resultName}>{el.name}</span>: {el.price} руб * {el.count}{' '}
          {el.unit} = {el.price * el.count} руб.
        </div>
      );
    });

  const WorksObjectResult =
    worksOnObject &&
    worksOnObject.map((el: ObjectItemsType) => {
      return (
        <div key={el.name + el.id}>
          <span className={styles.resultName}>{el.name}</span>: {el.price} руб * {el.count}{' '}
          {el.unit} = {el.price * el.count} руб.
        </div>
      );
    });

  const onSave = () => {
    dispatch(saveObject(objectName));
  };

  return (
    <div>
      <div>
        <h2>Материалы</h2>
        <div>{MaterialsObject}</div>
        <h3>Итого по материалам: {object.priceMaterials} рублей</h3>
        <h2>Работы</h2>
        <div>{WorksObject}</div>
        <h3>Итого по работам: {object.priceWorks} рублей</h3>
        <h2>Итого: {object.totalSum} рублей</h2>
        <h2>Имя объекта</h2>
        <input type="text" onChange={onChangeName} value={objectName} />
        <Button type="primary" onClick={onSave}>
          Сохранить
        </Button>
      </div>
      <div className={styles.result}>
        <h2>Имя объекта: {object.name}</h2>
        <h2>Материалы</h2>
        <div className={styles.materials}>{MaterialsObjectResult}</div>
        <h3>Итого по материалам: {object.priceMaterials} руб.</h3>
        <h2>Работы</h2>
        <div className={styles.works}>{WorksObjectResult}</div>
        <h3>Итого по работам: {object.priceWorks} руб.</h3>
        <h2>
          Итого по объекту: <span className={styles.sum}>{object.totalSum} руб.</span>
        </h2>
      </div>
    </div>
  );
}

export default New;
