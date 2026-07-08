import { IGetLegalDocumentsResponse } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const legalDocumentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLegalDocuments: builder.query<IGetLegalDocumentsResponse, void>({
      query: () => ({
        url: "/admin/legal-documents",
        method: "GET",
      }),
      providesTags: [tagTypes.legalDocuments],
    }),
    updateLegalDocument: builder.mutation<unknown, { params: { id: string }; body: { content: string } }>({
      query: (req) => ({
        url: `/admin/legal-documents/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.legalDocuments],
    }),
  }),
});

export const { useGetLegalDocumentsQuery, useUpdateLegalDocumentMutation } = legalDocumentsApi;

export default legalDocumentsApi;
