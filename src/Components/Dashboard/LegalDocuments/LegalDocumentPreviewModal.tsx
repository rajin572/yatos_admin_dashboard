import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { ILegalDocument } from "@/types";

interface LegalDocumentPreviewModalProps {
  open: boolean;
  onClose: () => void;
  legalDocument: ILegalDocument | null;
}

const LegalDocumentPreviewModal = ({ open, onClose, legalDocument }: LegalDocumentPreviewModalProps) => {
  return (
    <ReusableModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={legalDocument?.title ?? "Document"}
      description={`Last updated: ${legalDocument?.lastUpdatedAt} • ${legalDocument?.pageCount} pages`}
      maxWidth="sm:max-w-3xl"
      showCloseButton
      closeButtonText="Close"
    >
      <div
        className="text-sm text-base-color leading-relaxed [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-secondary-color [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: legalDocument?.content ?? "" }}
      />
    </ReusableModal>
  );
};

export default LegalDocumentPreviewModal;
