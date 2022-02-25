import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/libReducer';
import style from './AddMaterials.module.css';

export type ValuesType = {
  name: string;
  price: number;
  unit: string;
  category: 'material' | 'work';
};
type ErrorsType = {
  name?: string;
  price?: string;
  unit?: string;
};

const validate = (values: ValuesType) => {
  const errors: ErrorsType = {};

  if (!values.name) {
    errors.name = '!!!';
  }

  if (!values.price) {
    errors.price = '!!!';
  } else if (!/^\d/i.test(values.price.toString())) {
    errors.price = 'цифры';
  }

  if (!values.unit) {
    errors.unit = '!!!';
  }
  return errors;
};

const AddMaterials: React.FC<{}> = () => {
  const initialValues: ValuesType = { name: '', price: 100, unit: '', category: 'material' };
  const dispatch: any = useDispatch();
  return (
    <div className={style.form}>
      <h2>Добавление элемента</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, actions) => {
          dispatch(addItem(values));
          actions.setSubmitting(false);
        }}>
        {({ errors, touched }) => (
          <Form>
            <div className={style.radio}>
              <h3>Материал/работа:</h3>
              <div className={style.radioButtons}>
                <label>
                  <Field type="radio" name="category" value="material" />
                  Материал{' '}
                </label>
                <label>
                  <Field type="radio" name="category" value="work" />
                  Работа
                </label>
              </div>
            </div>
            <div className={style.formItem}>
              <label htmlFor="name">Название: </label>
              <Field name="name" type="text" />
              {touched.name && errors.name ? (
                <div className={style.error}>{errors.name}</div>
              ) : null}
            </div>
            <div className={style.formItem}>
              <label htmlFor="price">Цена: </label>
              <Field name="price" type="number" />
              {touched.price && errors.price ? (
                <div className={style.error}>{errors.price}</div>
              ) : null}
            </div>
            <div className={style.formItem}>
              <label htmlFor="unit">Единицы измерения: </label>
              <Field name="unit" type="text" />
              {touched.unit && errors.unit ? (
                <div className={style.error}>{errors.unit}</div>
              ) : null}
            </div>
            <button type="submit" className={style.submitButton}>
              Добавить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMaterials;
