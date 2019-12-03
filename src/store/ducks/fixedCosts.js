export const Types = {
  ADD: 'todos/ADD_FIXED_COST',
  DEL: 'todos/DEL_FIXED_COST'
};

const INITIAL_STATE_FIXED_COST = [
  { id: 1, description: 'Aluguel', cost: 1500 },
  { id: 2, description: 'Salários', cost: 1000 },
  { id: 3, description: 'Encargos Sociais', cost: 400 }
];

export default function fixedCosts(state = INITIAL_STATE_FIXED_COST, action) {
  console.log('state', state);

  switch (action.type) {
    case Types.ADD:
      return [...state, action.payload];
    case Types.DEL:
      return [...state.filter(item => item.id !== action.payload.id)];
    default:
      return state;
  }
}

export const Creators = {
  addFixedCost: payload => ({
    type: Types.ADD,
    payload
  }),

  delFixedCost: id => ({
    type: Types.DEL,
    payload: { id }
  })
};
