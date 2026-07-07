import { AvatarImage, AvatarFallback, Avatar } from "@/Components/ui/avatar";

export interface TopStylist {
  id: string;
  initials: string;
  name: string;
  bookings: number;
  avatar?: string;
}

const DUMMY_DATA: TopStylist[] = [
  { id: "1", initials: "JB", name: "Julia Bishen", bookings: 48, avatar: "" },
  { id: "2", initials: "ZA", name: "Zainah Akmyem", bookings: 31, avatar: "" },
  { id: "3", initials: "KC", name: "Karafin Osei", bookings: 19, avatar: "" },
];


const TopStylistsTable = () => {

  // const { data: topStylistsData } = useGetTopStylistsQuery(undefined, { refetchOnMountOrArgChange: true });
  // const topStylists = topStylistsData?.data ?? undefined;
  const tableData = DUMMY_DATA;

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
      <div className="mb-4">
        <p className="font-semibold text-base-color">TOP STYLISTS - APRIL</p>
      </div>

      <div className="space-y-3">
        {tableData.map((stylist) => (
          <div key={stylist.id} className="flex items-center justify-between py-2 px-3 hover:bg-muted rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={stylist.avatar} alt={stylist.name} />
                <AvatarFallback className="bg-purple-600 text-white text-xs font-semibold">
                  {stylist.initials}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium text-base-color">{stylist.name}</p>
            </div>
            <p className="text-sm font-semibold text-base-color">{stylist.bookings} bookings</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStylistsTable;
