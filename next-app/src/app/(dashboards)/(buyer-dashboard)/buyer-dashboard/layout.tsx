
import Sidebar from "@/components/(dashboards)/BuyerSidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Sidebar></Sidebar>
      <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-[70px]">{children}</main>
    </div>
    </>
  
  );
}
