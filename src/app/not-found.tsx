import Navbar from "@/components/organisms/navbar/base";
import Footer from "@/components/organisms/footer";
import Text from "@/components/atoms/text/Text";
import Image from "next/image";
import InternalLinkText from "@/components/atoms/text/InternalLinkText";

export default function NotFound() {
  return (
    <main>
        <Navbar/>
        <section>
            <article className="w-full h-[calc(83vh-10rem)] grid place-items-center gap-10 select-none">
                <figure className="transition hover:scale-110">
                    <InternalLinkText href='/' arialLabel='Go Home'>
                        <Image src="/assets/img/designs/404.webp" width={500} height={600} alt="404 Página no encontrada"/>
                    </InternalLinkText>
                </figure>
                <Text size={"2rem"} weight="700">Página no encontrada</Text>
            </article>
        </section>
        <footer>
            <Footer/>
        </footer>
    </main>
  )
}
