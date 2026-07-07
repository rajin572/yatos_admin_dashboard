import { useEffect, useState } from "react";
import { CheckCircle2, Download, FileText, XCircle } from "lucide-react";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Textarea } from "@/Components/ui/textarea";
import { IVerificationDocument } from "@/types";

interface DocumentVerificationModalProps {
  open: boolean;
  onClose: () => void;
  document: IVerificationDocument | null;
  onApprove: (document: IVerificationDocument, notes: string) => void;
  onReject: (document: IVerificationDocument, notes: string) => void;
}

const CHECKLIST_ITEMS = [
  { label: "Document is clear and legible", defaultChecked: true },
  { label: "Information matches owner profile", defaultChecked: false },
  { label: "Document is current and not expired", defaultChecked: true },
  { label: "All required fields are present", defaultChecked: true },
  { label: "No signs of tampering or forgery", defaultChecked: true },
];

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-secondbase-color">{label}</p>
    <p className="text-sm font-medium text-base-color mt-0.5">{value}</p>
  </div>
);

const DocumentVerificationModal = ({
  open,
  onClose,
  document,
  onApprove,
  onReject,
}: DocumentVerificationModalProps) => {
  const [checked, setChecked] = useState(CHECKLIST_ITEMS.map((item) => item.defaultChecked));
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setChecked(CHECKLIST_ITEMS.map((item) => item.defaultChecked));
      setNotes("");
    }
  }, [open]);

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Document Verification"
      description="Review and verify owner documentation"
      maxWidth="sm:max-w-lg"
      footer={
        document && (
          <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/90 text-white"
              onClick={() => onReject(document, notes)}
            >
              <XCircle className="size-4" />
              Reject
            </Button>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => onApprove(document, notes)}
            >
              <CheckCircle2 className="size-4" />
              Approve
            </Button>
          </div>
        )
      }
    >
      {document && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg bg-background-color p-4">
            <InfoField label="Owner Name" value={document.ownerName} />
            <InfoField label="Business Name" value={document.businessName} />
            <InfoField label="Document Type" value={document.documentType} />
            <InfoField label="Submitted Date" value={document.submittedAt} />
          </div>

          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border py-10">
            <FileText className="size-10 text-muted-foreground" />
            <p className="text-sm text-secondbase-color">Document Preview Area</p>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              Download Document
            </Button>
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Verification Checklist</p>
            <div className="space-y-2">
              {CHECKLIST_ITEMS.map((item, index) => (
                <label key={item.label} className="flex items-center gap-2 text-sm text-base-color cursor-pointer">
                  <Checkbox
                    checked={checked[index]}
                    onCheckedChange={(value) =>
                      setChecked((prev) => prev.map((c, i) => (i === index ? Boolean(value) : c)))
                    }
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-base-color mb-2">Review Notes</p>
            <Textarea
              className="border-base-color/30 bg-primary-color"
              placeholder="Add any notes or comments about this verification..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default DocumentVerificationModal;
