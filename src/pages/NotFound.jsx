const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-base-100">
            <h1 className="text-6xl font-bold text-error">404</h1>
            <p className="mt-4 text-xl text-base-content">Page Not Found</p>
            <a href="/" className="mt-6 text-primary hover:underline">
                Go back to Home
            </a>
        </div>
    );
};

export default NotFound;
