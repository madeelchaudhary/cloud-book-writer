import { removeCollaborator } from "@/actions/collaborator.action";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { format } from "date-fns";

type Props = {
  collaborator: User;
  bookId: string;
};

function CollaboratorCard({ collaborator, bookId }: Props) {
  const handleRemoveCollaborator = async (collaboratorId: string) => {
    await removeCollaborator(collaboratorId, bookId);
  };

  return (
    <div className="border p-4 rounded-lg flex justify-between items-center">
      <div>
        <p className="font-semibold">{collaborator.email}</p>
        <p className="text-gray-500">{format(collaborator.createdAt, "PPP")}</p>
      </div>
      <div className="space-x-2">
        <Button
          onClick={() => handleRemoveCollaborator(collaborator.id)}
          variant="destructive"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default CollaboratorCard;
