import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Aprende con un technical coach",
    image: require("@site/static/img/learn-with-tech-coach.png").default,
    description: (
      <>
        Somos <b>desarrolladores de software expertos</b> que ayudamos a equipos
        a ser los mejores, transmitimos todos los conocimientos necesarios para
        que mejoren técnicamente.
        <br />
        <b>Somos Technical Coaches</b>
      </>
    ),
  },
  {
    title: "Aprende en comunidad",
    image: require("@site/static/img/learn-together.png").default,
    description: (
      <>
        En CodeScouts creemos que el aprendizaje colectivo es el mejor camino
        para crecer como <b>profesionales</b>. Por eso trabajamos en equipo, te
        invitamos a que pueda formar parte de nuestra comunidad.
      </>
    ),
  },
  {
    title: "Escala hasta la cima",
    image: require("@site/static/img/climb-to-the-top.png").default,
    description: (
      <>
        En CodeScouts ayudamos a los equipos de software a aumentar la velocidad
        de entrega y la calidad del software, formándoles en las prácticas de
        <b> Extreme Programming </b>y la los principios de
        <b> Software Craftsmanship</b>
      </>
    ),
  },
];

const Feature = ({ title, image, description }: FeatureItem) => {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
