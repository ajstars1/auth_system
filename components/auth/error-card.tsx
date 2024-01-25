import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerlabel="⚠️ Error"
            label="Oops! Something went wrong."
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div></div>
        </CardWrapper>
     );
}
 