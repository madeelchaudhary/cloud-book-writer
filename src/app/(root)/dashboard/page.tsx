import prisma from "@/lib/db";
import BookCard from "@/components/BookCard";
import CreateBookModal from "@/components/CreateBookModal";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  const books = await prisma.book.findMany({
    where: {
      OR: [
        { authorId: session?.user?.id },
        { collaborators: { some: { id: session?.user?.id } } },
      ],
    },
    include: {
      collaborators: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mb-4">Your Books</h1>
        <CreateBookModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            currentUserId={session?.user?.id}
          />
        ))}
      </div>
    </div>
  );
}
