import type { GuidedBuildProject } from "./guided-builds";

export const contactFormProject: GuidedBuildProject = {
  id: "guided-contact-form",
  title: "Contact Form with Validation",
  subtitle: "Build a type-safe contact form with TypeScript and validation",
  difficulty: "beginner",
  estimatedMinutes: 25,
  conceptsSummary: [
    "TypeScript Interfaces",
    "Type Annotations",
    "Form Events",
    "Validation Logic",
    "Conditional Rendering",
    "Union Types",
  ],
  description:
    "Build a contact form from scratch using React and TypeScript. You'll learn how to define interfaces for form data, type your event handlers, validate user input, and manage form submission states with union types. Every web app needs forms — this teaches you the right way to build them.",
  packageJson: {
    name: "contact-form",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    },
    devDependencies: {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@vitejs/plugin-react": "^4.0.0",
      typescript: "^5.0.0",
      vite: "^5.0.0",
    },
  },
  files: [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Form</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
      language: "html",
      readOnly: true,
    },
    {
      path: "vite.config.js",
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
      language: "javascript",
      readOnly: true,
    },
    {
      path: "tsconfig.json",
      content: JSON.stringify(
        {
          compilerOptions: {
            target: "ES2020",
            useDefineForClassFields: true,
            lib: ["ES2020", "DOM", "DOM.Iterable"],
            module: "ESNext",
            skipLibCheck: true,
            moduleResolution: "bundler",
            allowImportingTsExtensions: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: "react-jsx",
            strict: true,
          },
          include: ["src"],
        },
        null,
        2
      ),
      language: "json",
      readOnly: true,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "contact-form",
          private: true,
          version: "0.0.0",
          type: "module",
          scripts: { dev: "vite", build: "vite build" },
          dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" },
          devDependencies: {
            "@types/react": "^18.2.0",
            "@types/react-dom": "^18.2.0",
            "@vitejs/plugin-react": "^4.0.0",
            typescript: "^5.0.0",
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
      path: "src/main.tsx",
      content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
      language: "typescript",
      readOnly: true,
    },
    {
      path: "src/App.tsx",
      content: `// Contact Form App
// Follow the steps in the Tutor Panel to build this! -->

export default function App() {
  return (
    <div className="app">
      <h1>Contact Us</h1>
      {/* Your code will go here */}
    </div>
  )
}`,
      language: "typescript",
    },
    {
      path: "src/ContactForm.tsx",
      content: `// ContactForm component — you'll build this step by step

export default function ContactForm() {
  return null
}`,
      language: "typescript",
    },
    {
      path: "src/App.css",
      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #1a1a2e;
  color: #e0e0e0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  background: #16213e;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #00d2ff;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.875rem;
  color: #a0a0b0;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: #0f3460;
  color: #e0e0e0;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #00d2ff;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e94560;
}

.error-message {
  color: #e94560;
  font-size: 0.75rem;
  margin-top: 4px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #00d2ff;
  color: #1a1a2e;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 8px;
}

.submit-btn:hover {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.success-message {
  text-align: center;
  padding: 32px;
}

.success-message .icon {
  font-size: 3rem;
  margin-bottom: 16px;
  color: #51cf66;
}

.success-message h2 {
  color: #51cf66;
  margin-bottom: 8px;
}

.success-message p {
  color: #a0a0b0;
  margin-bottom: 20px;
}

.success-message button {
  padding: 10px 24px;
  border-radius: 8px;
  border: 1px solid #2a2a4a;
  background: transparent;
  color: #00d2ff;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.success-message button:hover {
  border-color: #00d2ff;
}`,
      language: "css",
      readOnly: true,
    },
  ],
  steps: [
    {
      id: "cf-step-1",
      order: 1,
      title: "Define the FormData interface",
      instruction:
        "At the top of `src/ContactForm.tsx` (line 1), define a TypeScript interface for the form data with typed fields for name, email, and message.",
      explanation:
        "TypeScript interfaces describe the shape of an object. By defining `FormData`, you tell TypeScript exactly what fields your form has and what type each one is. This catches typos and type errors at compile time, before your code even runs.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `interface FormData {
  name: string
  email: string
  message: string
}`,
      placement: { type: "line", line: 1 },
      highlightLines: [1, 5],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "interface\\s+FormData\\s*\\{",
          description: "FormData interface is defined",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "name:\\s*string",
          description: "name field is typed as string",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "email:\\s*string",
          description: "email field is typed as string",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "message:\\s*string",
          description: "message field is typed as string",
        },
      ],
      deepExplanation:
        "Interfaces are one of TypeScript's most powerful features. They define a contract — any object of type `FormData` must have exactly these fields with these types. If you later try to access `formData.namee` (typo), TypeScript will catch it immediately. Interfaces are purely compile-time — they don't exist in the JavaScript output. They cost zero runtime performance. The convention is to define interfaces near the top of the file or in a separate types file.",
      concepts: ["interfaces", "type annotations", "TypeScript"],
    },
    {
      id: "cf-step-2",
      order: 2,
      title: "Define the FormErrors interface",
      instruction:
        "After the FormData interface (line 6), define a FormErrors interface where each field is optional. Errors only appear for fields that have validation problems.",
      explanation:
        "Using `Partial<FormData>` or defining each field with `?` (optional) means an error object might only have `{ email: 'Invalid email' }` without name or message errors. This models reality: not every field has an error at the same time.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `interface FormErrors {
  name?: string
  email?: string
  message?: string
}`,
      placement: { type: "line", line: 6 },
      highlightLines: [6, 10],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "interface\\s+FormErrors\\s*\\{",
          description: "FormErrors interface is defined",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "name\\?:\\s*string",
          description: "name error is optional",
        },
      ],
      deepExplanation:
        "The `?` after a property name makes it optional. `name?: string` means the property can either be a string or be absent entirely (undefined). This is different from `name: string | undefined` — with `?`, you don't even need to include the key. For form errors, this is perfect: an empty `FormErrors` object `{}` means no errors. As errors appear, we add keys: `{ email: 'Required' }`. TypeScript tracks which fields might be missing and requires null checks when you access them.",
      concepts: ["optional properties", "Partial types", "TypeScript"],
    },
    {
      id: "cf-step-3",
      order: 3,
      title: "Add typed state with useState",
      instruction:
        "Inside the ContactForm function (after the opening brace, around line 13), add useState hooks with TypeScript type annotations for formData and errors.",
      explanation:
        "By passing a type parameter to useState like `useState<FormData>(...)`, TypeScript knows the exact shape of your state. The initial values satisfy the FormData interface — all three string fields are initialized to empty strings.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')`,
      placement: { type: "replace-range", startLine: 12, endLine: 14 },
      highlightLines: [12, 22],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "useState<FormData>",
          description: "formData state is typed as FormData",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "useState<FormErrors>",
          description: "errors state is typed as FormErrors",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "useState<.*idle.*submitting.*success",
          description: "status uses a union type",
        },
      ],
      deepExplanation:
        "The union type `'idle' | 'submitting' | 'success'` is a powerful TypeScript pattern called a 'string literal union.' Unlike a generic `string` type, TypeScript restricts the value to only these three exact strings. If you try `setStatus('loading')`, TypeScript will error — because 'loading' isn't in the union. This acts like an enum but with less ceremony. It models the form's state machine: idle (waiting), submitting (sending), success (done). Each state triggers different UI.",
      concepts: ["generic useState", "union types", "state machines", "type parameters"],
    },
    {
      id: "cf-step-4",
      order: 4,
      title: "Create typed onChange handler",
      instruction:
        "After the state declarations (around line 23), add an onChange handler with proper TypeScript event types.",
      explanation:
        "React provides typed event objects. `React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>` tells TypeScript this handler works with both inputs and textareas. The `keyof FormData` type ensures we only update fields that exist on our interface.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }`,
      placement: { type: "line", line: 23 },
      highlightLines: [23, 31],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "React\\.ChangeEvent<HTMLInputElement",
          description: "Event type is properly annotated",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "\\[name\\]:\\s*value",
          description: "Dynamic property update with computed key",
        },
      ],
      deepExplanation:
        "TypeScript's event types mirror the DOM API. `React.ChangeEvent<HTMLInputElement>` types the event so `e.target.value` is always a string and `e.target.name` is available. The union `HTMLInputElement | HTMLTextAreaElement` lets one handler work for both. The computed property `[name]: value` uses the input's `name` attribute as the key — so an input with `name='email'` updates `formData.email`. We also clear the error for that field when the user starts typing, providing immediate feedback.",
      concepts: ["ChangeEvent", "event typing", "computed properties", "keyof"],
    },
    {
      id: "cf-step-5",
      order: 5,
      title: "Write the validate function",
      instruction:
        "After the handleChange function (around line 32), add a validate function that checks all fields and returns errors.",
      explanation:
        "The validate function returns a `FormErrors` object. If all fields are valid, it returns an empty object `{}`. Each validation check adds a property to the errors object. We use `Object.keys(errors).length` to check if there are any errors.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    return newErrors
  }`,
      placement: { type: "line", line: 32 },
      highlightLines: [32, 48],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "const\\s+validate\\s*=.*:\\s*FormErrors",
          description: "validate returns FormErrors",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "name\\.trim\\(\\)",
          description: "Name is validated",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "@.*\\.",
          description: "Email format is validated with regex",
        },
      ],
      deepExplanation:
        "The return type annotation `: FormErrors` ensures we only return valid error keys. If we tried `newErrors.phone = 'Required'`, TypeScript would catch it because `phone` doesn't exist on `FormErrors`. The email regex `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/` checks for: something before @, something after @, a dot, and something after the dot. It's not perfect (email validation is notoriously complex) but catches most mistakes. The early return pattern with `else if` prevents showing two errors for one field.",
      concepts: ["return types", "regex validation", "validation patterns", "FormErrors"],
    },
    {
      id: "cf-step-6",
      order: 6,
      title: "Handle form submission",
      instruction:
        "After the validate function (around line 49), add a form submit handler with proper TypeScript typing.",
      explanation:
        "The `React.FormEvent<HTMLFormElement>` type tells TypeScript this is a form submission event. We prevent the default page reload, validate all fields, and simulate an async submission with setTimeout.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }`,
      placement: { type: "line", line: 49 },
      highlightLines: [49, 60],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "React\\.FormEvent<HTMLFormElement>",
          description: "Submit handler has typed FormEvent",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "e\\.preventDefault\\(\\)",
          description: "Default form behavior is prevented",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "Object\\.keys\\(newErrors\\)\\.length",
          description: "Errors are checked before submission",
        },
      ],
      deepExplanation:
        "`React.FormEvent<HTMLFormElement>` is the typed version of a form submit event. It provides access to `e.currentTarget` (the form element) and `e.target`. `Object.keys(newErrors).length > 0` checks if the error object has any properties — if it does, we show errors and bail out. The `setTimeout` simulates a network request. In a real app, you'd use `fetch()` or `axios`. The status state machine transitions: idle -> submitting -> success, and each state shows different UI.",
      concepts: ["FormEvent", "preventDefault", "Object.keys", "async simulation"],
    },
    {
      id: "cf-step-7",
      order: 7,
      title: "Add the success state view",
      instruction:
        "Inside the ContactForm's return statement, replace `return null` with a conditional render. If status is 'success', show a success message.",
      explanation:
        "The union type we defined earlier makes this pattern type-safe. TypeScript knows `status` can only be 'idle', 'submitting', or 'success'. The early return pattern keeps the main form rendering clean.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `  if (status === 'success') {
    return (
      <div className="success-message">
        <div className="icon">\u2713</div>
        <h2>Message Sent!</h2>
        <p>Thank you for reaching out. We'll get back to you soon.</p>
        <button onClick={() => {
          setFormData({ name: '', email: '', message: '' })
          setErrors({})
          setStatus('idle')
        }}>
          Send Another Message
        </button>
      </div>
    )
  }`,
      placement: { type: "replace-range", startLine: 62, endLine: 63 },
      highlightLines: [62, 77],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "status\\s*===\\s*['\"]success['\"]",
          description: "Success state is checked",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "setStatus\\(['\"]idle['\"]\\)",
          description: "Reset transitions back to idle",
        },
      ],
      deepExplanation:
        "The early return pattern for different states is a clean alternative to deeply nested ternaries. When `status === 'success'`, we return completely different JSX. The reset function restores everything to initial values — formData, errors, and status. This is the state machine in action: success -> idle on button click. TypeScript ensures we can only set status to one of our three allowed values.",
      concepts: ["early return", "state machine transitions", "conditional rendering"],
    },
    {
      id: "cf-step-8",
      order: 8,
      title: "Render the form with typed inputs",
      instruction:
        "After the success check, add the form JSX with properly named inputs that match the FormData interface fields.",
      explanation:
        "Each input's `name` attribute matches a key in the FormData interface. The `value` and `onChange` create controlled inputs. The `className` conditionally adds 'error' when that field has a validation error.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Your name"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="you@example.com"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
          placeholder="Your message..."
        />
        {errors.message && <p className="error-message">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}`,
      placement: { type: "line", line: 78 },
      highlightLines: [78, 127],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "name=\"name\"",
          description: "Input name matches FormData field",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "value=\\{formData\\.name\\}",
          description: "Input is controlled with formData.name",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "errors\\.name\\s*&&",
          description: "Error message conditionally renders",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "disabled=\\{status\\s*===\\s*['\"]submitting['\"]\\}",
          description: "Submit button disabled during submission",
        },
      ],
      deepExplanation:
        "The `name` attribute on inputs is key — it matches the FormData interface keys, so `e.target.name` in handleChange is always 'name', 'email', or 'message'. The error display pattern `{errors.name && <p>...</p>}` uses short-circuit evaluation: if `errors.name` is undefined (no error), nothing renders. The `disabled` prop during submission prevents double-submit. The button text also changes to 'Sending...' for loading feedback.",
      concepts: ["controlled inputs", "name attribute", "conditional error display", "disabled state"],
    },
    {
      id: "cf-step-9",
      order: 9,
      title: "Wire up the ContactForm in App",
      instruction:
        "In `src/App.tsx`, import and render the ContactForm component, replacing the comment placeholder.",
      explanation:
        "The App component acts as a shell that provides layout. ContactForm handles all the logic internally. This separation keeps each file focused on one thing.",
      targetFile: "src/App.tsx",
      codeToWrite: `// Contact Form App
import ContactForm from './ContactForm'

export default function App() {
  return (
    <div className="app">
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  )
}`,
      placement: { type: "replace-range", startLine: 1, endLine: 11 },
      highlightLines: [1, 11],
      validation: [
        {
          targetFile: "src/App.tsx",
          pattern: "import\\s+ContactForm\\s+from",
          description: "ContactForm is imported",
        },
        {
          targetFile: "src/App.tsx",
          pattern: "<ContactForm\\s*/>",
          description: "ContactForm is rendered",
        },
      ],
      concepts: ["component composition", "imports"],
    },
    {
      id: "cf-step-10",
      order: 10,
      title: "Add form reset after submission",
      instruction:
        "This step is already handled by the 'Send Another Message' button in step 7. Let's verify the reset works by reviewing the pattern. The reset clears formData, errors, and status back to initial values.",
      explanation:
        "Resetting a form means restoring all state to initial values. Our reset in the success view does three things: clears form fields, clears errors, and transitions status back to 'idle'. This is a common pattern in form components.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `  // Form reset is handled by the 'Send Another Message' button above
  // It resets: formData -> empty, errors -> empty, status -> 'idle'
  // This completes the state machine cycle: idle -> submitting -> success -> idle`,
      placement: { type: "line", line: 61 },
      highlightLines: [61, 63],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "setFormData\\(\\{\\s*name:\\s*['\"]['\"]",
          description: "Form data is reset to empty values",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "setErrors\\(\\{\\}\\)",
          description: "Errors are cleared on reset",
        },
      ],
      concepts: ["form reset", "state machine", "initial values"],
    },
    {
      id: "cf-step-11",
      order: 11,
      title: "Add visual error and success indicators",
      instruction:
        "The CSS already includes `.error` and `.success-message` styles. Let's verify the visual feedback chain works: error borders on invalid inputs, error text below them, disabled button while submitting, and the green success view.",
      explanation:
        "Visual feedback is crucial for forms. Users need to know: which fields have problems (red border + error text), that their submission is processing (disabled button + 'Sending...' text), and that it succeeded (green checkmark + success message). This is all driven by our TypeScript state — the union type ensures we handle every possible state.",
      targetFile: "src/ContactForm.tsx",
      codeToWrite: `  // Visual feedback chain:
  // 1. errors.fieldName -> red border (className="error") + error text
  // 2. status === 'submitting' -> disabled button + "Sending..." text
  // 3. status === 'success' -> green success view with reset option`,
      placement: { type: "line", line: 64 },
      highlightLines: [64, 67],
      validation: [
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "className=.*error",
          description: "Error class is applied to invalid inputs",
        },
        {
          targetFile: "src/ContactForm.tsx",
          pattern: "success-message",
          description: "Success view has proper styling",
        },
      ],
      concepts: ["visual feedback", "UX patterns", "error states", "success states"],
    },
  ],
};
