import Header from "@/components/header";
import Stepper from "@/components/stepper";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Stepper />
      <main className="max-w-[1440px] mx-auto py-[120px] px-4">{children}</main>
    </div>
  );
}
