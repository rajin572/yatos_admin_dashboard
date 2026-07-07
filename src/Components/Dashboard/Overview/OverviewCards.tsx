import { PoundSterling, CalendarDays, Clock, MessageSquare } from "lucide-react";

interface StatCard {
    id: number;
    name: string;
    icon: React.ReactNode;
    count: string | number;
}

const statCards: StatCard[] = [
    {
        id: 1,
        name: "Earnings",
        icon: <PoundSterling className="size-5 text-secondary-color" />,
        count: "£1,850",
    },
    {
        id: 2,
        name: "Upcoming Bookings",
        icon: <CalendarDays className="size-5 text-secondary-color" />,
        count: 2,
    },
    {
        id: 3,
        name: "Availability Today",
        icon: <Clock className="size-5 text-secondary-color" />,
        count: "Open",
    },
    {
        id: 4,
        name: "Unread Messages",
        icon: <MessageSquare className="size-5 text-secondary-color" />,
        count: 3,
    },
];

const OverviewCards = () => {
    return (
        <div className="flex flex-row flex-wrap gap-1 lg:gap-3">
            {statCards.map((card) => (
                <div
                    key={card.id}
                    className="flex rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-6 bg-primary-color"
                >
                    <div className="w-full">
                        <div className="flex items-center justify-between w-full">
                            <p className="text-sm sm:text-base lg:text-lg font-semibold mb-1 tracking-tight w-full text-nowrap">
                                {card.name}
                            </p>
                            <p>{card.icon}</p>
                        </div>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold capitalize tracking-wider">
                            {card.count}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OverviewCards;
