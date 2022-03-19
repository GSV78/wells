import { Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import ObjectItem from '../components/ObjectItem';
import Result from '../components/Result';
import { LibItemType } from '../redux/libReducer';
import {
  DispachToObjectType,
  ObjectType,
  ObjectItemsType,
  saveObjectName,
  saveObjectToServerThunk
} from '../redux/objectReducer';
import { AppStateType } from '../redux/store';
// import styles from './New.module.css';

function New() {
  const dispatch: DispachToObjectType = useDispatch();
  const lib = useSelector((state: AppStateType) => state.lib);
  const materials = lib && lib.filter((el: LibItemType) => el.category === 'material');
  const works = lib && lib.filter((el: LibItemType) => el.category === 'work');
  const object: ObjectType = useSelector((state: AppStateType) => state.object);

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

  const [objectName, setObjectName] = useState(object.name);
  const onChangeName = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setObjectName(target.value);
  };

  const onSaveObject = () => {
    dispatch(saveObjectName(objectName));
    dispatch(saveObjectToServerThunk({ ...object, name: objectName }));
  };

  return (
    <div>
      <div>
        <h2>{object.name}:</h2>
        <h2>Материалы:</h2>
        <div>{MaterialsObject}</div>
        <h3>Итого по материалам: {object.priceMaterials} рублей</h3>
        <h2>Работы:</h2>
        <div>{WorksObject}</div>
        <h3>Итого по работам: {object.priceWorks} рублей</h3>
        <h2>Всего: {object.totalSum} рублей</h2>
        <h2>Имя объекта</h2>
        <input type="text" onChange={onChangeName} value={objectName} />
        <Button type="primary" onClick={onSaveObject}>
          Сохранить
        </Button>
      </div>
      <Result />
    </div>
  );
}

export default New;
