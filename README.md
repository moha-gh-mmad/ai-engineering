# AI Toolkit — AI-Powered Web Application

A full-stack AI application that combines an AI chatbot and an AI-powered product review summarizer in one workspace.

Built with React, TypeScript, Node.js, Express, Prisma, and MySQL, this project explores how Large Language Models (LLMs) can be integrated into practical applications to improve user experiences and automate information processing.

## Overview

AI Toolkit brings two AI-powered features together:

- **AI Chatbot:** An interactive chatbot that allows users to communicate with an AI assistant while maintaining conversational context.
- **Review Summarizer:** An AI-powered tool that analyzes customer reviews and generates concise summaries, helping users understand the overall customer experience without reading every review individually.

### Why I Built This Project

The main purpose of this project was to go beyond traditional frontend development and explore how AI-powered applications are designed and implemented.

I wanted to understand the complete process of integrating an LLM into a real-world application, including frontend development, backend architecture, API communication, database management, and AI-generated responses.

Rather than building a simple chatbot, I decided to combine two different use cases in one application:

1. A conversational interface for interacting with an AI model.
2. A product review analysis tool that transforms customer feedback into useful insights.

Through this project, I aimed to gain practical experience with full-stack development and understand how AI capabilities can be integrated into existing application workflows.

## Features

### 1. AI Chatbot

- Interactive conversational interface.
- AI-generated responses through an LLM API.
- Conversation context management.
- Markdown rendering for structured AI responses.
- Responsive chat interface.
- Loading indicators and error handling.
- Conversation state preservation when switching between application sections.

### 2. AI Product Review Summarizer

- Browse customer reviews for different products.
- Display customer ratings and reviews.
- Generate AI-powered summaries from customer feedback.
- Present AI-generated summaries separately from original customer reviews.
- Reuse existing summaries when available.
- Display loading and error states during summary generation.

### 3. User Interface

- Responsive application layout.
- Component-based React architecture.
- Tailwind CSS styling.
- Minimalist interface with a consistent visual hierarchy.
- Smooth page transitions using the View Transition API.
- State preservation using React Activity.

## Screenshots

### AI Chatbot

![AI Chatbot interface](./packages/client/src/assets/screenshots/chatbot.png)

### Product Selection and Customer Reviews

![Product selection and customer reviews](./packages/client/src/assets/screenshots/review-summarizer.png)

### AI-Generated Review Summary

![AI-generated review summary](./packages/client/src/assets/screenshots/ai-summary.png)

## Tech Stack

### Frontend

| Technology     | Purpose                                  |
| -------------- | ---------------------------------------- |
| React          | Building the user interface              |
| TypeScript     | Type safety and maintainable code        |
| Vite           | Development server and build tooling     |
| Tailwind CSS   | Responsive UI styling                    |
| TanStack Query | Server-state management and API requests |
| Axios          | HTTP communication                       |
| React Markdown | Rendering Markdown responses             |
| React Icons    | UI icons                                 |

### Backend

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| Node.js    | Backend runtime               |
| Express.js | REST API development          |
| TypeScript | Type-safe backend development |
| Prisma ORM | Database access and queries   |
| MySQL      | Relational database           |
| Zod        | Request validation            |
| OpenRouter | LLM API integration           |

## Architecture

The project follows a separation-of-concerns approach, keeping frontend components, API communication, backend business logic, and database operations organized into separate modules.

```text
ai-engineering/
│
├── packages/
│   ├── client/
│   │   └── src/
│   │       ├── components/
│   │       │   ├── chat/
│   │       │   ├── reviews/
│   │       │   └── layout/
│   │       ├── hooks/
│   │       └── App.tsx
│   │
│   └── server/
│       └── src/
│           ├── controllers/
│           ├── services/
│           ├── repositories/
│           ├── routes.ts
│           └── lib/
│
└── package.json
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Bun](https://bun.sh/)
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- An [OpenRouter](https://openrouter.ai/) API key.

### 1. Clone the Repository

```bash
git clone https://github.com/moha-gh-mmad/ai-engineering.git

cd ai-engineering
```

### 2. Install Dependencies

Install the project dependencies from the root directory:

```bash
bun install
```

### 3. Configure Environment Variables

Navigate to the server package and create your environment file using the provided example:

```bash
cp packages/server/.env.example packages/server/.env
```

Configure the following environment variables in `packages/server/.env`:

```env
OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY

DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
```

| Variable             | Description                      |
| -------------------- | -------------------------------- |
| `OPENROUTER_API_KEY` | Your OpenRouter API key          |
| `DATABASE_URL`       | MySQL database connection string |

Replace the placeholder values with your actual credentials and database configuration.

**Important:** Never commit your actual `.env` file or expose API keys through frontend environment variables.

### 4. Configure the Database

Create the MySQL database specified in your `DATABASE_URL`.

Run the Prisma Client generation and database migration commands configured in the server package to prepare your database.

### 5. Run the Application

Start the backend and frontend using their respective development scripts.

**Backend:**

```bash
cd packages/server

bun run dev
```

**Frontend (in a separate terminal):**

```bash
cd packages/client

bun run dev
```

The application uses the following local development addresses by default:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

## What I Learned

Working on this project helped me explore several areas of modern full-stack development and practical AI integration:

- Integrating LLM APIs into practical application workflows.
- Building conversational interfaces and handling conversation context.
- Managing asynchronous server state with TanStack Query.
- Designing REST APIs with Express and TypeScript.
- Organizing backend code using controllers, services, and repositories.
- Working with relational databases through Prisma ORM.
- Handling API validation and errors using Zod.
- Building reusable and maintainable React components.
- Applying separation of concerns throughout a full-stack application.

## Future Improvements

Some areas I'd like to explore and improve:

- More advanced conversation management.
- Streaming support for AI responses.
- Additional product review analytics and insights.
- Improved caching and performance optimization.
- More comprehensive frontend and backend testing.

Junior Frontend Developer | React & Next.js | TypeScript

- **GitHub:** [github.com/moha-gh-mmad](https://github.com/moha-gh-mmad)

## Project Repository

[AI Engineering — GitHub Repository](https://github.com/moha-gh-mmad/ai-engineering)

---

_Built as a hands-on project to explore full-stack development and practical AI integration._
