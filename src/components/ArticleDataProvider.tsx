import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Article = Tables<"articles">;
export type TeamMember = Tables<"team_members">;
type MinistryData = { articles: Article[]; members: TeamMember[]; loading: boolean };
const DataContext = createContext<MinistryData | null>(null);

export function ArticleDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MinistryData>({ articles: [], members: [], loading: true });

  useEffect(() => {
    let active = true;
    Promise.all([
      supabase.from("articles").select("*").eq("published", true).order("published_at", { ascending: false }),
      supabase.from("team_members").select("*").eq("visible", true).order("sort_order", { ascending: true }),
    ]).then(([articlesResult, membersResult]) => {
      if (!active) return;
      setData({ articles: articlesResult.data ?? [], members: membersResult.data ?? [], loading: false });
    }).catch(() => {
      if (active) setData({ articles: [], members: [], loading: false });
    });
    return () => { active = false; };
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useMinistryData() {
  return useContext(DataContext) ?? { articles: [], members: [], loading: true };
}
