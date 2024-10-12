"use client";

import { deleteSection } from "@/actions/book.action";
import AddSectionModal from "@/components/AddSectionModal";
import EditSectionModal from "@/components/EditSectionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Section as SectionType } from "@prisma/client";
import { EllipsisVertical } from "lucide-react";

type Props = {
  section: SectionType & { subsections?: SectionType[] };
  bookId: string;
  userId: string;
  authorId: string;
};

function Section({ section, bookId, userId, authorId }: Props) {
  const handleDeleteSection = async () => {
    await deleteSection(section.id);
  };

  return (
    <div className="border p-4 rounded-lg mt-4">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{section.title}</h2>

        {/* Options for editing/deleting the section */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <EditSectionModal section={section} bookId={bookId} />
            </DropdownMenuItem>

            {authorId === userId && (
              <DropdownMenuItem onSelect={handleDeleteSection}>
                Delete Section
              </DropdownMenuItem>
            )}
            {authorId === userId && (
              <DropdownMenuItem asChild>
                <AddSectionModal
                  parentSectionId={section.id}
                  bookId={bookId}
                  isSubsection
                />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Recursively render subsections */}
      {section.subsections && (
        <div className="ml-6 mt-2">
          {section.subsections.map((subsection) => (
            <Section
              key={subsection.id}
              userId={userId}
              section={subsection}
              bookId={bookId}
              authorId={authorId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;
