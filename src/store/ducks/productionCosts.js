export const Types = {
  STORE: 'todos/ADD_PRODUCTION_COST',
  DEL: 'todos/DEL_PRODUCTION_COST',
  CLONE: 'todos/CLONE_PRODUCTION_COST'
};

const INITIAL_STATE_PRODUCTION_COST = [
  {
    id: 1,
    name: 'Pão Frances',
    batchQtd: 45,
    ingredients: [
      { id: 1, name: 'Trigo', unity: 'KG', cost: 10.5, qtd: 4 },
      { id: 2, name: 'Leite', unity: 'L', cost: 10, qtd: 6.2 },
      { id: 3, name: 'Ovos', unity: 'UN', cost: 10.75, qtd: 2 },
      { id: 4, name: 'Gás', unity: 'KG', cost: 10, qtd: 6 },
      { id: 5, name: 'Energia Elétrica', unity: 'KWH', cost: 10, qtd: 2 }
    ],
    batchPerMonth: 30,
    price: 10
  },
  {
    id: 2,
    name: 'Pão de Milho',
    batchQtd: 45,
    ingredients: [
      { id: 1, name: 'Trigo', unity: 'KG', cost: 10, qtd: 4 },
      { id: 2, name: 'Leite', unity: 'LT', cost: 10, qtd: 6 },
      { id: 3, name: 'Ovos', unity: 'UN', cost: 10, qtd: 2 }
    ],
    productionInputs: [
      { id: 1, name: 'Gás', unity: 'KG', cost: 10, qtd: 6 },
      { id: 2, name: 'Energia Elétrica', unity: 'KWH', cost: 10, qtd: 2 }
    ],
    batchPerMonth: 30,
    price: 10
  }
];

export default function productionCosts(
  state = INITIAL_STATE_PRODUCTION_COST,
  action
) {
  console.log('state', state);

  switch (action.type) {
    case Types.STORE:
      {
        const productCost = state.find(x => x.id === action.payload.id);
        if (productCost) {
          // atualizando
          productCost.name = action.payload.name;
          productCost.batchPerMonth = action.payload.batchPerMonth;
          productCost.ingredients = action.payload.ingredients;
          productCost.batchQtd = action.payload.batchQtd;
          productCost.price = action.payload.price;
          return [...state];
        } else {
          // criando novo
          action.payload.id = Date.now();
          return [...state, action.payload];
        }
      }
      break;

    case Types.DEL:
      return [...state.filter(item => item.id !== action.payload.id)];
      break;

    case Types.CLONE:
      let clone = { ...state.find(item => item.id === action.payload.id) };
      clone.name += ' (copy)';
      clone.id = Date.now();
      return [clone, ...state];
      break;

    default:
      return state;
  }
}

export const Creators = {
  storeProductionCost: payload => ({
    type: Types.STORE,
    payload
  }),

  delProductionCost: id => ({
    type: Types.DEL,
    payload: { id }
  }),

  cloneProductionCost: id => ({
    type: Types.CLONE,
    payload: { id }
  })
};
