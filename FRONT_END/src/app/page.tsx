import Image from "next/image";
import Nav from "./components/nav-footer/nav";
import Footer from "./components/nav-footer/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-white w-full min-w-[480px] min-h-[770px] relative flex items-center justify-center">
        <Image
          className="absolute top-[calc(50.00%_-_204px)] left-[calc(50.00%_-_229px)] w-[458px] h-[446px]"
          src="/hero.png"
          alt="Group"
          width={458}
          height={446}
        />

        <section className="flex flex-col w-[200px] items-center absolute top-[645px] justify-center">
          <h1 className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-semibold text-[#0711331a] items-center justify-center text-2xl tracking-[0] leading-[normal]">
            Talk. Heal. Grow.
          </h1>

          <h1 className="text-[#071133] relative self-stretch mt-[-17px] [font-family:'Poppins',Helvetica] font-semibold text-2xl tracking-[0] leading-[normal]">
            Talk. Heal. Grow.
          </h1>

          <h1 className="text-[#0711331a] relative self-stretch mt-[-17px] [font-family:'Poppins',Helvetica] font-semibold text-2xl tracking-[0] leading-[normal]">
            Talk. Heal. Grow.
          </h1>
        </section>
      </main>
      <Footer />
    </>
  );
}
