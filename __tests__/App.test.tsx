/**
 * @format
 */

import 'react-native';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';
import { ProductAPI } from '../src/api/productAPi';

it('Should have products list', async () => {
  const res = await ProductAPI.getAll(20, 0);
  expect(res.length).toBeGreaterThanOrEqual(1)
});