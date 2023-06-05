import React, { useState } from 'react';
import NestedTitleModal from './nestedTitleModal';

const TodoItem = ({ todo, nestedTodos, onAddNested }) => {
  const [nestedTitleModalOpen, setNestedTitleModalOpen] = useState(false);

  const handleNestedTitleSave = (nestedTitle) => {
    onAddNested(todo.id, nestedTitle);
  };

  return (
    <div>
      <h3>{todo.title}</h3>
      <button onClick={() => setNestedTitleModalOpen(true)}>Add Nested Task</button>
      {nestedTodos.length > 0 && (
        <ol>
          {nestedTodos.map((nestedTodo) => (
            <li key={nestedTodo.id}>{nestedTodo.title}</li>
          ))}
        </ol>
      )}
      <NestedTitleModal
        isOpen={nestedTitleModalOpen}
        onClose={() => setNestedTitleModalOpen(false)}
        onSave={handleNestedTitleSave}
      />
    </div>
  );
};

export default TodoItem;
