import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/get-help")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", hash: "get-help" });
  },
});
