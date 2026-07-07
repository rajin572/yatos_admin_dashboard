import { AlertCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";

export interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  status: "warning" | "info";
  actionLabel: string;
  actionColor: string;
}

const DUMMY_DATA: ActionItem[] = [
  {
    id: "1",
    title: "5 price awaiting approval",
    subtitle: "Portfolios submitted via old settings",
    count: 5,
    status: "warning",
    actionLabel: "Review",
    actionColor: "text-orange-600",
  },
  {
    id: "2",
    title: "3 subscriptions overdue",
    subtitle: "Payment failed — billing retry at risk",
    count: 3,
    status: "warning",
    actionLabel: "View",
    actionColor: "text-red-600",
  },
];


const ActionNeededSection = () => {

  // const { data: actionNeededData } = useGetActionNeededQuery(undefined, { refetchOnMountOrArgChange: true });
  // const actionItems = actionNeededData?.data ?? undefined;
  const actionList = DUMMY_DATA;

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
      <p className="font-semibold text-base-color mb-4">ACTION NEEDED</p>

      <div className="space-y-3">
        {actionList.map((action) => (
          <div
            key={action.id}
            className="flex items-center justify-between p-4 rounded-lg bg-orange-50 border border-orange-100"
          >
            <div className="flex items-start gap-3 flex-1">
              <AlertCircle className="size-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-base-color">{action.title}</p>
                <p className="text-xs text-secondbase-color mt-0.5">{action.subtitle}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={`text-xs font-semibold shrink-0 ${action.actionColor} hover:bg-transparent`}
            >
              {action.actionLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionNeededSection;
