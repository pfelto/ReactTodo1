import React, { createContext, useState } from 'react';
import TodoFullApp from './components/TodoApp';

export const themeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === 'light' ? 'App light' : 'App dark'}>
        <TodoFullApp />
      </div>
    </themeContext.Provider>
  );
}
export default App;
