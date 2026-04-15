import { Filter, ResumeCards } from "../components/DashboardComp";

export default function Dashboard() {
  return (
    <>
      <section className="p-5 space-y-5">
        <Filter />
        <ResumeCards />
      </section>
    </>
  );
}
