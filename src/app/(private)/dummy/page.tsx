import { ShieldQuestionMark } from "lucide-react";
import PageHeader from "../_components/page-header";
import DummyClient from "./_components/dummy-client";

export default async function page() {
  return (
    <div className="flex flex-col gap-2">
      <PageHeader title="Dummy Page" icon={ShieldQuestionMark} />

      <DummyClient />
    </div>
  );
}
