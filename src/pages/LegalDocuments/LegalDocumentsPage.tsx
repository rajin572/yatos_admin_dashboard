import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import LegalDocumentCard from "@/Components/Dashboard/LegalDocuments/LegalDocumentCard";
import LegalDocumentEditorModal from "@/Components/Dashboard/LegalDocuments/LegalDocumentEditorModal";
import LegalDocumentPreviewModal from "@/Components/Dashboard/LegalDocuments/LegalDocumentPreviewModal";
import { ILegalDocument } from "@/types";
// import { useGetLegalDocumentsQuery, useUpdateLegalDocumentMutation } from "@/redux/features/legalDocuments/legalDocumentsApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real legal-documents API data once the endpoint exists.
const DUMMY_LEGAL_DOCUMENTS: ILegalDocument[] = [
  {
    _id: "1",
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: "<h1>Privacy Policy</h1><p>This Privacy Policy describes how Yatos collects, uses, and protects your information.</p>",
    pageCount: 8,
    lastUpdatedAt: "2026-01-15",
  },
  {
    _id: "2",
    slug: "terms-of-service",
    title: "Terms of Service",
    content: "<h1>Terms of Service</h1><p>These Terms of Service govern your use of the Yatos platform.</p>",
    pageCount: 12,
    lastUpdatedAt: "2026-01-15",
  },
];

const LegalDocumentsPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<ILegalDocument | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // const { data } = useGetLegalDocumentsQuery();
  // const documents = data?.data ?? [];
  const documents = DUMMY_LEGAL_DOCUMENTS;

  // const [updateLegalDocument] = useUpdateLegalDocumentMutation();
  const handleSave = async (_content: string) => {
    // const res = await tryCatchWrapper(
    //   updateLegalDocument,
    //   { params: { id: selectedDocument?._id }, body: { content: _content } },
    //   { toastLoadingMessage: "Saving changes..." }
    // );
    // if (res?.success) {
    setIsEditorOpen(false);
    // }
  };

  return (
    <PageWraper title="Legal Documents" description="Manage Privacy Policy and  Terms & Conditions">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((document) => (
          <LegalDocumentCard
            key={document._id}
            document={document}
            onPreview={(doc) => {
              setSelectedDocument(doc);
              setIsPreviewOpen(true);
            }}
            onEdit={(doc) => {
              setSelectedDocument(doc);
              setIsEditorOpen(true);
            }}
          />
        ))}
      </div>

      <LegalDocumentPreviewModal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        legalDocument={selectedDocument}
      />

      <LegalDocumentEditorModal
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        legalDocument={selectedDocument}
        onSave={handleSave}
      />
    </PageWraper>
  );
};

export default LegalDocumentsPage;
