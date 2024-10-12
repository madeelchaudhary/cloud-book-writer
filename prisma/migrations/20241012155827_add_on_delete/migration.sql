-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_parentId_fkey";

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
