import Footer from "@/layouts/footer";
import Navbar from "@/layouts/navbar";

export default function Common({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
