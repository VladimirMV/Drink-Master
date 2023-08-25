// Libs
import { yupResolver } from '@hookform/resolvers/yup';
// Other
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

export const formSettings = {
  defaultValues: {
    ...initialValues,
  },
  mode: 'onTouched',
  resolver: yupResolver(validationSchema),
};
