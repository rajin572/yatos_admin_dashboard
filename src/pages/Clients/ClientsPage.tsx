import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { Button } from "@/Components/ui/button";
import SpinLoader from "@/Components/ui/CustomUi/SpinLoader";
import ClientDetailModal from "@/Components/Dashboard/Clients/ClientDetailModal";
import { IClient } from "@/types";
import { useGetAllClientsQuery } from "@/redux/features/client/clientApi";
import { formatDate } from "@/utils/dateFormet";

const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data, isFetching } = useGetAllClientsQuery(
    {
      page: currentPage,
      limit,
      searchTerm: search.length > 0 ? search : undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  const clients = data?.data?.data ?? [];
  const total = data?.data?.meta?.total ?? 0;

  const handleViewDetails = (client: IClient) => {
    setSelectedUserId(client._id);
    setIsDetailModalOpen(true);
  };

  const columns: Column<IClient>[] = [
    {
      header: "#",
      accessorKey: "_id",
      render: (_, __, index) => (
        <span className="text-sm font-medium">
          {(currentPage - 1) * limit + index + 1}
        </span>
      ),
    },
    {
      header: "User Name",
      accessorKey: "fullName",
      render: (value: string) => (
        <span className="text-sm font-medium">{value || "-"}</span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      render: (value: string) => (
        <span className="text-sm">{value || "-"}</span>
      ),
    },
    {
      header: "Mobile",
      accessorKey: "phone",
      render: (value: string) => (
        <span className="text-sm font-medium">{value || "-"}</span>
      ),
    },
    {
      header: "Joined",
      accessorKey: "createdAt",
      render: (value: string) => (
        <span className="text-sm">{formatDate(value)}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "isBlocked",
      render: (value: boolean) => (
        <Tag theme={value ? "error" : "success"}>
          {value ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      header: "Action",
      accessorKey: "_id",
      render: (_, row) => (
        <Button
          variant="secondary"
          size="sm"
          className="text-xs py-1 h-auto"
          onClick={() => handleViewDetails(row)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <PageWraper title="Clients" description="Manage client accounts">
      <div className="flex gap-3 flex-wrap items-center justify-between">
        <ReuseSearchInput
          className="min-w-64"
          placeholder="Search..."
          setSearch={setSearch}
          setPage={setCurrentPage}
        />
      </div>

      {isFetching ? (
        <div className="py-20 flex justify-center">
          <SpinLoader />
        </div>
      ) : (
        <ReusableTable
          data={clients}
          columns={columns}
          pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          total={total}
        />
      )}

      <ClientDetailModal
        open={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedUserId(null);
        }}
        userId={selectedUserId}
      />
    </PageWraper>
  );
};

export default ClientsPage;
