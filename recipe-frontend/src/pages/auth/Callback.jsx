import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthCallbackPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            // Store the token in localStorage
            localStorage.setItem("token", token);

            // Show success alert
            alert("Login successful: You have been successfully logged in with Google.");

            // Redirect to dashboard
            navigate("/dashboard");
        } else {
            // Show error alert
            alert("Authentication failed: There was a problem with Google authentication.");

            // Redirect to login page
            navigate("/login");
        }
    }, [navigate, searchParams]);

    return (
        <div className="container mx-auto flex h-[calc(100vh-14rem)] items-center justify-center">
            <div className="text-center">
                <h1 className="mb-4 text-2xl font-bold">Processing authentication...</h1>
                <p className="text-muted-foreground">Please wait while we complete your login.</p>
            </div>
        </div>
    );
}

export default AuthCallbackPage;