import { useMemo, useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import "jodit/es5/jodit.min.css";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { ILegalDocument } from "@/types";

interface LegalDocumentEditorModalProps {
  open: boolean;
  onClose: () => void;
  legalDocument: ILegalDocument | null;
  onSave: (content: string) => void;
}

const LegalDocumentEditorModal = ({ open, onClose, legalDocument, onSave }: LegalDocumentEditorModalProps) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (open) setContent(legalDocument?.content ?? "");
  }, [open, legalDocument]);

  const config = useMemo(
    () => ({
      readonly: false,
      toolbarAdaptive: false,
      toolbarButtonSize: "middle" as const,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      showPoweredByJodit: false,
      height: 420,
      buttons: [
        "paragraph",
        "font",
        "|",
        "bold",
        "italic",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "left",
        "center",
        "right",
        "|",
        "source",
        "link",
      ],
    }),
    []
  );

  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={`Edit ${legalDocument?.title ?? "Document"}`}
      maxWidth="sm:max-w-3xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="secondary" onClick={() => onSave(content)}>
            Save Change
          </Button>
        </div>
      }
    >
      <JoditEditor ref={editorRef} value={content} config={config} onBlur={(value) => setContent(value)} />
    </ReusableModal>
  );
};

export default LegalDocumentEditorModal;
