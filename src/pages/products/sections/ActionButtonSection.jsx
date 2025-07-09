import {
    ToggleGroup,
    ToggleGroupItem,
} from "../../../components/ui/toggle-group";

export const ActionButtonSection = () => {
    const timeOptions = [
        { value: "1d", label: "1d" },
        { value: "7d", label: "7d" },
        { value: "1m", label: "1m" },
        { value: "3m", label: "3m" },
        { value: "6m", label: "6m" },
        { value: "1y", label: "1y" },
        { value: "3y", label: "3y" },
        { value: "5y", label: "5y" },
    ];

    return (
        <div className="flex justify-center mt-24">
            <ToggleGroup
                type="single"
                defaultValue="7d"
                className="shadow-shadow-xs rounded-lg overflow-hidden border border-solid border-gray-300"
            >
                {timeOptions.map((option, index) => (
                    <ToggleGroupItem
                        key={option.value}
                        value={option.value}
                        className={`px-4 py-2.5 h-10 font-medium text-sm [font-family:'Inter',Helvetica] ${
                            option.value === "7d"
                                ? "bg-gray-50 text-gray-800"
                                : "bg-basewhite text-gray-700"
                        } ${
                            index === 0
                                ? "rounded-l-lg rounded-r-none"
                                : index === timeOptions.length - 1
                                    ? "rounded-r-lg rounded-l-none"
                                    : "rounded-none"
                        } border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
                        aria-label={`Toggle ${option.label}`}
                    >
                        {option.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
};