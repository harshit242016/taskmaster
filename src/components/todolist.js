import React from 'react';
import { List } from 'antd';
import TodoItem from './todoitem';

const TodoList = ({ todos, onAddNested }) => {
    return (
      <List
        dataSource={todos}
        renderItem={(todo) => (
          <TodoItem todo={todo} onAddNested={onAddNested} nestedTodos={todo.nestedTodos} />
        )}
      />
    );
};

export default TodoList;
