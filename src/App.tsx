import { Layout } from '@/components/layout/Layout';

function App() {
  return (
    <Layout
      sidebar={
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Welcome to Recipe Archive
          </p>
        </div>
      }
    >
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Select a recipe to get started
        </h2>
        <p className="text-muted-foreground">
          Choose a recipe from the sidebar to view its details.
        </p>
      </div>
    </Layout>
  );
}

export default App;
