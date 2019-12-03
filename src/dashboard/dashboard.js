import React, { Component } from 'react';

import { useSelector } from 'react-redux';

import ContentHeader from '../template/contentHeader';
import Content from '../template/content';
import ValueBox from '../widget/valueBox';
import Row from '../layout/row';

export default props => {
  const { productionCosts, fixedCosts } = useSelector(state => state);

  // costs
  const fixedCostsTotal = fixedCosts.reduce((sum, item) => sum + item.cost, 0);
  const productionCostsTotal = productionCosts.reduce(
    (sum, item) =>
      sum +
      item.batchPerMonth *
        item.ingredients.reduce(
          (sumIngredients, ingredient) =>
            sumIngredients + ingredient.cost * ingredient.qtd,
          0
        ),
    0
  );
  const bothTotalCosts = fixedCostsTotal + productionCostsTotal;

  // faturamento
  const incomes = productionCosts.reduce(
    (sum, item) => sum + item.batchPerMonth * item.bacthQtd * item.price,
    0
  );

  // luco
  const balanceResult = incomes - bothTotalCosts;

  return (
    <div className="container fluid mw-75 bg-light shadow-sm">
      <ContentHeader title=" " small="" />
      <Content>
        <Row>
          <ValueBox
            cols="12 4"
            color="danger"
            value={`R$ ${bothTotalCosts.toFixed(2).replace('.', ',')}`}
            text="Custos"
          />
          <ValueBox
            cols="12 4"
            color="success"
            value={`R$ ${incomes.toFixed(2).replace('.', ',')}`}
            text="Faturamento"
          />
          <ValueBox
            cols="12 4"
            color="primary"
            value={`R$ ${balanceResult.toFixed(2).replace('.', ',')}`}
            text="Lucro"
          />
        </Row>
      </Content>
    </div>
  );
};
