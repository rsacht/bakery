import { combineReducers } from 'redux';

import fixedCosts from './fixedCosts';
import productionCosts from './productionCosts';

export default combineReducers({ fixedCosts, productionCosts });
