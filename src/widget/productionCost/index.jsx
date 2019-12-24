import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Creators as ProductionCostsActions } from '../../store/ducks/productionCosts';

import Row from '../../layout/row';
import Col from '../../layout/col';

import ProductForm from '../productForm';

import './style.css';

export default props => {
  const productionCosts = useSelector(state => state.productionCosts);
  const dispatch = useDispatch();

  const handleItemStore = updatedItem => {
    dispatch(ProductionCostsActions.storeProductionCost(updatedItem));
  };

  const handleDelete = id => {
    dispatch(ProductionCostsActions.delProductionCost(id));
  };

  const handleClone = id => {
    dispatch(ProductionCostsActions.cloneProductionCost(id));
  };

  return (
    <>
      <Row>
        <Col>Nome do Produto</Col>
        <Col className="col-2">Custo Total</Col>
        <Col className="col-3">
          <Row>
            <Col className="col center">Editar</Col>
            <Col className="col center">Clonar</Col>
            <Col className="col center">Excluir</Col>
          </Row>
        </Col>
      </Row>

      {productionCosts.map(item => (
        <>
          <Row key={item.id}>
            <Col className="col">{item.name}</Col>
            <Col className="col-2">
              R${' '}
              {item.ingredients
                .reduce(
                  (acumulado, item) => acumulado + item.cost * item.qtd,
                  0
                )
                .toFixed(2)
                .replace('.', ',')}
            </Col>
            <Col className="col-3">
              <Row>
                <Col className="col center">
                  <i
                    className="fa fa-pencil-square-o"
                    data-toggle="collapse"
                    data-target={`#item-production-cost-${item.id}`}
                  ></i>
                </Col>
                <Col className="col center">
                  <i
                    className="fa fa-clone"
                    onClick={() => {
                      handleClone(item.id);
                    }}
                  ></i>
                </Col>
                <Col className="col center">
                  <i
                    className="fa fa-trash-o"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  ></i>
                </Col>
              </Row>
            </Col>
          </Row>
          <div class="collapse" id={`item-production-cost-${item.id}`}>
            <div class="card card-body">
              <ProductForm item={item} onUpdate={handleItemStore} />
            </div>
          </div>
        </>
      ))}

      <Row>
        <button
          className="btn btn-primary"
          data-toggle="collapse"
          data-target={`#item-production-cost-new`}
        >
          Adicionar Produto
        </button>
      </Row>
      <div class="collapse" id={`item-production-cost-new`}>
        <div class="card card-body">
          <ProductForm onUpdate={handleItemStore} />
        </div>
      </div>
    </>
  );
};
