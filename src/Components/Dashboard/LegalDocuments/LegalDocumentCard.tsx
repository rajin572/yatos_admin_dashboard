import { Eye, Pencil } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { ILegalDocument } from "@/types";

interface LegalDocumentCardProps {
  document: ILegalDocument;
  onPreview: (document: ILegalDocument) => void;
  onEdit: (document: ILegalDocument) => void;
}

const LegalDocumentCard = ({ document, onPreview, onEdit }: LegalDocumentCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5">
      <h2 className="text-base font-semibold text-base-color">{document.title}</h2>
      <p className="text-sm text-secondbase-color mt-1">
        Last updated: {document.lastUpdatedAt} • {document.pageCount} pages
      </p>

      <div className="flex items-center gap-3 mt-4">
        <Button variant="outline" className="flex-1" onClick={() => onPreview(document)}>
          <Eye className="size-4" />
          Preview
        </Button>
        <Button variant="secondary" className="flex-1" onClick={() => onEdit(document)}>
          <Pencil className="size-4" />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default LegalDocumentCard;
