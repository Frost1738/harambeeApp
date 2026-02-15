import React from "react";
import ContributionsPage from "./mainContent";
import { getContributions } from "./apiServices/getFunctions";

export default async function Page() {
  const contributions = await getContributions();

  return (
    <div>
      <ContributionsPage contributions={contributions} />
    </div>
  );
}
