import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as FixedCostActions } from '../../store/ducks/fixedCosts';

import CurrencyInput from 'react-currency-input';

import Row from '../../layout/row';
import Col from '../../layout/col';

import './style.css';

export default props => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState(0);

  const fixedCosts = useSelector(state => state.fixedCosts);
  const dispatch = useDispatch();

  const handleNewItem = () => {
    if (!newName || newName == '') {
      alert('Insira uma descrição para o item.');
      return;
    }

    const newFixedCost = {
      id: Date.now(),
      description: newName,
      cost: parseFloat(newCost)
    };
    dispatch(FixedCostActions.addFixedCost(newFixedCost));
  };

  const handleDelete = id => {
    dispatch(FixedCostActions.delFixedCost(id));
  };

  return (
    <>
      <Row>Crie sua lista de custos fixos</Row>
      <Row>
        <Col>Item</Col>
        <Col>Valor</Col>
        <Col>Excluir</Col>
      </Row>
      {fixedCosts.map(item => (
        <Row key={item.id}>
          <Col>{item.description}</Col>
          <Col>R$ {item.cost.toFixed(2).replace('.', ',')}</Col>
          <Col>
            {' '}
            <i
              onClick={() => {
                handleDelete(item.id);
              }}
              className="fa fa-trash-o"
            ></i>
          </Col>
        </Row>
      ))}
      <Row>
        {showAddForm == true && (
          <>
            <Col>
              Nome:{' '}
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                type="text"
              />
            </Col>
            <Col>
              Valor:{' '}
              <CurrencyInput
                value={newCost}
                decimalSeparator=","
                thousandSeparator="."
                precision={2}
                onChangeEvent={(event, maskedvalue, floatvalue) =>
                  setNewCost(floatvalue)
                }
              />
            </Col>
            <Col>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNewItem}
              >
                Salvar
              </button>
            </Col>
          </>
        )}
      </Row>
      <Row>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowAddForm(true);
          }}
        >
          + Adicionar Item
        </button>
        Total de custos fixos: R${' '}
        {parseFloat(
          fixedCosts.reduce((sum, item) => sum + item.cost, 0)
        ).toFixed(2)}
      </Row>
    </>
  );
};
