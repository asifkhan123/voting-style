import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { itemList } from "./itemlist";

function App() {
  const [characters, updateCharacters] = useState(itemList);
  const [formData, setFormData] = useState({
    username: "",
    preference: [],
  });

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);

    const ordering = items.map((item) => item.id);
    setFormData({
      ...formData,
      preference: ordering,
    });
  }

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    //find a way to POST and store data in mongodb
    axios({
      method: "post",
      url: "http://localhost:3001/results",
      data: {
        username: formData.username,
        preference: formData.preference,
      },
    });

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
    alert("Thank you for your submission!");
  };

  return (
    <>
      <div className="App-header">
        <h1>Style Voting System</h1>
      </div>
      <div className="App-header">
        <Box component="form">
          <TextField
            required
            id="user"
            label="Username"
            helperText="Please input your username above"
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
          />
        </Box>
      </div>
      <div className="App">
        <header className="App-header">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <h2>
              Please sort these styles based on your preference, keeping your
              most preferred at the top.
            </h2>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, description, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="characters-thumb">
                              <img src={thumb} alt={id} />
                            </div>
                            <p>{description}</p>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </header>
      </div>
      <div className="App-header">
        {submitting && <div className="code">Submitting vote...</div>}
        <form onSubmit={handleSubmit}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default App;
