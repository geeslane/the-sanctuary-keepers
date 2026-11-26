import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/report-an-issue")({
  beforeLoad: () => {
    throw notFound();
  },
});
