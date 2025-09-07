'use client';

import styles from "./page.module.css";
import Game from "./game";
import allbufos from "./allbufos";
import { useSearchParams } from "next/navigation";
import Intro from "./intro";
import { Suspense } from "react";

import { HoneycombWebSDK, WebVitalsInstrumentation } from '@honeycombio/opentelemetry-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';

function Content() {
  const searchParams = useSearchParams();

  let index: number = -1;
  const indexStr = searchParams.get("index");
  if (indexStr) {
    index = parseInt(indexStr);
  }

  const file = index > 0 ? allbufos[index].split(".") : null;
  const word = file ? file[0] : null;
  const type = file ? file[1] : "png";

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {!word && <Intro></Intro>}
        {word && <Game word={word} type={type} key={searchParams.get("index")}></Game>}

        <div className={styles.ctas}>
          {/* <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a> */}
        </div>
      </main>
      <footer className={styles.footer}>
        {/* <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}

export default function Home() {
  const sdk = new HoneycombWebSDK({
    apiKey: 'hcaik_01k4jvwsks42hdtyna4mks9ybmbtpj8wssf98gjjmb6wyz3h19rqy38xp2',
    serviceName: 'bufogesr',
    instrumentations: [getWebAutoInstrumentations(), new WebVitalsInstrumentation()],
  });
  sdk.start();

  return (
    <Suspense>
      <Content></Content>
    </Suspense>
  );
}
