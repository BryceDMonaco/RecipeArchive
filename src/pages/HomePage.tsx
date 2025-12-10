export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to Recipe Archive</h2>
      <p className="text-gray-600 max-w-md">
        Select a recipe from the sidebar to get started, or use the search and
        filter features to find exactly what you're looking for.
      </p>
    </div>
  );
}
