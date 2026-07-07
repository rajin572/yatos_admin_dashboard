import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Download, RotateCcw } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import RevenueAreaChart from "@/Components/Charts/RevenueAreaChart";
import PaymentStatCards from "@/Components/Dashboard/Payments/PaymentStatCards";
import ProcessRefundModal from "@/Components/Dashboard/Payments/ProcessRefundModal";
import { ITransaction } from "@/types";
import { getAvatar } from "@/utils/getAvatar";
// import { useGetTransactionsQuery, useProcessRefundMutation, useRetryPaymentMutation } from "@/redux/features/payment/paymentApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real transactions API data once the endpoint exists.
const DUMMY_TRANSACTIONS: ITransaction[] = [
  { _id: "1", transactionCode: "TXN-89234", type: "payment", amount: 12500, customerName: "John Smith", ownerName: "Marina Elite Ltd", bookingCode: "BK-10234", paymentMethod: "Visa •••• 4242", date: "2026-05-16 10:30 AM", status: "completed" },
  { _id: "2", transactionCode: "TXN-89233", type: "payout", amount: 10825, customerName: "Platform", ownerName: "Sky Charter Services", bookingCode: "BK-10233", paymentMethod: "Bank Transfer", date: "2026-05-16 09:15 AM", status: "pending" },
  { _id: "3", transactionCode: "TXN-89232", type: "payment", amount: 3200, customerName: "Michael Chen", ownerName: "Premium Motors", bookingCode: "BK-10232", paymentMethod: "Mastercard •••• 5555", date: "2026-05-14 04:20 PM", status: "completed" },
  { _id: "4", transactionCode: "TXN-89231", type: "refund", amount: 2800, customerName: "David Wilson", ownerName: "Platform", bookingCode: "BK-10230", paymentMethod: "Amex •••• 1234", date: "2026-05-12 02:45 PM", status: "completed" },
  { _id: "5", transactionCode: "TXN-89230", type: "payment", amount: 45000, customerName: "Sarah Johnson", ownerName: "Private Aviation", bookingCode: "BK-10229", paymentMethod: "Visa •••• 6789", date: "2026-05-11 11:30 AM", status: "failed" },
];

const REVENUE_FLOW_DATA = [
  { month: "May 1", Revenue: 35000 },
  { month: "May 3", Revenue: 42000 },
  { month: "May 5", Revenue: 38000 },
  { month: "May 7", Revenue: 61000 },
  { month: "May 9", Revenue: 47000 },
  { month: "May 11", Revenue: 58000 },
  { month: "May 13", Revenue: 52000 },
];

