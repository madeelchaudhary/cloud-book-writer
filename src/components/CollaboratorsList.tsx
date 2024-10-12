"use client";

import { Book, User } from "@prisma/client";

import AddCollaboratorModal from "@/components/AddCollaboratorModal";
import CollaboratorCard from "@/components/CollaboratorCard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  book: Book & { collaborators: User[] };
};

function CollaboratorsList({ book }: Props) {
  const router = useRouter();

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <Button
          onClick={() => {
            router.back();
          }}
          variant="secondary"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">{book.title}</h1>
        <div></div>
      </header>

      <AddCollaboratorModal bookId={book.id} />

      <div className="space-y-4 mt-5">
        {book.collaborators.map((collaborator) => (
          <CollaboratorCard
            key={collaborator.id}
            bookId={book.id}
            collaborator={collaborator}
          />
        ))}
      </div>
    </div>
  );
}

export default CollaboratorsList;
