import React, { useState, useEffect } from 'react';

import Row from '../../layout/row';
import Col from '../../layout/col';

import './style.css';

export default props => {
  const [name, setName] = useState('');
  const [bacthQtd, setBatchQtd] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [productionInputs, setProductionInputs] = useState([]);
  const [batchPerMonth, setBatchPerMonth] = useState([]);
  const [price, setPrice] = useState([]);

  useEffect(() => {
    if (props.item) {
      const { item } = props;

      setName(item.name);
      setBatchQtd(item.bacthQtd);
      setIngredients(item.ingredients);
      setProductionInputs(item.productionInputs);
      setBatchPerMonth(item.batchPerMonth);
      setPrice(item.price);
    }
  }, []);

  const constUpdateIngredientItem = (id, item) => {
    const ingredient = ingredients.find(x => x.id == id);
    ingredient.name = item.name;
    ingredient.qtd = item.qtd;
    ingredient.unity = item.unity;
    ingredient.cost = item.cost;
    setIngredients([...ingredients]);
  };

  return (
    <>
      <Row>
        Produto:{' '}
        <input
          value={name}
          onChanche={e => setName(e.target.value)}
          type="text"
        />
      </Row>
      <Row>
        Informe quantos pães você produzirá por fornada:{' '}
        <input
          value={bacthQtd}
          onChanche={e => setBatchQtd(e.target.value)}
          type="text"
        />
      </Row>
      <Row>
        Crie sua lista de ingredientes para uma fornada de {bacthQtd} pães do
        tipo {name}
      </Row>
      <Row>
        <Col>Ingrediente</Col>
        <Col>Unid. Medida</Col>
        <Col>Preço</Col>
        <Col>Preço</Col>
        <Col>Quantidade</Col>
        <Col>Custo</Col>
        <Col>Excluir</Col>
      </Row>
      {ingredients.map(item => (
        <Row key={item.id}>
          <Col>
            <input
              value={item.name}
              type="text"
              onChange={e => {
                constUpdateIngredientItem(item.id, {
                  ...item,
                  name: e.target.value
                });
              }}
            />
          </Col>
        </Row>
      ))}
      #{props.item.id} - {props.item.name}
    </>
  );
};
