import type { ImmersiveProject } from "./immersive-projects";

export const reactImmersiveProjects: ImmersiveProject[] = [
  // ─── Project 1: Expense Tracker at TaskFlow ──────────────────────────
  {
    id: "immersive-expense-tracker",
    title: "Expense Tracker at TaskFlow",
    companyTier: 1,
    companyName: "TaskFlow",
    companyDescription:
      "A 5-person startup building productivity tools. Fast iteration, minimal process — you ship features end-to-end.",
    trackSlug: "react",
    difficulty: "beginner",
    scenario:
      "Your first week at TaskFlow, and the team needs an internal expense tracker ASAP. The CEO has been manually tracking expenses in a spreadsheet, and it's getting out of hand. You'll build a React app from scratch with a form to add expenses, a list to display them, and helper utilities for filtering and totals.",
    packageJson: {
      name: "expense-tracker",
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
      devDependencies: {
        "@vitejs/plugin-react": "^4.2.0",
        vite: "^5.0.0",
      },
    },
    files: [
      {
        path: "package.json",
        content: JSON.stringify(
          {
            name: "expense-tracker",
            private: true,
            version: "0.0.0",
            type: "module",
            scripts: {
              dev: "vite",
              build: "vite build",
              preview: "vite preview",
            },
            dependencies: {
              react: "^18.2.0",
              "react-dom": "^18.2.0",
            },
            devDependencies: {
              "@vitejs/plugin-react": "^4.2.0",
              vite: "^5.0.0",
            },
          },
          null,
          2
        ),
        language: "json",
        readOnly: true,
      },
      {
        path: "index.html",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Expense Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
        language: "html",
        readOnly: true,
      },
      {
        path: "vite.config.js",
        content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
        language: "javascript",
        readOnly: true,
      },
      {
        path: "src/main.jsx",
        content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        language: "javascript",
        readOnly: true,
      },
      {
        path: "src/App.jsx",
        content: `import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { calculateTotal, filterByCategory } from './utils/helpers';

export default function App() {
  // TODO: Task 3 - Add state for expenses array
  // TODO: Task 3 - Add handler functions for adding and deleting expenses

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Expense Tracker</h1>
      <p style={{ color: '#888' }}>Track your team expenses</p>

      {/* TODO: Task 3 - Render ExpenseForm with onAddExpense handler */}

      {/* TODO: Task 3 - Render ExpenseList with expenses and onDeleteExpense handler */}

      {/* TODO: Task 4 - Show total using calculateTotal */}
    </div>
  );
}`,
        language: "javascript",
      },
      {
        path: "src/App.css",
        content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #1a1a2e;
  color: #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  color: #14b8a6;
  margin-bottom: 4px;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  transition: background 0.2s;
}

input, select {
  background: #16213e;
  color: #e0e0e0;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  outline: none;
}

input:focus, select:focus {
  border-color: #14b8a6;
}`,
        language: "css",
        readOnly: true,
      },
      {
        path: "src/components/ExpenseForm.jsx",
        content: `import React from 'react';

// TODO: Task 1 - Build the ExpenseForm component
// Props: onAddExpense (function that receives an expense object)
//
// An expense object looks like:
// { id: Date.now(), description: "Lunch", amount: 12.50, category: "food" }
//
// Requirements:
// - Three controlled inputs: description (text), amount (number), category (select)
// - Categories: "food", "transport", "office", "other"
// - Form submit handler that validates and calls onAddExpense
// - Clear form after successful submit

export default function ExpenseForm({ onAddExpense }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Add Expense</h2>
      {/* Build your form here */}
      <p style={{ color: '#888' }}>ExpenseForm not yet implemented</p>
    </div>
  );
}`,
        language: "javascript",
      },
      {
        path: "src/components/ExpenseList.jsx",
        content: `import React from 'react';
import ExpenseItem from './ExpenseItem';

// TODO: Task 2 - Build the ExpenseList component
// Props: expenses (array), onDeleteExpense (function that receives expense id)
//
// Requirements:
// - Render a list of ExpenseItem components from the expenses array
// - Pass each expense's data and the delete handler to ExpenseItem
// - Use the expense id as the key prop
// - Show "No expenses yet" message when array is empty

export default function ExpenseList({ expenses = [], onDeleteExpense }) {
  return (
    <div>
      <h2 style={{ fontSize: 18, marginBottom: 12 }}>Expenses</h2>
      {/* Render expense items here */}
      <p style={{ color: '#888' }}>ExpenseList not yet implemented</p>
    </div>
  );
}`,
        language: "javascript",
      },
      {
        path: "src/components/ExpenseItem.jsx",
        content: `import React from 'react';

// TODO: Task 2 - Build the ExpenseItem component
// Props: expense (object with id, description, amount, category), onDelete (function)
//
// Requirements:
// - Display description, formatted amount ($X.XX), and category
// - Delete button that calls onDelete with the expense id
// - Style the item as a card/row

export default function ExpenseItem({ expense, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      marginBottom: 8,
      background: '#16213e',
      borderRadius: 8,
      border: '1px solid #334155',
    }}>
      {/* Display expense details and delete button here */}
      <span style={{ color: '#888' }}>ExpenseItem not yet implemented</span>
    </div>
  );
}`,
        language: "javascript",
      },
      {
        path: "src/utils/helpers.js",
        content: `// TODO: Task 4 - Implement helper utilities
