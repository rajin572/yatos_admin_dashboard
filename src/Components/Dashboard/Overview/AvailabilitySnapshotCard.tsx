import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";

const AvailabilitySnapshotCard = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-card border border-border rounded-xl p-5 space-y-4 flex flex-col justify-between ">
            <div className="space-y-4 ">
                <h2 className="text-sm sm:text-base font-semibold text-foreground">Availability Snapshot</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Today (Monday)</span>
                        <span className="text-sm font-medium text-foreground">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Breaks</span>
                        <span className="text-sm font-medium text-foreground">1:00 PM – 2:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Upcoming Time Off</span>
                        <Tag theme="error">None</Tag>
                    </div>
                </div>
            </div>
            <Button
                variant="secondary"
                className="w-full py-4 text-sm sm:text-base"
                onClick={() => navigate("/admin/settings/availability")}
            >
                Manage Availability
            </Button>
        </div>
    );
};

export default AvailabilitySnapshotCard;
