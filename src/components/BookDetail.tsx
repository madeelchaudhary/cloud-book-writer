"use client";

import { Book, Section as SectionType } from "@prisma/client";
import { ArrowLeft } from "lucide-react";

import AddSectionModal from "@/components/AddSectionModal";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  book: Book & { sections: (SectionType & { subsections: SectionType[] })[] };
  bookId: string;
  userId: string;
};

const BookDetail = ({ book, bookId, userId }: Props) => {
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

      {/* Add New Section Modal */}
      {userId === bookId && (
        <AddSectionModal parentSectionId={undefined} bookId={bookId} />
      )}

      {/* Render sections */}
      <div>
        {book.sections.map((section) => (
          <Section
            key={section.id}
            userId={userId}
            section={section}
            bookId={bookId}
            authorId={book.authorId}
          />
        ))}
      </div>
    </div>
  );
};

export default BookDetail;
