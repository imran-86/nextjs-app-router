import HeroSection from "@/Components/Hero";


export default function Home() {
  return (
    <div className="min-h-screen  bg-zinc-50 font-sans dark:bg-black">
      
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Welcome to Research Hub
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            A comprehensive platform for researchers to share, discover, and collaborate 
            on academic papers across various disciplines.
          </p>
        </div>
      </section>
      <HeroSection></HeroSection>
    </div>
  );
}
