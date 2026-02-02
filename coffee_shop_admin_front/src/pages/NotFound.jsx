function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-yellow-500">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
      <a href="/home" className="mt-4 text-blue-500 hover:underline">
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
