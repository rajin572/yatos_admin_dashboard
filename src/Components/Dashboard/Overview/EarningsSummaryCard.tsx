const earningsRows = [
    { label: "Today", value: "£130" },
    { label: "This Week", value: "£620" },
    { label: "This Month", value: "£1,850" },
];

const EarningsSummaryCard = () => {

    return (
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div>
                <h2 className="text-sm sm:text-base font-semibold text-foreground">Earnings Summary</h2>
                <div className="space-y-3">
                    {earningsRows.map((row) => (
                        <div
                            key={row.label}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                            <span className="text-sm text-muted-foreground">{row.label}</span>
                            <span className="text-sm font-semibold text-foreground">{row.value}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default EarningsSummaryCard;
