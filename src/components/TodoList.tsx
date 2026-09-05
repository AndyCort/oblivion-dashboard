import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CheckCircle2, Circle, ListTodo, X } from 'lucide-react';
import { WidgetBase, WidgetTitle } from './ui/Shared';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoWidget = styled(WidgetBase)`
  padding-bottom: 0.5rem;
`;

const TodoInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;

  &:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const TodoListContainer = styled.ul`
  list-style: none;
  overflow-y: auto;
  flex: 1;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.4rem 0;
  gap: 0.6rem;
  font-size: 1rem;
`;

const TodoTextWrapper = styled.div<{ $completed: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  opacity: ${props => (props.$completed ? 0.5 : 1)};
  text-decoration: ${props => (props.$completed ? 'line-through' : 'none')};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export function TodoList({ className = '' }: { className?: string }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('dashboard-todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: '1', text: 'Embrace the sorrow', completed: false },
      { id: '2', text: 'Find the light', completed: false }
    ];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('dashboard-todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: inputValue.trim(), completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <TodoWidget className={className}>
      <WidgetTitle>
        <ListTodo size={18} />
        Tasks
      </WidgetTitle>
      
      <TodoInput
        type="text"
        placeholder="Add a task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAdd}
      />
      
      <TodoListContainer>
        {todos.map(todo => (
          <TodoItem key={todo.id}>
            <TodoTextWrapper $completed={todo.completed} onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? <CheckCircle2 size={16} color="rgba(255,255,255,0.5)" /> : <Circle size={16} />}
              <span>{todo.text}</span>
            </TodoTextWrapper>
            <DeleteButton onClick={() => deleteTodo(todo.id)}>
              <X size={16} />
            </DeleteButton>
          </TodoItem>
        ))}
      </TodoListContainer>
    </TodoWidget>
  );
}
