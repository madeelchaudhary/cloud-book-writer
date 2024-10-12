import CollaboratorsList from "@/components/CollaboratorsList";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

async function ManageCollaboratorsPage({ params: { id } }: Props) {
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      collaborators: { select: { id: true, email: true, createdAt: true } },
    },
  });

  if (!book) {
    return notFound();
  }

  return (
    <div>
      <CollaboratorsList book={book as any} />
    </div>
  );
}

export default ManageCollaboratorsPage;
