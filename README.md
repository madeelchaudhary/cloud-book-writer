# Cloud Book Writer Platform

## Overview

This project is a cloud-based book-writing platform built with Next.js, Prisma, and Shadcn-UI. The platform allows users to create, edit, and manage books with an unlimited number of sections and subsections. Users can collaborate on books by adding collaborators with roles like author or collaborator. The app also implements role-based permissions, where only the author can add sections, and both authors and collaborators can edit them.

## Core Features

- **Unlimited Sections and Subsections**: Users can create an unlimited number of nested sections within their books.
- **User Authentication**: Secure authentication using the `authjs` package.
- **Permissions & Roles**: Authors can manage books, sections, and collaborators. Collaborators can edit but not create new sections.
- **Collaborator Management**: Authors can add, edit, or remove collaborators from a book.
- **Server Actions**: All interactions (adding, editing, deleting sections/collaborators) are handled through server actions for a smooth user experience.

## Tech Stack

- **Next.js**: Framework for React, allowing server-side rendering and server components.
- **Prisma**: ORM for interacting with the database.
- **Shadcn-UI**: UI components for a responsive and beautiful interface.
- **authjs**: User authentication package used for secure login and registration.
- **yarn**: Package manager used for this project.

## Setup Instructions

### Prerequisites

- **Node.js** (v20 or higher)
- **yarn** (v1.22.22 or higher)
- **PostgreSQL** (or another supported database)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/cloud-book-writer-platform.git
   cd cloud-book-writer-platform
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Configure the environment**:
   Create a .env file at the root of the project and add the following:

   ```env
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<dbname>
   JWT_SECRET=<secret>
   ```

4. **Set up the database**:
   Migrate the database using Prisma:

   ```bash
   pnpm prisma migrate dev
   ```

5. **Run the development server**:
   ```bash
   pnpm dev
   ```
