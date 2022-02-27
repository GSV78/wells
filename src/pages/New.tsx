import React from 'react';
import { useSelector } from 'react-redux';
import { LibItemType } from '../redux/libReducer';
import { AppStateType } from '../redux/store';

function New() {
  // let lib = useSelector((state: AppStateType) => state.lib);
  // const materials = lib && lib.filter((el: LibItemType) => el.category === 'material');
  // const works = lib && lib.filter((el: LibItemType) => el.category === 'work');

  // const MaterialsDiv =
  //   materials &&
  //   materials.map((el: LibItemType) => {
  //     return <ObjectItem key={el.name + el.id} {...el} />;
  //   });

  // const WorksDiv =
  //   works &&
  //   works.map((el: LibItemType) => {
  //     return <ObjectItem key={el.name + el.id} {...el} />;
  //   });
  return <div></div>;
}

export default New;
