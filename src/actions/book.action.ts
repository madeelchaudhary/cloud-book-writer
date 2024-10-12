"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { CreateBookSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function createBook({ title }: z.infer<typeof CreateBookSchema>) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.book.create({
    data: {
      title,
      authorId: session?.user?.id!,
    },
  });

  return revalidatePath("/dashboard");
}

export const deleteBook = async (id: string) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) {
    throw new Error("Book not found!");
  }

  if (book.authorId !== session.user?.id) {
    throw new Error("You are not allowed to perform this action");
  }

  await prisma.book.delete({
    where: { id },
  });

  return revalidatePath("/dashboard");
};

export async function createSection({
  title,
  parentSectionId,
  bookId,
  content,
}: any) {
  await prisma.section.create({
    data: {
      title,
      bookId,
      parentId: parentSectionId || null,
      content,
    },
  });

  return revalidatePath(`/book/${bookId}`);
}

export async function updateSection({ id, title, content }: any) {
  await prisma.section.update({
    where: { id },
    data: { title, content },
  });

  return revalidatePath(`/book/${id}`);
}

export async function deleteSection(id: string) {
  await prisma.section.delete({
    where: { id },
  });

  return revalidatePath(`/book/${id}`);
}
