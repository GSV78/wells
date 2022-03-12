import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispachObjectsType, getObjects } from '../redux/objectsReducer';
import { AppStateType } from '../redux/store';
import ObjectsItem from '../components/ObjectsItem';

function Open() {
  const dispatch: DispachObjectsType = useDispatch();
  useEffect(() => {
    dispatch(getObjects());
  }, []);
  const objects = useSelector((state: AppStateType) => state.objects);

  const Objects =
    objects &&
    objects.map((el) => {
      return <ObjectsItem key={el.name + el.id} {...el} />;
    });

  return (
    <div>
      <h2>Архив объектов:</h2>
      <div>{Objects}</div>
    </div>
  );
}

export default Open;
