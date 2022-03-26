import React from 'react';
import { useDispatch } from 'react-redux';
import { DispachType, LibItemType, putNewPrice } from '../redux/libReducer';
import { DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import style from './Item.module.css';
import { changePriceInObject, DispachToObjectType } from '../redux/objectReducer';

const Price: React.FC<LibItemType> = (props: LibItemType) => {
  const dispach: DispachType = useDispatch();
  const dispachObject: DispachToObjectType = useDispatch();
  const [changePriceMode, setChangePriceMode] = React.useState(false);
  const onChangeMode = () => setChangePriceMode(true);
  const [newPrice, setNewPrice] = React.useState(props.price);
  const onChangePrice = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setNewPrice(+target.value);
  };
  const onNewPrice = (
    id: number,
    name: string,
    newPrice: number,
    unit: string,
    category: 'material' | 'work',
  ) => {
    setChangePriceMode(false);
    dispach(putNewPrice(id, name, newPrice, unit, category));
    dispachObject(changePriceInObject(newPrice, name));
  };
  return (
    <div>
      {!changePriceMode ? (
        <>
          <Tooltip title="Изменить цену">
            <Button
              onClick={onChangeMode}
              className={style.button}
              type="primary"
              shape="circle"
              icon={<DollarOutlined style={{ fontSize: '22px' }} />}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Цена">
            <Typography.Text className={style.price}>{props && props.price}</Typography.Text>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Утвердить новую цену">
            <Button
              onClick={() => onNewPrice(props.id, props.name, newPrice, props.unit, props.category)}
              className={style.button}
              type="dashed"
              shape="circle"
              icon={<CheckCircleOutlined style={{ fontSize: '23px', color: 'green' }} />}
              size="small"
            />
          </Tooltip>
          <input
            className={style.newPrice}
            type="number"
            autoFocus
            onChange={onChangePrice}
            value={newPrice}
          />
        </>
      )}
    </div>
  );
};

export default Price;
