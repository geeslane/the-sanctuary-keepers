import { createFileRoute, Link } from "@tanstack/react-router";
import { useMinistryData } from "@/components/ArticleDataProvider";
import { EmptyState, PageHeader, PostSkeletons, TeamCard } from "@/components/MinistryUI";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/management")({
  head: () => pageMeta("Management", "Management profiles of The Sanctuary Keepers."),
  component: ManagementPage,
});

function ManagementPage() {
  const { members, loading } = useMinistryData();
  return (
    <div className="page-enter">
      <PageHeader title="Management" />
      <section className="content-band">
        <div className="container">
          {loading ? <PostSkeletons /> : members.length === 0 ? (
            <EmptyState>Management profiles will be published soon.</EmptyState>
          ) : (
            <div className="team-grid">{members.map((member) => <TeamCard key={member.id} member={member} />)}</div>
          )}
          <p className="content-note">To reach our President, see the <Link to="/contact" className="inline-link">Contact page</Link>.</p>
        </div>
      </section>
    </div>
  );
}
