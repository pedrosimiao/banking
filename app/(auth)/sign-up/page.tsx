import AuthForm from "@/components/AuthForm";
import React from "react";

// import { getLoggedInUser } from "@/lib/actions/user.actions";

const SignUp = async () => {
// const loggedInUser = await getLoggedInUser();
// console.log(loggedInUser) ***Teste***

    return (
        <section className="bg-auth-sign-up flex-center size-full max-sm:px-6">
            <AuthForm type="sign-up" />
        </section>
    );
}

export default SignUp;