//
// calculateTotal(expenses) - Returns the sum of all expense amounts
//   - Should handle empty arrays (return 0)
//   - Should return a number (not a string)
//
// filterByCategory(expenses, category) - Returns expenses matching the category
//   - If category is "all" or empty, return all expenses
//   - Otherwise filter to matching category
//
// formatCurrency(amount) - Formats a number as "$X.XX"
//   - Use toFixed(2) for consistent decimal places

export function calculateTotal(expenses) {
  // Implement me
  return 0;
}

export function filterByCategory(expenses, category) {
  // Implement me
  return expenses;
}

export function formatCurrency(amount) {
  // Implement me
  return amount;
}`,
        language: "javascript",
      },
    ],
    tasks: [
      {
        id: "expense-task-1",
        title: "Build the ExpenseForm Component",
        description:
          "Create a form with controlled inputs for adding new expenses. The form should have fields for description, amount, and category, with proper state management and validation.",
        context:
          'Sarah (Tech Lead): "Hey! Welcome aboard. First thing — we need a form where people can log expenses. Description, amount, and a category dropdown. Keep it simple, just get it working with useState."',
        targetFiles: ["src/components/ExpenseForm.jsx"],
        requirements: [
          "Add useState hooks for description, amount, and category",
          "Create a form with three controlled inputs (text, number, select)",
          "Category options: food, transport, office, other",
          "Handle form submission: validate inputs, create expense object with id (Date.now()), call onAddExpense",
          "Clear all inputs after successful submission",
        ],
        hints: [
          "Start with three useState calls: one for each form field",
          "Use <form onSubmit={handleSubmit}> and remember e.preventDefault()",
          'Validate: description must not be empty, amount must be > 0. Use parseFloat() on the amount.',
          "After calling onAddExpense({id: Date.now(), description, amount: parseFloat(amount), category}), reset all state to initial values",
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/components/ExpenseForm.jsx",
            pattern: "useState",
            description: "Uses useState for controlled inputs",
          },
          {
            type: "file-content",
            targetFile: "src/components/ExpenseForm.jsx",
            pattern: "onSubmit|handleSubmit",
            description: "Has a form submit handler",
          },
          {
            type: "file-content",
            targetFile: "src/components/ExpenseForm.jsx",
            pattern: "<input|<select",
            description: "Contains input and select elements",
          },
          {
            type: "file-content",
            targetFile: "src/components/ExpenseForm.jsx",
            pattern: "onAddExpense",
            description: "Calls onAddExpense with expense data",
          },
        ],
      },
      {
        id: "expense-task-2",
        title: "Build ExpenseList and ExpenseItem",
        description:
          "Create the list and item components to display expenses. ExpenseList maps over expenses and renders ExpenseItem for each. ExpenseItem shows expense details with a delete button.",
        context:
          'Sarah (Tech Lead): "Nice work on the form! Now we need to display the expenses. Build out ExpenseList to render each expense as an ExpenseItem card. Don\'t forget the key prop and the delete button."',
        targetFiles: [
          "src/components/ExpenseList.jsx",
          "src/components/ExpenseItem.jsx",
        ],
        requirements: [
          "ExpenseList: Map over expenses array and render ExpenseItem for each",
          "ExpenseList: Use expense.id as the key prop",
          'ExpenseList: Show "No expenses yet" when array is empty',
          "ExpenseItem: Display description, formatted amount ($X.XX), and category",
          "ExpenseItem: Include a delete button that calls onDelete(expense.id)",
        ],
        hints: [
          "In ExpenseList, check expenses.length === 0 first for the empty state",
          "Use expenses.map(exp => <ExpenseItem key={exp.id} expense={exp} onDelete={onDeleteExpense} />)",
          "In ExpenseItem, use expense.amount.toFixed(2) to format the amount",
          'Style the delete button with background: "#ef4444" for a red color',
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/components/ExpenseList.jsx",
            pattern: "\\.map\\(",
            description: "ExpenseList maps over expenses array",
          },
          {
            type: "file-content",
            targetFile: "src/components/ExpenseList.jsx",
            pattern: "key=",
            description: "Uses key prop on list items",
          },
          {
            type: "file-content",
            targetFile: "src/components/ExpenseItem.jsx",
            pattern: "onDelete|onClick",
            description: "ExpenseItem has delete functionality",
          },
          {
            type: "file-content",
            targetFile: "src/components/ExpenseItem.jsx",
            pattern: "description|amount|category",
            description: "ExpenseItem displays expense data",
          },
        ],
      },
      {
        id: "expense-task-3",
        title: "Wire Up App.jsx with State and Handlers",
        description:
          "Connect everything in App.jsx. Add expenses state, handler functions for adding and deleting expenses, and pass them as props to the child components.",
        context:
          'Sarah (Tech Lead): "Components are looking good! Now wire it all up in App.jsx. You\'ll need state for the expenses array, a function to add a new expense, and one to delete by ID. Pass everything down as props."',
        targetFiles: ["src/App.jsx"],
        requirements: [
          "Add useState for an expenses array (start empty)",
          "Create addExpense function that adds to the array using spread or concat",
          "Create deleteExpense function that filters out by ID",
          "Render ExpenseForm with onAddExpense={addExpense}",
          "Render ExpenseList with expenses={expenses} and onDeleteExpense={deleteExpense}",
        ],
        hints: [
          "const [expenses, setExpenses] = useState([])",
          "addExpense: setExpenses(prev => [...prev, expense])",
          "deleteExpense: setExpenses(prev => prev.filter(e => e.id !== id))",
          "Make sure to import and render both ExpenseForm and ExpenseList components",
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/App.jsx",
            pattern: "useState\\(\\[",
            description: "App has expenses state initialized as empty array",
          },
          {
            type: "file-content",
            targetFile: "src/App.jsx",
            pattern: "setExpenses",
            description: "App has setExpenses for state updates",
          },
          {
            type: "file-content",
            targetFile: "src/App.jsx",
            pattern: "<ExpenseForm",
            description: "Renders ExpenseForm component",
          },
          {
            type: "file-content",
            targetFile: "src/App.jsx",
            pattern: "<ExpenseList",
            description: "Renders ExpenseList component",
          },
        ],
      },
      {
        id: "expense-task-4",
        title: "Add Filtering and Totals",
        description:
          "Implement the utility functions in helpers.js and use them in App.jsx to show the total expense amount and optionally filter by category.",
        context:
          'CEO (Mike): "This is great! One more thing — can you add a total at the bottom? And Sarah mentioned we might want to filter by category later, so go ahead and build that helper too."',
        targetFiles: ["src/utils/helpers.js", "src/App.jsx"],
        requirements: [
          "Implement calculateTotal: sum all expense amounts, handle empty array",
          "Implement filterByCategory: filter by category, return all if 'all' or empty",
          "Implement formatCurrency: format as $X.XX using toFixed(2)",
          "Use calculateTotal in App.jsx to display the total",
        ],
        hints: [
          "calculateTotal: expenses.reduce((sum, exp) => sum + exp.amount, 0)",
          "filterByCategory: if (!category || category === 'all') return expenses; return expenses.filter(e => e.category === category)",
          "formatCurrency: return `$${Number(amount).toFixed(2)}`",
          "In App.jsx, add <p>Total: {formatCurrency(calculateTotal(expenses))}</p> after ExpenseList",
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/utils/helpers.js",
            pattern: "reduce|forEach",
            description: "calculateTotal uses array method to sum amounts",
          },
          {
            type: "file-content",
            targetFile: "src/utils/helpers.js",
            pattern: "filter",
            description: "filterByCategory uses filter method",
          },
          {
            type: "file-content",
            targetFile: "src/utils/helpers.js",
            pattern: "toFixed",
            description: "formatCurrency uses toFixed for formatting",
          },
          {
            type: "file-content",
            targetFile: "src/App.jsx",
            pattern: "calculateTotal",
            description: "App.jsx uses calculateTotal to show total",
          },
        ],
      },
    ],
  },

  // ─── Project 2: Chat Widget at ShopStream ────────────────────────────
  {
    id: "immersive-chat-widget",
    title: "Chat Widget at ShopStream",
    companyTier: 2,
    companyName: "ShopStream",
    companyDescription:
      "A growing e-commerce platform with 30 engineers. The team is scaling fast and needs reusable, well-structured components.",
    trackSlug: "react",
    difficulty: "intermediate",
    scenario:
      "ShopStream's customer support team needs a real-time chat widget embedded in the shopping experience. You'll build a fully functional chat UI with a custom hook for state management, auto-scrolling message list, and polished styling. The architecture needs to be clean — this widget will be reused across multiple pages.",
    packageJson: {
      name: "chat-widget",
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
      },
      devDependencies: {
        "@vitejs/plugin-react": "^4.2.0",
        vite: "^5.0.0",
      },
    },
    files: [
      {
        path: "package.json",
        content: JSON.stringify(
          {
            name: "chat-widget",
            private: true,
            version: "0.0.0",
            type: "module",
            scripts: {
              dev: "vite",
              build: "vite build",
              preview: "vite preview",
            },
            dependencies: {
              react: "^18.2.0",
              "react-dom": "^18.2.0",
            },
            devDependencies: {
              "@vitejs/plugin-react": "^4.2.0",
              vite: "^5.0.0",
            },
          },
          null,
          2
        ),
        language: "json",
        readOnly: true,
      },
      {
        path: "index.html",
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ShopStream Chat</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
        language: "html",
        readOnly: true,
      },
      {
        path: "vite.config.js",
        content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
        language: "javascript",
        readOnly: true,
      },
      {
        path: "src/main.jsx",
        content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import './styles/chat.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        language: "javascript",
        readOnly: true,
      },
      {
        path: "src/App.jsx",
        content: `import React from 'react';
