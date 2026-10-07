import { Link } from "react-router";
import { Button } from "../ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto mt-20 max-w-md space-y-4 px-4 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-muted-foreground">We couldn't find what you were looking for.</p>
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </main>
  );
}