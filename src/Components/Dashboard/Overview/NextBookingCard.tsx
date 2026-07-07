import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { Clock } from "lucide-react";

const NextBookingCard = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3 ">
                <h2 className="text-sm sm:text-base font-semibold text-foreground">Next Booking</h2>

                <div className=" bg-base-color/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <Tag theme="purple">Pending</Tag>
                        <span className="text-base sm:text-lg font-bold text-foreground">£130</span>
                    </div>

                    <div className="space-y-1">
                        <p className="text-base sm:text-lg font-bold text-foreground">Full Head Highlights</p>
                        <p className="text-sm text-muted-foreground">Emma Watson</p>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                            <Clock className="size-3.5 shrink-0" />
                            <span>Mon, 12 Feb 2026 at 10:00 AM</span>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                variant="secondary"
                className="w-full py-4 text-sm sm:text-base"
                onClick={() => navigate("/admin/bookings/pending")}
            >
                View booking
            </Button>
        </div>
    );
};

export default NextBookingCard;
