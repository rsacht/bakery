import React from 'react';

import { useSelector } from 'react-redux';

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
    (sum, item) => sum + item.batchPerMonth * item.batchQtd * item.price,
    0
  );

  // luco
  const balanceResult = incomes - bothTotalCosts;

  const totalProducedItems = productionCosts.reduce(
    (sum, item) => sum + item.batchPerMonth * item.batchQtd,
    0
  );

  const ratedCost = fixedCostsTotal / totalProducedItems;

  return (
    <>
      <center>
        <h2>Relatório</h2>
      </center>
      <table>
        <tr>
          <td>Total de Pães Produzidos</td>
          <td>{totalProducedItems}</td>
        </tr>

        <tr>
          <td>Custo Fixo Rateado por Unidade</td>
          <td>
            {'R$ ' +
              (fixedCostsTotal / totalProducedItems)
                .toFixed(2)
                .replace('.', ',')}
          </td>
        </tr>

        <tr>
          <td>Custo Fixo mensal</td>
          <td>{'R$ ' + fixedCostsTotal.toFixed(2).replace('.', ',')}</td>
        </tr>

        <tr>
          <td>Custo de Produção</td>
          <td>{'R$ ' + productionCostsTotal.toFixed(2).replace('.', ',')}</td>
        </tr>

        <tr>
          <td>Custo total</td>
          <td>{'R$ ' + bothTotalCosts.toFixed(2).replace('.', ',')}</td>
        </tr>

        <tr>
          <td>Faturamento</td>
          <td>{'R$ ' + incomes.toFixed(2).replace('.', ',')}</td>
        </tr>

        <tr>
          <td>
            <b>Lucro / Prejuizo</b>
          </td>
          <td>{'R$ ' + balanceResult.toFixed(2).replace('.', ',')}</td>
        </tr>
      </table>

      <hr />

      {productionCosts.map(item => (
        <>
          <center>
            <h2>{item.name}</h2>
          </center>
          <table>
            <p>
              Você produzirá {item.batchPerMonth * item.batchQtd} de {item.name}{' '}
              por mês.
              <br />O custo unitário de produção de {item.name} é de R${' '}
              {(
                item.ingredients.reduce(
                  (sumIngredients, ingredient) =>
                    sumIngredients + ingredient.cost * ingredient.qtd,
                  0
                ) / item.batchQtd
              )
                .toFixed(2)
                .replace('.', ',')}
              . <br />O valor do custo fixo (R${' '}
              {fixedCostsTotal.toFixed(2).replace('.', ',')}) rateado pela
              quantidade de pães ({totalProducedItems}) que você produzirá por
              mês é R$ {ratedCost.toFixed(2).replace('.', ',')}.<br />
              Acrescentando o custo fixo rateado ao custo de produção o custo
              total do {item.name} é R${' '}
              {(
                ratedCost +
                item.ingredients.reduce(
                  (sumIngredients, ingredient) =>
                    sumIngredients + ingredient.cost * ingredient.qtd,
                  0
                ) /
                  item.batchQtd
              )
                .toFixed(2)
                .replace('.', ',')}
              <br />
              Com o valor de venda de R${' '}
              {item.price.toFixed(2).replace('.', ',')} por unidade, você terá
              um lucro de R${' '}
              {(
                item.price -
                (ratedCost +
                  item.ingredients.reduce(
                    (sumIngredients, ingredient) =>
                      sumIngredients + ingredient.cost * ingredient.qtd,
                    0
                  ) /
                    item.batchQtd)
              )
                .toFixed(2)
                .replace('.', ',')}{' '}
              por unidade e um lucro de R${' '}
              {(
                parseFloat(item.batchPerMonth) *
                parseFloat(item.batchQtd) *
                (item.price -
                  (ratedCost +
                    item.ingredients.reduce(
                      (sumIngredients, ingredient) =>
                        parseFloat(sumIngredients) +
                        parseFloat(ingredient.cost) *
                          parseFloat(ingredient.qtd),
                      0.0
                    ) /
                      parseFloat(item.batchQtd)))
              )
                .toFixed(2)
                .replace('.', ',')}{' '}
              com a venda de {item.batchPerMonth * item.batchQtd} unidades de
              pão frances por mês.
            </p>
          </table>
        </>
      ))}
    </>
  );
};
