import React from 'react';
import { useSelector } from 'react-redux';
import { ObjectItemsType, ObjectType } from '../redux/objectReducer';
import { AppStateType } from '../redux/store';
import style from './Result.module.css';

function Result() {
  const object: ObjectType = useSelector((state: AppStateType) => state.object);
  const materialsOnObject =
    object.items && object.items.filter((el: ObjectItemsType) => el.category === 'material');
  const worksOnObject =
    object.items && object.items.filter((el: ObjectItemsType) => el.category === 'work');
  const MaterialsObjectResult =
    materialsOnObject &&
    materialsOnObject.map((el: ObjectItemsType) => {
      return (
        <div key={el.name + el.id}>
          <span>
            <b>{el.name}</b>
          </span>
          : {el.price} руб * {el.count} {el.unit} = {el.price * el.count} руб.
        </div>
      );
    });

  const WorksObjectResult =
    worksOnObject &&
    worksOnObject.map((el: ObjectItemsType) => {
      return (
        <div key={el.name + el.id}>
          <span>
            <b>{el.name}</b>
          </span>
          : {el.price} руб * {el.count} {el.unit} = {el.price * el.count} руб.
        </div>
      );
    });
  return (
    <div className={style.resultBox}>
      <h2>Имя объекта: {object.name}</h2>
      <h2>Материалы:</h2>
      <div className={style.materials}>{MaterialsObjectResult}</div>
      <h3>Итого по материалам: {object.priceMaterials} руб.</h3>
      <h2>Работы:</h2>
      <div className={style.works}>{WorksObjectResult}</div>
      <h3>Итого по работам: {object.priceWorks} руб.</h3>
      <h2>
        Всего: <span className={style.sum}>{object.totalSum} руб.</span>
      </h2>
    </div>
  );
}

export default Result;
