import { Construction } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export const UnderDevelopmentPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="max-w-md p-8 text-center">
                <div className="flex justify-center mb-6">
                    <Construction className="w-16 h-16 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Under Construction</h2>
                <p className="text-gray-600 mb-6">
                    We're working hard to bring you this feature soon. Please check back later!
                </p>
                <Button
                    onClick={() => navigate(-1)}
                    className="bg-[#6840c6] hover:bg-[#5c3aa8] text-white"
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
};