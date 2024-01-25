import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerlabel="Oops! Something went wrong."
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-destructive"/>
            </div>
        </CardWrapper>
     );
}
 