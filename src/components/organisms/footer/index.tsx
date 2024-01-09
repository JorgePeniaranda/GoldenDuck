import Image from "next/image";
import styles from "./styles.module.scss";
import ExternalLinkText from "@/components/atoms/text/ExternalLinkText";
import TypewriterText from "@/components/atoms/text/TypewriterText";
import Text from "@/components/atoms/text/Text";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image
        src="/assets/img/logos/lycokat.webp"
        width={150}
        height={150}
        alt="Lycokat Logo"
      />
      <Text size={"0.8rem"}>
        <TypewriterText
          words={["Fortuna y seguridad, en un solo lugar"]}
          cursor={false}
        />
      </Text>
      <div id="SocialMedia">
        <ExternalLinkText
          href="https://www.facebook.com/profile.php?id=100081120383944"
          arialLabel="Facebook"
        >
          <Image
            src="/assets/img/logos/Facebook.webp"
            width={50}
            height={50}
            alt="Facebook logo"
          />
        </ExternalLinkText>
        <ExternalLinkText
          href="https://www.instagram.com/lycokat"
          arialLabel="Instagram"
        >
          <Image
            src="/assets/img/logos/Instagram.webp"
            width={50}
            height={50}
            alt="Instagram logo"
          />
        </ExternalLinkText>
        <ExternalLinkText href="mailto:lycokat.co@gmail.Com" arialLabel="Email">
          <Image
            src="/assets/img/logos/Mail.webp"
            width={50}
            height={50}
            alt="Email logo"
          />
        </ExternalLinkText>
        <ExternalLinkText
          href="https://www.linkedin.com/in/LycoKat"
          arialLabel="Linkedin"
        >
          <Image
            src="/assets/img/logos/Linkedin.webp"
            width={50}
            height={50}
            alt="Linkedin logo"
          />
        </ExternalLinkText>
        <ExternalLinkText
          href="https://twitter.com/lycokat"
          arialLabel="Twitter"
        >
          <Image
            src="/assets/img/logos/Twitter.webp"
            width={50}
            height={50}
            alt="Twitter logo"
          />
        </ExternalLinkText>
      </div>
      <Text tag="small" size={".6rem"} weight="300">
        Lycokat™ 2022 | Todos los derechos reservados
      </Text>
    </footer>
  );
}
