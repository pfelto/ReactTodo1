import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoApp from './TodoApp';

//need to build better tests as well to make sure everything is working!
describe('Todo Test Suite', () => {
  describe('Render Todo', () => {
    it('Todo exists', () => {
      const { container, getByText } = render(<TodoApp />);
      const todo1 = getByText('First Todo');
      expect(todo1).toHaveTextContent('First Todo');
      expect(todo1.textContent).toBe('First Todo');
      expect(container).toBeDefined();
    });
  });
});
