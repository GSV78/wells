import React from 'react';
import { LibItemType } from '../redux/libReducer';
import { useSelector } from 'react-redux';
import { AppStateType } from '../redux/store';
import AddMaterials from '../components/AddMaterials';
import Item from '../components/Item';
import classNames from 'classnames';
import styles from './Lib.module.css';

let cx = classNames.bind(styles);

const Lib: React.FC = () => {
  let lib = useSelector((state: AppStateType) => state.lib);

  const materials = lib && lib.filter((el: LibItemType) => el.category === 'material');
  const works = lib && lib.filter((el: LibItemType) => el.category === 'work');

  const MaterialsDiv =
    materials &&
    materials.map((el: LibItemType) => {
      return <Item key={el.name + el.id} {...el} />;
    });

  const WorksDiv =
    works &&
    works.map((el: LibItemType) => {
      return <Item key={el.name + el.id} {...el} />;
    });

  return (
    <div>
      <h2>Материалы</h2>
      <div>{MaterialsDiv}</div>
      <h2>Работы</h2>
      <div>{WorksDiv}</div>
      <AddMaterials />
    </div>
  );
};

export default Lib;
