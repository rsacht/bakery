import React, { useState } from "react";

import Row from "../../layout/row";
import Col from "../../layout/col";

import "./style.css";

export default props => {
  const [fixedCosts, setFixedCosts] = useState([
    { id: 1, description: "Aluguel", cost: 1500 },
    { id: 2, description: "Salários", cost: 1000 },
    { id: 3, description: "Encargos Sociais", cost: 400 }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCost, setNewCost] = useState(0);

  // console.log(Date.now());

  const handleNewItem = () => {
    if (!newName || newName == "") {
      alert("Insira uma descrição para o item.");
      return;
    }

    setFixedCosts([
      ...fixedCosts,
      { id: Date.now(), description: newName, cost: parseFloat(newCost) }
    ]);
  };

  const handleDelete = id => {
    setFixedCosts(fixedCosts.filter(item => item.id != id));
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
          <Col>{item.cost}</Col>
          <Col>
            {" "}
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
              Nome:{" "}
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                type="text"
              />
            </Col>
            <Col>
              Valor:{" "}
              <input
                value={newCost}
                onChange={e => setNewCost(e.target.value)}
                type="number"
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
        Total de custos fixos: R${" "}
        {parseFloat(
          fixedCosts.reduce((sum, item) => sum + item.cost, 0)
        ).toFixed(2)}
      </Row>
    </>
  );
};