import ChatWindow from './components/ChatWindow';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <h1 style={{ color: '#e2e8f0', marginBottom: 16, fontFamily: 'sans-serif' }}>
          ShopStream Support
        </h1>
        <ChatWindow />
      </div>
    </div>
  );
}`,
        language: "javascript",
        readOnly: true,
      },
      {
        path: "src/App.css",
        content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0f172a;
  color: #e2e8f0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}`,
        language: "css",
        readOnly: true,
      },
      {
        path: "src/styles/chat.css",
        content: `.chat-window {
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow: hidden;
}

.chat-header {
  padding: 16px;
  border-bottom: 1px solid #334155;
  font-weight: 600;
  color: #e2e8f0;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-bubble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.chat-bubble.sent {
  align-self: flex-end;
  background: #3b82f6;
  color: white;
  border-bottom-right-radius: 4px;
}

.chat-bubble.received {
  align-self: flex-start;
  background: #334155;
  color: #e2e8f0;
  border-bottom-left-radius: 4px;
}

.chat-bubble .sender {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
  opacity: 0.8;
}

.chat-bubble .timestamp {
  font-size: 10px;
  opacity: 0.6;
  margin-top: 4px;
  text-align: right;
}

.message-input-container {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #334155;
  background: #1e293b;
}

.message-input-container input {
  flex: 1;
  background: #0f172a;
  color: #e2e8f0;
  border: 1px solid #334155;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 14px;
  outline: none;
}

.message-input-container input:focus {
  border-color: #3b82f6;
}

.message-input-container button {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.message-input-container button:hover {
  background: #2563eb;
}

.message-input-container button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
        language: "css",
        readOnly: true,
      },
      {
        path: "src/hooks/useChat.js",
        content: `import { useState, useCallback } from 'react';

// TODO: Task 1 - Build the useChat custom hook
//
// This hook manages all chat state and actions.
// It should return:
// {
//   messages: array of message objects,
//   addMessage: function(text, sender) - adds a new message,
//   clearMessages: function() - clears all messages,
// }
//
// A message object looks like:
// { id: Date.now(), text: "Hello!", sender: "user", timestamp: new Date() }
//
// The hook should start with a welcome message from "support"

export default function useChat() {
  // TODO: Initialize messages state with a welcome message
  // TODO: Create addMessage function using useCallback
  // TODO: Create clearMessages function using useCallback
  // TODO: Return messages, addMessage, clearMessages

  return {
    messages: [],
    addMessage: () => {},
    clearMessages: () => {},
  };
}`,
        language: "javascript",
      },
      {
        path: "src/components/ChatBubble.jsx",
        content: `import React from 'react';

// TODO: Task 2 - Build the ChatBubble component
// Props: message (object with id, text, sender, timestamp)
//
// Requirements:
// - Apply "sent" class when sender is "user", "received" otherwise
// - Show sender name for received messages
// - Show timestamp formatted as HH:MM
// - Use the CSS classes from chat.css: "chat-bubble", "sent", "received"

export default function ChatBubble({ message }) {
  return (
    <div className="chat-bubble received">
      <p>ChatBubble not yet implemented</p>
    </div>
  );
}`,
        language: "javascript",
      },
      {
        path: "src/components/MessageList.jsx",
        content: `import React from 'react';
import ChatBubble from './ChatBubble';

// TODO: Task 3 - Build the MessageList component
// Props: messages (array of message objects)
//
// Requirements:
// - Render a ChatBubble for each message
// - Use message.id as key
// - Auto-scroll to bottom when new messages arrive (useEffect + useRef)
// - Use the "message-list" CSS class

export default function MessageList({ messages = [] }) {
  return (
    <div className="message-list">
      {/* Render ChatBubble components here */}
      <p style={{ color: '#64748b', textAlign: 'center' }}>MessageList not yet implemented</p>
    </div>
  );
}`,
        language: "javascript",
      },
      {
        path: "src/components/MessageInput.jsx",
        content: `import React from 'react';

// TODO: Task 4 - Build the MessageInput component
// Props: onSendMessage (function that receives message text)
//
// Requirements:
// - Controlled text input with useState
// - Send on form submit (button click)
// - Also send on Enter key press
// - Don't send empty/whitespace-only messages
// - Clear input after sending
// - Disable send button when input is empty
// - Use the "message-input-container" CSS class

export default function MessageInput({ onSendMessage }) {
  return (
    <div className="message-input-container">
      {/* Build input and send button here */}
      <input placeholder="Type a message..." disabled />
      <button disabled>Send</button>
    </div>
  );
}`,
        language: "javascript",
      },
      {
        path: "src/components/ChatWindow.jsx",
        content: `import React from 'react';

// TODO: Task 5 - Wire up ChatWindow composing all components
//
// Requirements:
// - Import and use the useChat hook
// - Render ChatWindow structure: header, MessageList, MessageInput
// - Pass messages to MessageList
// - When user sends a message, add it with sender "user"
// - Simulate a support reply after 1 second (sender "support")
// - Use the "chat-window" and "chat-header" CSS classes

const AUTO_REPLIES = [
  "Thanks for reaching out! Let me look into that for you.",
  "I understand your concern. Let me check our system.",
  "Great question! Here's what I found...",
  "I'm happy to help with that!",
  "Let me connect you with our specialist team.",
];

export default function ChatWindow() {
  return (
    <div className="chat-window">
      <div className="chat-header">Customer Support</div>
      {/* Compose MessageList and MessageInput here */}
      <p style={{ padding: 16, color: '#64748b' }}>ChatWindow not yet implemented</p>
    </div>
  );
}`,
        language: "javascript",
      },
    ],
    tasks: [
      {
        id: "chat-task-1",
        title: "Build the useChat Custom Hook",
        description:
          "Create a custom hook that manages chat state: messages array, addMessage function, and clearMessages function. This hook encapsulates all chat logic so components stay clean.",
        context:
          'Priya (Senior Dev): "Welcome to ShopStream! We\'re building our chat widget with a hooks-first approach. Start with useChat — it\'ll hold all the state so our components just consume it. Initialize with a welcome message from support."',
        targetFiles: ["src/hooks/useChat.js"],
        requirements: [
          "Initialize messages state with a welcome message from 'support'",
          "addMessage(text, sender): creates message object with id (Date.now()), text, sender, and timestamp (new Date())",
          "Use useCallback for addMessage and clearMessages",
          "clearMessages: resets to empty array",
          "Return { messages, addMessage, clearMessages }",
        ],
        hints: [
          'Welcome message: { id: 1, text: "Hi! How can I help you today?", sender: "support", timestamp: new Date() }',
          "Use useState with the welcome message as initial value: useState([welcomeMsg])",
          "addMessage should use setMessages(prev => [...prev, newMessage])",
          "Wrap functions in useCallback with correct dependencies (setMessages is stable)",
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/hooks/useChat.js",
            pattern: "useState\\(\\[",
            description: "Initializes state with array containing welcome message",
          },
          {
            type: "file-content",
            targetFile: "src/hooks/useChat.js",
            pattern: "useCallback",
            description: "Uses useCallback for memoized functions",
          },
          {
            type: "file-content",
            targetFile: "src/hooks/useChat.js",
            pattern: "Date\\.now\\(\\)|timestamp",
            description: "Creates messages with id and timestamp",
          },
        ],
      },
      {
        id: "chat-task-2",
        title: "Build the ChatBubble Component",
        description:
          "Create the ChatBubble component that renders individual messages with different styling for sent vs received messages.",
        context:
          'Priya (Senior Dev): "Now build the ChatBubble. The CSS is already done — just apply \'sent\' class for user messages and \'received\' for support. Show the sender name on received messages and format the timestamp as HH:MM."',
        targetFiles: ["src/components/ChatBubble.jsx"],
        requirements: [
          "Apply 'chat-bubble sent' class when sender is 'user'",
          "Apply 'chat-bubble received' class when sender is not 'user'",
          "Show sender name (in a div with className 'sender') for received messages only",
          "Display message text",
          "Show timestamp formatted as HH:MM (in a div with className 'timestamp')",
        ],
        hints: [
          "Use template literal: className={`chat-bubble ${message.sender === 'user' ? 'sent' : 'received'}`}",
          "Conditionally render sender: {message.sender !== 'user' && <div className=\"sender\">{message.sender}</div>}",
          'Format time: new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })',
          "Structure: sender div (conditional) → text paragraph → timestamp div",
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/components/ChatBubble.jsx",
            pattern: "sent|received",
            description: "Applies conditional sent/received classes",
          },
          {
            type: "file-content",
            targetFile: "src/components/ChatBubble.jsx",
            pattern: "sender",
            description: "Displays sender name for received messages",
          },
          {
            type: "file-content",
            targetFile: "src/components/ChatBubble.jsx",
            pattern: "timestamp|toLocaleTimeString|getHours|getMinutes",
            description: "Shows formatted timestamp",
          },
        ],
      },
      {
        id: "chat-task-3",
        title: "Build the MessageList with Auto-Scroll",
        description:
          "Create the MessageList component that renders messages and auto-scrolls to the bottom when new messages arrive using useEffect and useRef.",
        context:
          'Priya (Senior Dev): "The list needs to auto-scroll. Use useRef to grab the container, and useEffect to scroll to bottom whenever messages change. Classic pattern — you\'ll see it everywhere in chat UIs."',
        targetFiles: ["src/components/MessageList.jsx"],
        requirements: [
          "Render ChatBubble for each message with message.id as key",
          "Use useRef to create a ref for the message list container",
          "Use useEffect to scroll to bottom when messages array changes",
          "Use the 'message-list' CSS class on the container",
        ],
        hints: [
          "const listRef = useRef(null) and attach to the container div",
          "useEffect with [messages] dependency: listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })",
          "Map: messages.map(msg => <ChatBubble key={msg.id} message={msg} />)",
          "Don't forget to import useRef and useEffect from React",
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/components/MessageList.jsx",
            pattern: "useRef",
            description: "Uses useRef for scroll container",
          },
          {
            type: "file-content",
            targetFile: "src/components/MessageList.jsx",
            pattern: "useEffect",
            description: "Uses useEffect for auto-scroll",
          },
          {
            type: "file-content",
            targetFile: "src/components/MessageList.jsx",
            pattern: "\\.map\\(",
            description: "Maps over messages array",
          },
          {
            type: "file-content",
            targetFile: "src/components/MessageList.jsx",
            pattern: "scrollTo|scrollTop|scrollHeight",
            description: "Implements scroll behavior",
          },
        ],
      },
      {
        id: "chat-task-4",
        title: "Build the MessageInput Component",
        description:
          "Create a controlled input component for sending messages with Enter key support and empty-message prevention.",
        context:
          'Priya (Senior Dev): "Almost there! Build the input — controlled component, send on Enter, clear after send. Disable the button when empty. Standard chat UX."',
        targetFiles: ["src/components/MessageInput.jsx"],
        requirements: [
          "Use useState for controlled input value",
          "Send message on form submit and on Enter key press",
          "Prevent sending empty or whitespace-only messages (use trim())",
          "Clear input after sending",
          "Disable send button when input is empty",
          "Use the 'message-input-container' CSS class",
        ],
        hints: [
          "Use onKeyDown to detect Enter: if (e.key === 'Enter' && !e.shiftKey) handleSend()",
          "handleSend: check text.trim(), call onSendMessage(text.trim()), then setText('')",
          "Disable button: disabled={!text.trim()}",
          "You can use a form with onSubmit, or just a div with input + button",
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/components/MessageInput.jsx",
            pattern: "useState",
            description: "Uses useState for controlled input",
          },
          {
            type: "file-content",
            targetFile: "src/components/MessageInput.jsx",
            pattern: "trim\\(\\)",
            description: "Validates input with trim()",
          },
          {
            type: "file-content",
            targetFile: "src/components/MessageInput.jsx",
            pattern: "onSendMessage",
            description: "Calls onSendMessage handler",
          },
          {
            type: "file-content",
            targetFile: "src/components/MessageInput.jsx",
            pattern: "Enter|onKeyDown|onKeyPress",
            description: "Supports Enter key to send",
          },
        ],
      },
      {
        id: "chat-task-5",
        title: "Wire Up ChatWindow with All Components",
        description:
          "Compose all the pieces: use the useChat hook, render MessageList and MessageInput, and add auto-reply simulation.",
        context:
          'Priya (Senior Dev): "Final step — bring it all together in ChatWindow. Use the hook, compose the components, and add a fun touch: simulate a support auto-reply after a 1-second delay. Pick a random reply from the AUTO_REPLIES array."',
        targetFiles: ["src/components/ChatWindow.jsx"],
        requirements: [
          "Import and call useChat hook to get messages and addMessage",
          "Render MessageList with messages prop",
          "Render MessageInput with onSendMessage handler",
          "When user sends, add message with sender 'user'",
          "After 1 second, add auto-reply with sender 'support' (random from AUTO_REPLIES)",
          "Use 'chat-window' and 'chat-header' CSS classes",
        ],
        hints: [
          "const { messages, addMessage } = useChat()",
          "handleSend: addMessage(text, 'user'), then setTimeout(() => addMessage(reply, 'support'), 1000)",
          "Random reply: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]",
          "Clean up the timeout in useEffect return if you want to be thorough, but it's optional for this task",
        ],
        validation: [
          {
            type: "file-content",
            targetFile: "src/components/ChatWindow.jsx",
            pattern: "useChat",
            description: "Imports and uses the useChat hook",
          },
          {
            type: "file-content",
            targetFile: "src/components/ChatWindow.jsx",
            pattern: "<MessageList",
            description: "Renders MessageList component",
          },
          {
            type: "file-content",
            targetFile: "src/components/ChatWindow.jsx",
            pattern: "<MessageInput",
            description: "Renders MessageInput component",
          },
          {
            type: "file-content",
            targetFile: "src/components/ChatWindow.jsx",
            pattern: "setTimeout",
            description: "Simulates auto-reply with setTimeout",
          },
        ],
      },
    ],
  },
];
