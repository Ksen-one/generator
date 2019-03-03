import React, { useState } from "react";
import { Container, Segment, Input, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Column(props) {
  const [colData, setColData] = useState([{ id: `${Math.random()}-${Date.now()}`, value: "" }]);
  props.data[props.id] = {};
  return (
    <Segment.Group>
      <Segment>
        <Button
          fluid
          color="red"
          icon
          labelPosition="right"
          onClick={props.delete}
        >
          Remove column
          <Icon name="minus" />
        </Button>
      </Segment>
      {colData.map(data => {
        return (
          <Segment key={data.id}>
            <InputData
              id={data.id}
              data={props.data[props.id]}
              delete={() =>
                setColData(state => state.filter(item => item.id !== data.id))
              }
            />
          </Segment>
        );
      })}
      <Segment>
        <Button
          icon
          fluid
          labelPosition="right"
          onClick={() =>
            setColData(state => {
              state.push({ id: `${Math.random()}-${Date.now()}`, value: "" });
              return [...state];
            })
          }
        >
          Add
          <Icon name="plus" />
        </Button>
      </Segment>
    </Segment.Group>
  );
}

function InputData(props) {
  const [data, setData] = useState("");
  props.data[props.id] = data;
  return (
    <Input
      action={{ color: "red", icon: "trash", onClick: () => props.delete() }}
      actionPosition="left"
      placeholder="Text..."
      value={data}
      onChange={e => setData(e.target.value)}
      fluid
    />
  );
}

function App() {
  const data = [];
  const [columns, setColumns] = useState([{ id: `${Math.random()}-${Date.now()}` }, { id: `${Math.random()}-${Date.now()}` }]);
  const [shit, setShit] = useState([]);
  return (
    <Container style={{paddingTop: '15px'}}>
      <Segment.Group>
        <Segment>
          <Button
            icon
            fluid
            labelPosition="right"
            onClick={() =>
              setColumns(state => [
                ...state,
                { id: `${Math.random()}-${Date.now()}` }
              ])
            }
          >
            New column
            <Icon name="plus" />
          </Button>
          {columns.length > 0 ? (
            <Segment.Group horizontal>
              {columns.map(colData => (
                <Segment key={colData.id}>
                  <Column
                    id={colData.id}
                    data={data}
                    delete={() =>
                      setColumns(state => [
                        ...state.filter(col => col !== colData)
                      ])
                    }
                  />
                </Segment>
              ))}
            </Segment.Group>
          ) : null}
        </Segment>
        {columns.length > 0 ? (
          <Segment>
            <Button
              fluid
              onClick={() => {
                console.log(data);

                const gen = (prev, colValues) => {
                  if (prev.length === 0) return [...colValues];
                  let res = [];
                  colValues.forEach(value => {
                    res = [
                      ...res,
                      ...prev.map(resItem => `${resItem} ${value}`)
                    ];
                  });
                  return res;
                };

                let result = [];
                for (const key in data) {
                  if (data.hasOwnProperty(key)) {
                    const col = data[key];
                    const values = Object.values(col);
                    result = [...gen(result, values)];
                  }
                }

                console.log(result);
                setShit(result);
              }}
            >
              Generate shit
            </Button>
            {shit.map((s, i) => (
              <Segment key={i} vertical>{s}</Segment>
            ))}
          </Segment>
        ) : null}
      </Segment.Group>
    </Container>
  );
}

export default App;
