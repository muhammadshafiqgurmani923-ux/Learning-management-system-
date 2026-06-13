import { Course } from "../types";

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Modern Frontend with React & Tailwind CSS",
    description: "Learn to build professional, highly responsive user interfaces using modern React component states and utility-first Tailwind styling.",
    category: "Development",
    difficulty: "Beginner",
    instructor: "Muhammad Shafiq Gurmani",
    duration: "6 Hours",
    rating: 4.8,
    lessons: [
      {
        id: "c1-l1",
        title: "Comprehending JSX & Component Architecture",
        duration: "45 Mins",
        content: `### Understanding the Visual Building Blocks of React

Welcome to React! At the heart of React is a declarative coding style, which means you describe *what* you want to see on the screen, and React takes care of matching the actual browser layout to your specification.

#### 1. What is JSX?
JSX stands for **JavaScript XML**. It is a syntax extension for JavaScript that allows you to write HTML-like elements directly inside your JavaScript files. Behind the scenes, build tools compile JSX into standard JavaScript function calls.

\`\`\`jsx
// This JSX code:
const element = <h1 className="title">Hello World</h1>;

// Is transformed into:
const element = React.createElement('h1', { className: 'title' }, 'Hello World');
\`\`\`

#### 2. Component Architecture
A React application is built as a nested tree of small, self-contained **components**. A component is simply a JavaScript function that returns React elements (usually JSX).

*   **Reusability:** Write once, reuse anywhere.
*   **Encapsulation:** Keep a component's markup, logic, and style bound together.
*   **Props (Properties):** Components accept external data via read-only parameters called \`props\`. This facilitates a unidirectional (vertical) water-fall data flow from parent to child.

#### 3. Key JSX Rules to Remember
1.  **Return a Single Root Element:** Your component must return one single wrapper element. If you don't want extra elements in the rendered DOM tree, use a Fragment: \`<></>\`.
2.  **Use CamelCase for Attributes:** Since JSX is JavaScript, attribute names map to properties. We write \`className\` instead of \`class\`, and \`onClick\` instead of \`onclick\`.
3.  **Embed Expressions in Curly Braces:** You can insert any valid JavaScript expression (variables, functions, ternary operators) inside curly braces \`{ }\` inside JSX.`,
        resources: [
          { name: "React Official Docs - Describing the UI", url: "https://react.dev/learn/describing-the-ui" },
          { name: "MDN Guide on JavaScript Modules", url: "https://developer.mozilla.org" }
        ],
        quiz: [
          {
            id: "qc1-l1-1",
            question: "Why must JSX components return a single root element?",
            options: [
              "Because browsers cannot parse multi-element structures natively.",
              "Because functions can only return a single value, and React compiles elements into a call stack of createElement functions.",
              "To make sure that the CSS stylesheet renders styles faster.",
              "So that state is locked within one singular DOM element."
            ],
            correctAnswerIndex: 1,
            explanation: "JSX is syntactic sugar for React.createElement() calls. Since a function is limited to returning a single object, we must wrap adjacent tags in a single element or fragment."
          },
          {
            id: "qc1-l1-2",
            question: "How do you pass dynamic text inside your JSX template?",
            options: [
              "By enclosing the variable inside double quotes like \"myVar\".",
              "By putting it within parenthetical braces (myVar).",
              "By wrapping the JavaScript expression inside curly braces { myVar }.",
              "By using HTML template syntax <% myVar %>."
            ],
            correctAnswerIndex: 2,
            explanation: "Curly braces tell the JSX compiler that the content inside should be evaluated as standard JavaScript instead of literal string text."
          }
        ]
      },
      {
        id: "c1-l2",
        title: "Managing State: Hooks & Re-renders",
        duration: "55 Mins",
        content: `### Understanding React State and the Lifecycle of Re-renders

While props represent data passed down from a parent, **State** is a component's locally managed memory that can change over time based on user interactions.

#### 1. Introducing standard Hooks
Hooks are functions that let you hook into React state and lifecycle features from functional components.

The most widely used hook is \`useState\`. It returns a pair: the current state value and a function that lets you update it.

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

#### 2. The Mechanics of Re-rendering
When you invoke the setter function (like \`setCount\` above), React schedule a **re-render** for that component.
1.  **Trigger:** State changes.
2.  **Render:** React runs your component function again to get the updated JSX output.
3.  **Commit/Paint:** React calculates the difference (reconciliation/virtual DOM comparison) and surgically updates only the modified elements in the actual browser DOM.

#### 3. Strict Rules of Hooks
To safeguard component behavior and maintain accurate render schedules, hooks must:
*   Only be called at the **top level** of your React function. Never call hooks inside loops, nested conditions (if statements), or helper functions.
*   Only be called from **React Functional Components** or Custom Hooks.`,
        resources: [
          { name: "React Official Docs - State: A Component's Memory", url: "https://react.dev/learn/state-a-components-memory" },
          { name: "Rules of Hooks Overview", url: "https://react.dev/learn/rules-of-hooks" }
        ],
        quiz: [
          {
            id: "qc1-l2-1",
            question: "What happens immediately when a component's state setter function is invoked?",
            options: [
              "The browser does a full window refresh.",
              "React scheduling mechanism queues a re-render of that component (and its children).",
              "The props are automatically discarded and set to null.",
              "The component is unmounted from the DOM and deleted."
            ],
            correctAnswerIndex: 1,
            explanation: "Calling a set state function triggers React's virtual DOM reconciliation flow, planning a re-render to update the user interface with the new state."
          },
          {
            id: "qc1-l2-2",
            question: "Which of the following is a violation of the Rules of Hooks?",
            options: [
              "Calling useState at the very top level of a component function.",
              "Declaring a hook inside an 'if (loading)' condition block.",
              "Calling a hook inside a custom React hook.",
              "Passing primitive numbers as the initial state value."
            ],
            correctAnswerIndex: 1,
            explanation: "Hooks must never be called conditionally. React relies on the exact order of hook calls on every render to map state values properly."
          }
        ]
      },
      {
        id: "c1-l3",
        title: "Responsive Layouts with Tailwind CSS",
        duration: "40 Mins",
        content: `### Design with Utility-First CSS

Gone are the days of maintaining thousands of lines of handwritten CSS selectors in custom files. **Tailwind CSS** provides immediate styling directly in your markup using optimized utility classes.

#### 1. What does Utility-First Mean?
Instead of writing a custom class like \`.custom-card { border-radius: 8px; padding: 16px; background-color: #fff; }\`, you directly declare Tailwind utilities in your JSX element's class markup:

\`\`\`jsx
// Standard card box
<div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
  <h3 className="text-lg font-medium text-slate-800">Card Header</h3>
</div>
\`\`\`

#### 2. The Responsive Prefix Flow
Tailwind makes building adaptive layouts simple using mobile-first screen breakpoints. Any class without a prefix applies to *all* screen sizes. Broken classes with a prefix (like \`md:\`, \`lg:\`) apply to that screen size and larger.

*   \`sm:\` -> Targets screens wider than **640px** (tablets)
*   \`md:\` -> Targets screens wider than **768px** (small laptops)
*   \`lg:\` -> Targets screens wider than **1024px** (desktops)
*   \`xl:\` -> Targets screens wider than **1280px** (large screens)

#### 3. Flexbox & Grid Made Easy
Designing column layouts is incredibly direct:
*   **Flexbox:** Pair container \`flex flex-col md:flex-row\` to have stacked columns on mobile which switch to side-by-side rows on tablet.
*   **CSS Grid:** Create grid bento-box layouts with ease: \`grid grid-cols-1 md:grid-cols-3 gap-6\`.`,
        resources: [
          { name: "Tailwind CSS Official Documentation", url: "https://tailwindcss.com/docs" },
          { name: "Intelligent Responsive Design with Flexbox", url: "https://flexboxfroggy.com" }
        ],
        quiz: [
          {
            id: "qc1-l3-1",
            question: "What is the primary design strategy of Tailwind CSS breakpoint prefix selectors?",
            options: [
              "Desktop-first development (classes apply until a mobile layout is met).",
              "Mobile-first development (unprefixed styles define the mobile layout, prefixes override for wider screens).",
              "Operating system targets (different classes for iOS and Android).",
              "Pixel ratio scaling (styles change based on retina displays)."
            ],
            correctAnswerIndex: 1,
            explanation: "Tailwind uses a mobile-first design system. This means unprefixed classes affect small screens, and larger screen overrides scale up (e.g., md: for tablets and larger)."
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Foundations of AI & Machine Learning",
    description: "Explore the internal architecture of Neural Networks, learn safe Prompt Engineering, and explore the future ethical landscape of AI deployment.",
    category: "Science",
    difficulty: "Intermediate",
    instructor: "Muhammad Shafiq Gurmani",
    duration: "8 Hours",
    rating: 4.9,
    lessons: [
      {
        id: "c2-l1",
        title: "Demystifying Neural Networks & Deep Learning",
        duration: "60 Mins",
        content: `### Inner Workings of Cognitive Computing

At the foundations of modern generative AI are deep structures known as Artificial Neural Networks. Let's lift the hood and understand how machines learn to perceive, generalize, and map patterns.

#### 1. What is an Artificial Neural Network?
Inspired vaguely by the human biological brain, an artificial neural network consists of layers of interconnected processing units called **neurons** (or nodes).

A standard network features:
*   **Input Layer:** Receives raw features (e.g., pixel intensities of an image, token embeddings of words).
*   **Hidden Layers:** Intermediate layers where neurons perform mathematical calculations to isolate abstract representations. 'Deep Learning' refers to networks with *many* hidden layers.
*   **Output Layer:** Delivers the network's final decision or prediction (e.g., classification, next word token).

#### 2. The Math of a Neuron
Each neuron takes multiple inputs, multiplies each by a corresponding **weight**, adds a numerical constant called a **bias**, and processes the result via an **activation function** (like ReLU or Sigmoid) which maps the output into a non-linear range.

$$\\text{Output} = \\text{Activation}(\\sum (\\text{Input} \\times \\text{Weight}) + \\text{Bias})$$

#### 3. Backpropagation & Optimization
How does the network correct its mistakes?
1.  **Forward Pass:** Data travels through the layers, making a prediction.
2.  **Loss Function:** Quantifies the mathematical error between the predicted output and the true label.
3.  **Backpropagation:** Employs calculus (derivative chain rule) to send error gradients backward through the network.
4.  **Gradient Descent:** Iteratively adjusts weights and biases in microscopic steps to minimize overall error. Over millions of repetitions, the network converges on highly accurate predictive values.`,
        resources: [
          { name: "3Blue1Brown - Neural Networks YouTube Series", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
          { name: "TensorFlow Virtual Playground", url: "https://playground.tensorflow.org/" }
        ],
        quiz: [
          {
            id: "qc2-l1-1",
            question: "What is deep learning referring to specifically?",
            options: [
              "Any program involving complex logical rules and state libraries.",
              "Neural network models featuring multiple hidden layers to extract high-level feature sets.",
              "A system that stores training data deep in relational databases.",
              "Software that runs search engine algorithms natively."
            ],
            correctAnswerIndex: 1,
            explanation: "Deep learning refers to compiling neural networks with multiple (sometimes hundreds of) hidden layers between the inputs and outputs, allowing for multi-layered conceptual grouping."
          },
          {
            id: "qc2-l1-2",
            question: "Why are activation functions crucial inside Hidden Layer Neurons?",
            options: [
              "They clear out memory buffers to prevent system crashes.",
              "They convert string code into binary vectors automatically.",
              "They introduce non-linearity, enabling the network to learn complex mathematical curves beyond plain straight lines.",
              "They calculate physical speed in server-side CPUs."
            ],
            correctAnswerIndex: 2,
            explanation: "Without an activation function, neural layers collapse mathematically into a simple linear combination. Non-linear activation functions permit learning non-linear, multi-dimensional boundary shapes."
          }
        ]
      },
      {
        id: "c2-l2",
        title: "Directing the Machine: Prompt Engineering Insights",
        duration: "45 Mins",
        content: `### Mastering Communication with Large Language Models

To get high-quality outputs from state-of-the-art transformer models (like Gemini), developers use **Prompt Engineering**: the craft of styling, sequencing, and shaping input prompts.

#### 1. The Core Anatomy of an Ideal Prompt
A premier prompt is comprised of four primary pillars:
1.  **Instruction:** A clear, active imperative detailing what task the model must execute (e.g., "Summarize", "Classify", "Translate").
2.  **Context:** Background reference material, system guidelines, or constraints (e.g., "Write in an informal tone suitable for high-school students").
3.  **Input Data:** The raw text, file, or content that requires processing.
4.  **Output Indicator:** The desired format, layout, structure, or token limit (e.g., "Format your response as a valid JSON object").

#### 2. Principal Prompt Techniques
*   **Zero-Shot Prompting:** Requesting the model to perform a task with zero prior examples. (e.g., "Translate 'Hello' to Urdu.")
*   **Few-Shot Prompting:** Providing 1 to 5 structural examples of inputs and desired outputs before your target query. This is incredibly powerful for aligning tone, formatting guidelines, and syntax constraints.
*   **Chain-of-Thought (CoT) Prompting:** Guiding the model to output its step-by-step reasoning logic before presenting its ultimate answer. CoT drastically reduces logical failures and mathematical calculation errors in output responses.`,
        resources: [
          { name: "LearnPrompting.org Community Guides", url: "https://learnprompting.org/" },
          { name: "Google AI Guide to Prompt Optimization", url: "https://ai.google/resources" }
        ],
        quiz: [
          {
            id: "qc2-l2-1",
            question: "What is standard Few-Shot prompting?",
            options: [
              "Waiting for the model to reply a few separate times until you get the best feedback.",
              "Feeding the model a few key target examples of inputs and matching outputs within the prompt sequence to clarify expectations.",
              "Setting the temperature slider to a very low decimal value.",
              "Writing short, quick questions without context."
            ],
            correctAnswerIndex: 1,
            explanation: "Few-shot prompting provides high-fidelity examples that teach the model the pattern, formatting constraints, or classification syntax you expect before issuing the real payload query."
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "Information Security & Defense Essentials",
    description: "Equip yourself with practical cybersecurity defense tools. Understand encryption, safe credentials architecture, and anti-phishing indicators.",
    category: "Science",
    difficulty: "Advanced",
    instructor: "Muhammad Shafiq Gurmani",
    duration: "5 Hours",
    rating: 4.7,
    lessons: [
      {
        id: "c3-l1",
        title: "Shielding Accounts: Authentication Best Practices",
        duration: "40 Mins",
        content: `### Robust Credential and Authentication Strategies

Every day, security centers intercept billions of automated brute-force attacks targeting online login pages. Relying on simple passwords puts your data in extreme danger. Let's analyze modern guardrails.

#### 1. Anatomy of Password Entropy
The defense power of a password is mathematically represented as **entropy**. It is not the length alone—but the unpredictability and variety of the character set that defines security strength.
*   **Brute-Force Speeds:** Supercomputers can test billions of weak, predictable dictionary combinations (even with numbers padded at the end) within seconds.
*   **Pasphrases > Passwords:** Stacking 4 or 5 random, unrelated words (e.g., \`correct-horse-battery-staple\`) results in extreme structural length and high entropy while remaining easy for human memory to retain to avoid physical post-it notes.

#### 2. Multi-Factor Authentication (MFA)
MFA establishes overlapping walls based on three security pillars:
1.  **Something You Know:** A password, PIN, or childhood pattern.
2.  **Something You Have:** A physical security key (Yubikey), a registered authenticator smartphone app (TOTP), or a hardware token generator.
3.  **Something You Are:** Biometric verification (fingerprint reader, facial camera).

*Security Advisory:* Always prefer App-based authenticator codes (or hardware keys) over SMS text codes. SMS is highly vulnerable to **SIM swapping** attacks and network intercept routes.`,
        resources: [
          { name: "EFF Guide to Creating Drastically Safer Passwords", url: "https://www.eff.org/dice" },
          { name: "OWASP Cheat Sheet on User Authentication", url: "https://cheatsheetseries.owasp.org/" }
        ],
        quiz: [
          {
            id: "qc3-l1-1",
            question: "Why should phone-based SMS codes be avoided for Multi-Factor Authentication when possible?",
            options: [
              "Because phone towers require internet access, which is expensive.",
              "Because SMS is vulnerable to SIM-swapping, where an attacker tricks a carrier into rerouting your phone number to their own device.",
              "Because SMS codes are limited to exactly 4 numeric characters.",
              "Because standard screens do not display text messages clearly."
            ],
            correctAnswerIndex: 1,
            explanation: "SIM swapping allows malicious actors to hijack your carrier signal, routing MFA verification codes directly to their smartphones bypass-leveling your secondary login screen."
          }
        ]
      }
    ]
  }
];
