import AuthNavbar from "@/components/AuthNavbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthNavbar />
      {children}
    </div>
  );
}
