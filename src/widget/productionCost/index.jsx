import React, { useState } from "react";

import Row from "../../layout/row";
import Col from "../../layout/col";

import ProductForm from "../productForm";

import "./style.css";

export default props => {
  const [productionCosts, setProductionCosts] = useState([
    {
      id: 1,
      name: "Pão Frances",
      batchQtd: 45,
      ingredients: [
        { id: 1, name: "Trigo", unity: "KG", cost: 10.5, qtd: 4 },
        { id: 2, name: "Leite", unity: "L", cost: 10, qtd: 6.2 },
        { id: 3, name: "Ovos", unity: "UN", cost: 10.75, qtd: 2 },
        { id: 4, name: "Gás", unity: "KG", cost: 10, qtd: 6 },
        { id: 5, name: "Energia Elétrica", unity: "KWH", cost: 10, qtd: 2 }
      ],
      batchPerMonth: 30,
      price: 10
    },
    {
      id: 2,
      name: "Pão de Milho",
      batchQtd: 45,
      ingredients: [
        { id: 1, name: "Trigo", unity: "KG", cost: 10, qtd: 4 },
        { id: 2, name: "Leite", unity: "LT", cost: 10, qtd: 6 },
        { id: 3, name: "Ovos", unity: "UN", cost: 10, qtd: 2 }
      ],
      productionInputs: [
        { id: 1, name: "Gás", unity: "KG", cost: 10, qtd: 6 },
        { id: 2, name: "Energia Elétrica", unity: "KWH", cost: 10, qtd: 2 }
      ],
      batchPerMonth: 30,
      price: 10
    }
  ]);

  const handleNewItem = () => {};

  const handleItemStore = updatedItem => {
    const productCost = productionCosts.find(x => x.id === updatedItem.id);
    productCost.name = updatedItem.name;
    productCost.batchPerMonth = updatedItem.batchPerMonth;
    productCost.ingredients = updatedItem.ingredients;
    productCost.batchQtd = updatedItem.batchQtd;
    productCost.price = updatedItem.price;
    setProductionCosts([...productionCosts]);
  };

  const handleDelete = id => {
    setProductionCosts(productionCosts.filter(item => item.id != id));
  };
  const handleClone = id => {
    let clone = { ...productionCosts.find(item => item.id == id) };
    clone.name += " (copy)";
    clone.id = Date.now();
    console.log(clone);
    setProductionCosts([clone, ...productionCosts]);
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
              {item.ingredients.reduce(
                (acumulado, item) => acumulado + item.cost * item.qtd,
                0
              )}
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
    </>
  );
};
