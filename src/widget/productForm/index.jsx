import React, { useState, useEffect } from 'react';
import PriceInput from '../PriceInput';

import CurrencyInput from 'react-currency-input';

import Row from '../../layout/row';
import Col from '../../layout/col';

import units from '../../consts/units';

import './style.css';

export default props => {
  const [name, setName] = useState('');
  const [batchQtd, setBatchQtd] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [productionInputs, setProductionInputs] = useState([]);
  const [batchPerMonth, setBatchPerMonth] = useState([]);
  const [price, setPrice] = useState([]);

  // form de novo ingrediente states
  const [showIngredientNewForm, setShowIngredientNewForm] = useState(false);
  const [newIngName, setNewIngName] = useState('');
  const [newIngUnity, setNewIngUnity] = useState('KG');
  const [newIngCost, setNewIngCost] = useState('');
  const [newIngQtd, setNewIngQtd] = useState('');

  useEffect(() => {
    if (props.item) {
      const { item } = props;

      setName(item.name);
      setBatchQtd(item.batchQtd);
      setIngredients(item.ingredients);
      setProductionInputs(item.productionInputs);
      setBatchPerMonth(item.batchPerMonth);
      setPrice(item.price);
    }
  }, []);

  const clearInputs = () => {
    setName('');
    setBatchQtd(0);
    setIngredients([]);
    setProductionInputs([]);
    setBatchPerMonth(0);
    setPrice(0);
  };

  const updateIngredientItem = (id, item) => {
    const ingredient = ingredients.find(x => x.id == id);
    ingredient.name = item.name;
    ingredient.qtd = item.qtd;
    ingredient.unity = item.unity;
    ingredient.cost = item.cost;
    setIngredients([...ingredients]);
  };

  const handleNewIngredient = () => {
    const newIngredient = {
      id: Date.now(),
      name: newIngName,
      unity: newIngUnity,
      cost: newIngCost,
      qtd: newIngQtd
    };

    setIngredients([...ingredients, newIngredient]);
    setNewIngCost(0);
    setNewIngName('');
    setNewIngQtd(0);
    setNewIngUnity('KG');
    setShowIngredientNewForm(false);
  };

  const handleSubmit = () => {
    const id = props.item == null ? null : props.item.id;
    const updatedItem = {
      id,
      name,
      batchQtd,
      ingredients,
      batchPerMonth,
      price
    };

    props.onUpdate(updatedItem);
    if (id == null) clearInputs();
    alert('atualizado');
  };

  return (
    <form
      action="/"
      method="post"
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Row>
        Produto:{' '}
        <input
          value={name}
          required="required"
          onChange={e => setName(e.target.value)}
          type="text"
        />
      </Row>
      <Row>
        Informe quantos pães você produzirá por fornada:{' '}
        <input
          required
          value={batchQtd}
          onChange={e => {
            setBatchQtd(parseInt(e.target.value || 0));
            e.target.value = parseInt(e.target.value || 0);
          }}
          min="1"
          type="number"
        />
      </Row>
      <Row>
        Crie sua lista de ingredientes para uma fornada de {batchQtd} pães do
        tipo {name}
      </Row>
      <Row>
        <Col>Ingrediente</Col>
        <Col>Unid. Medida</Col>
        <Col>Preço</Col>
        <Col>Quantidade</Col>
        <Col>Custo</Col>
        <Col>Excluir</Col>
      </Row>
      {ingredients.map(item => (
        <Row key={item.id}>
          <Col>
            <input
              required
              value={item.name}
              type="text"
              onChange={e => {
                updateIngredientItem(item.id, {
                  ...item,
                  name: e.target.value
                });
              }}
            />
          </Col>

          <Col>
            <select
              value={item.unity}
              onChange={e =>
                updateIngredientItem(item.id, {
                  ...item,
                  unity: e.target.value
                })
              }
            >
              {units.map(x => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </Col>

          <Col>
            <CurrencyInput
              value={item.cost}
              decimalSeparator=","
              thousandSeparator="."
              onChangeEvent={(event, maskedvalue, floatvalue) =>
                updateIngredientItem(item.id, {
                  ...item,
                  cost: floatvalue
                })
              }
            />
          </Col>

          <Col>
            <CurrencyInput
              value={item.qtd}
              decimalSeparator=","
              thousandSeparator="."
              precision={3}
              onChangeEvent={(event, maskedvalue, floatvalue) =>
                updateIngredientItem(item.id, {
                  ...item,
                  qtd: floatvalue
                })
              }
            />
          </Col>

          <Col>
            R${' '}
            {parseFloat(item.cost * item.qtd)
              .toFixed(2)
              .replace('.', ',')}
          </Col>

          <Col>
            <i
              className="fa fa-trash-o"
              onClick={() => {
                setIngredients(ingredients.filter(x => x.id !== item.id));
              }}
            ></i>
          </Col>
        </Row>
      ))}
      {showIngredientNewForm === true && (
        <Row>
          <Col>
            <input
              value={newIngName}
              required
              type="text"
              onChange={e => setNewIngName(e.target.value)}
            />
          </Col>

          <Col>
            <select
              required
              value={newIngUnity}
              onChange={e => setNewIngUnity(e.target.value)}
            >
              {units.map(x => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </Col>

          <Col>
            <CurrencyInput
              value={newIngCost}
              decimalSeparator=","
              thousandSeparator="."
              precision={2}
              onChangeEvent={(event, maskedvalue, floatvalue) =>
                setNewIngCost(floatvalue)
              }
            />
          </Col>

          <Col>
            <CurrencyInput
              value={newIngQtd}
              decimalSeparator=","
              thousandSeparator="."
              precision={2}
              onChangeEvent={(event, maskedvalue, floatvalue) =>
                setNewIngQtd(floatvalue)
              }
            />
          </Col>

          <Col>{newIngCost * newIngQtd}</Col>

          <Col>
            <button
              type="button"
              className="btn btn-primary small btn-small"
              onClick={handleNewIngredient}
            >
              Salvar
            </button>{' '}
          </Col>
        </Row>
      )}
      <Row>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowIngredientNewForm(true);
          }}
        >
          + Adicionar Ingrediente
        </button>
      </Row>

      <Row>
        informe quantas fornadas de {name} você fará por mês:
        <input
          type="number"
          required
          min="1"
          value={batchPerMonth}
          onChange={e => {
            setBatchPerMonth(parseInt(e.target.value || 0));
            e.target.value = parseInt(e.target.value || 0);
          }}
        />
      </Row>

      <Row>
        informe o preço de venda por unidade do pão {name}:
        <CurrencyInput
          value={price}
          decimalSeparator=","
          thousandSeparator="."
          precision={2}
          onChangeEvent={(event, maskedvalue, floatvalue) =>
            setPrice(floatvalue)
          }
        />
      </Row>

      <Row>
        <input type="submit" className="btn btn-primary" value="Salvar Dados" />
        <a
          href="#"
          className="btn btn-secundary"
          data-toggle="collapse"
          data-target={`#item-production-cost-${
            props.item ? props.item.id : 'new'
          }`}
        >
          fechar
        </a>
      </Row>
    </form>
  );
};
