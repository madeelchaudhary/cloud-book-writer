import BookDetail from "@/components/BookDetail";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function BookPage({ params: { id } }: Props) {
  const session = await auth();

  // Fetch book with sections from Prisma
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      sections: {
        include: { subsections: true },
        orderBy: { createdAt: "asc" },
      },
    }, // Include nested sections for this book
  });

  if (!book) {
    return notFound();
  }

  const sections = book?.sections.filter((section) => !section.parentId);
  book.sections = sections;

  return <BookDetail book={book} bookId={id} userId={session?.user?.id!} />;
}
