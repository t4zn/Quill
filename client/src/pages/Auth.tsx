import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";

export default function Auth() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-16">
        <div className="w-full max-w-md px-4">
          <AuthForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
