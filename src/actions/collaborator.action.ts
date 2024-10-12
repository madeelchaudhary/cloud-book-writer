"use server";

import prisma from "@/lib/db";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function addCollaborator({ email, password, bookId }: any) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { collaborations: { select: { id: true } } },
  });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        collaborations: { connect: { id: bookId } },
      },
    });
  } else {
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        collaborations: { connect: { id: bookId } },
      },
    });
  }

  return revalidatePath(`/book/${bookId}/collaborators`);
}

export async function removeCollaborator(
  collaboratorId: string,
  bookId: string
) {
  await prisma.user.update({
    where: { id: collaboratorId },
    data: { collaborations: { disconnect: { id: bookId } } },
  });

  return revalidatePath(`/book/${bookId}/collaborators`);
}
