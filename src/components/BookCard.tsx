"use client";

import { deleteBook } from "@/actions/book.action";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book } from "@prisma/client";
import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

type Props = {
  book: Book;
  currentUserId: string | undefined;
};

export default function BookCard({ book, currentUserId }: Props) {
  const isAuthor = book.authorId === currentUserId;

  const handleDelete = async (id: string) => {
    await deleteBook(id);
  };

  return (
    <div className="border p-4 rounded-lg hover:shadow-md">
      <div className="flex justify-between items-center ">
        <Link href={`/book/${book.id}`} className="block ">
          <h2 className="text-xl font-semibold">{book.title}</h2>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isAuthor && (
              <>
                <DropdownMenuItem onSelect={() => handleDelete(book.id)}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/book/${book.id}/collaborators`}>
                    Manage Collaborators
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-gray-600">
        Updated at: {format(new Date(book.updatedAt), "PPP")}
      </p>
      <div className="mt-2">
        {isAuthor ? (
          <Badge className="bg-blue-500 text-white">Author</Badge>
        ) : (
          <Badge className="bg-green-500 text-white">Collaborator</Badge>
        )}
      </div>
    </div>
  );
}
