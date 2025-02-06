import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Github, Image, Twitter, Youtube } from "lucide-react";
import { signIn } from "@/lib/auth";

const features = [
  {
    icon: <Twitter className="h-10 w-10 text-white" />,
    title: "Tweet Links",
    description: "Save and organize important tweets for future reference.",
  },
  {
    icon: <Youtube className="h-10 w-10 text-white" />,
    title: "YouTube Videos",
    description: "Store links to educational videos and tutorials.",
  },
  {
    icon: <Image className="h-10 w-10 text-white" />,
    title: "Image Links",
    description: "Keep track of inspiring images and visual resources.",
  },
  {
    icon: <FileText className="h-10 w-10 text-white" />,
    title: "Notion Docs",
    description: "Link your Notion documents for easy access.",
  },
];
export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white  min-h-screen">
      <header className="py-4 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            SecondBrain
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-white"
            >
              Features
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-white">
              Pricing
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-white">
              About
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Button variant={"outline"} className="text-black">
              Log in
            </Button>
            <Button variant={"outline"} className="text-black">
              Sign up
            </Button>
          </div>
        </div>
      </header>
      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white/10 to-secondary/10">
          <div className="mx-auto text-center flex flex-col justify-center items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
              Your Digital Second Brain
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Store, organize, and access all your important links in one place.
              Never lose a valuable resource again.
            </p>
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/home" });
              }}
            >
              <Button
                type="submit"
                size="lg"
                className="text-lg px-10 bg-white text-black hover:bg-white"
              >
                Login With Github <Github className="size-10" />
              </Button>
            </form>
          </div>
        </section>
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className=" mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Store What Matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-white-foreground">
          <div className=" mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Organize Your Digital Life?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity
              with SecondBrain.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start for Free
            </Button>
          </div>
        </section>
      </main>
      <footer className="py-8 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SecondBrain. All rights reserved.
            </p>
          </div>
          <nav className="flex space-x-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-white"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
