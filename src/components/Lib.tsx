import React from 'react';
import { DollarOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tooltip, Button, Typography } from 'antd';
import { LibItemType } from '../redux/libReducer';
import { useSelector } from 'react-redux';
import { StateType } from '../redux/store';
import AddMaterials from './AddMaterials';
import style from './Lib.module.css';

const Lib = () => {
  let lib = useSelector((state: StateType) => state.lib);
  const materials = lib && lib.filter((el: LibItemType) => el.category === 'material');
  const works = lib && lib.filter((el: LibItemType) => el.category === 'work');
  const MaterialsDiv =
    materials &&
    materials.map((el: LibItemType) => {
      return (
        <div key={el.id} className={style.items}>
          <Typography.Text className={style.name} italic strong>
            {el && el.name}
          </Typography.Text>
          <Typography.Text className={style.price}>{el && el.price}</Typography.Text>

          <Tooltip title="изменить цену">
            <Button
              className={style.button}
              type="primary"
              shape="circle"
              icon={<DollarOutlined />}
              size="small"
            />
          </Tooltip>

          <Typography.Text className={style.unit}>руб / {el && el.unit} </Typography.Text>

          <Tooltip title="удалить">
            <Button
              className={style.button}
              danger
              type="ghost"
              shape="circle"
              icon={<DeleteOutlined />}
              size="small"
            />
          </Tooltip>
        </div>
      );
    });

  const WorksDiv =
    works &&
    works.map((el: LibItemType) => {
      return (
        <div key={el && el.id} className={style.items}>
          <Typography.Text italic strong className={style.name}>
            {el && el.name}{' '}
          </Typography.Text>
          <Typography.Text className={style.price}>{el && el.price}</Typography.Text>

          <Tooltip title="изменить цену">
            <Button
              className={style.button}
              type="primary"
              shape="circle"
              icon={<DollarOutlined />}
              size="small"
            />
          </Tooltip>

          <Typography.Text className={style.unit}> руб / {el && el.unit} </Typography.Text>

          <Tooltip title="удалить">
            <Button
              // onClick={onDeleteItem}
              className={style.button}
              danger
              type="ghost"
              shape="circle"
              icon={<DeleteOutlined />}
              size="small"
            />
          </Tooltip>
        </div>
      );
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