const TYPE_OPTIONS: FilterOption[] = [
  { label: "All Types", value: "all" },
  { label: "Payment", value: "payment" },
  { label: "Payout", value: "payout" },
  { label: "Refund", value: "refund" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Status", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

const typeIcon: Record<ITransaction["type"], React.ComponentType<{ className?: string }>> = {
  payment: ArrowDownLeft,
  payout: ArrowUpRight,
  refund: RotateCcw,
};

const statusBadgeClass: Record<ITransaction["status"], string> = {
  completed: "bg-green-500 text-white",
  pending: "bg-amber-500 text-white",
  failed: "bg-red-500 text-white",
};

const PaymentsPayoutsPage = () => {
  const [, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // const { data } = useGetTransactionsQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     type: typeFilter === "all" ? undefined : typeFilter,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const transactions = data?.data?.data ?? [];
  // const total = data?.data?.meta?.total ?? 0;
  const transactions = DUMMY_TRANSACTIONS;
  const total = DUMMY_TRANSACTIONS.length;

  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  // const [processRefund] = useProcessRefundMutation();
  // const [retryPayment] = useRetryPaymentMutation();

  const handleProcessRefund = async (_transaction: ITransaction, _reason: string) => {
    // const res = await tryCatchWrapper(
    //   processRefund,
    //   { params: { id: _transaction._id }, body: { reason: _reason } },
    //   { toastLoadingMessage: "Processing refund..." }
    // );
    // if (res?.success) {
    setIsRefundOpen(false);
    // }
  };

  const handleRetry = async (_transaction: ITransaction) => {
    // await tryCatchWrapper(
    //   retryPayment,
    //   { params: { id: _transaction._id } },
    //   { toastLoadingMessage: "Retrying payment..." }
    // );
  };

  const handleExport = () => {
    const header = ["Transaction ID", "Type", "Amount", "Customer", "Owner/Recipient", "Booking", "Payment Method", "Date", "Status"];
    const rows = transactions.map((t) => [
      t.transactionCode,
      t.type,
      t.amount,
      t.customerName,
      t.ownerName,
      t.bookingCode,
      t.paymentMethod,
      t.date,
      t.status,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<ITransaction>[] = [
    { header: "Transaction ID", accessorKey: "transactionCode" },
    {
      header: "Type",
      accessorKey: "type",
      render: (value: ITransaction["type"]) => {
        const Icon = typeIcon[value];
        return (
          <span className="flex items-center gap-1.5 text-sm capitalize">
            <Icon className="size-3.5 text-secondbase-color" />
            {value}
          </span>
        );
      },
    },
    {
      header: "Amount",
      accessorKey: "amount",
      render: (value: number) => <span className="text-sm font-semibold text-base-color">${value.toLocaleString()}</span>,
    },
    {
      header: "Customer",
      accessorKey: "customerName",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarFallback className="bg-secondary-color text-white text-xs font-semibold">{getAvatar(value)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    { header: "Owner/Recipient", accessorKey: "ownerName" },
    {
      header: "Booking",
      accessorKey: "bookingCode",
      render: (value: string) => <span className="text-sm text-secondary-color">{value}</span>,
    },
    { header: "Payment Method", accessorKey: "paymentMethod" },
    { header: "Date", accessorKey: "date" },
    {
      header: "Status",
      accessorKey: "status",
      render: (value: ITransaction["status"]) => (
        <Tag theme="success" className={statusBadgeClass[value]}>
          {value}
        </Tag>
      ),
    },
    {
      header: "Actions",
      accessorKey: "_id",
      render: (_, row) => {
        if (row.status === "failed") {
          return (
            <button type="button" className="text-sm font-medium text-secondary-color cursor-pointer" onClick={() => handleRetry(row)}>
              Retry
            </button>
          );
        }
        if (row.type === "payment" && row.status === "completed") {
          return (
            <button
              type="button"
              className="text-sm font-medium text-secondary-color cursor-pointer"
              onClick={() => {
                setSelectedTransaction(row);
                setIsRefundOpen(true);
              }}
            >
              Refund
            </button>
          );
        }
        return <span className="text-sm text-muted-foreground">—</span>;
      },
    },
  ];

  return (
    <PageWraper
      title="Payments & Payouts"
      description="Monitor transactions, escrow, and financial operations"
      actions={
        <Button variant="outline" onClick={handleExport}>
          <Download className="size-4" />
          Export
        </Button>
      }
    >
      <PaymentStatCards />

      <div className="bg-white rounded-xl border border-border shadow-sm p-5">
        <h2 className="text-base font-semibold text-base-color">Revenue & Payout Flow</h2>
        <p className="text-sm text-secondbase-color mb-2">Daily transaction volume</p>
        <RevenueAreaChart data={REVENUE_FLOW_DATA} color="#1e3a8a" />
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 pb-4">
          <h2 className="text-base font-semibold text-base-color">Transaction History</h2>
          <div className="flex flex-wrap items-center gap-3">
            <ReuseSearchInput className="min-w-56" placeholder="Search transactions..." setSearch={setSearch} setPage={setCurrentPage} />
            <ReuseFilterSelect
              options={TYPE_OPTIONS}
              value={typeFilter}
              onChange={(value) => {
                setTypeFilter(value);
                setCurrentPage(1);
              }}
              placeholder="All Types"
            />
            <ReuseFilterSelect
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
              placeholder="All Status"
            />
          </div>
        </div>

        <ReusableTable
          data={transactions}
          columns={columns}
          pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          total={total}
        />
      </div>

      <ProcessRefundModal
        open={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
        transaction={selectedTransaction}
        onConfirm={handleProcessRefund}
      />
    </PageWraper>
  );
};

export default PaymentsPayoutsPage;
