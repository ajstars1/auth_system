import { NewVerifcationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";

const NewVerificationPage = () => {
    return ( 
         <Suspense fallback={<p>Loading Login Form...</p>}>
        <NewVerifcationForm />
         </Suspense>
     );
}
 
export default NewVerificationPage;