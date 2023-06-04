import React, { useState } from 'react';
import { Button, Form, Input, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import TodoList from './todolist';

const { Header, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);

  const handleAddTodo = (values) => {
    const newTodo = { id: nextId, title: values.title, nestedTodos: [] };
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);
  };

  const addNestedTodo = (parentTodoId, nestedTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === parentTodoId) {
          return {
            ...todo,
            nestedTodos: [
              ...todo.nestedTodos,
              { id: nextId, title: nestedTitle },
            ],
          };
        }
        return todo;
      })
    );
    setNextId(nextId + 1);
  };

  const handleAddNested = (parentId, nestedTitle) => {
    const parentTodo = todos.find((todo) => todo.id === parentId);
    if (parentTodo) {
      addNestedTodo(parentId, nestedTitle);
    }
  };

  const handleLogout = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>Dashboard</h1>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Content style={{ padding: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Form onFinish={handleAddTodo}>
            <Form.Item name="title" style={{ width: '200%', textAlign : 'center'}} rules={[{ required: true, message: 'Please input a title!' }]}>
              <Input placeholder = "Add a task"/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Add Todo</Button>
            </Form.Item>
          </Form>
        </div>
        <TodoList todos={todos} onAddNested={handleAddNested} />
      </Content>
    </Layout>
  );
};

export default Dashboard;
