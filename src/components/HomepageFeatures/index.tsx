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
    title: "Learn with a Technical Coach",
    image: require("@site/static/img/learn-with-tech-coach.png").default,
    description: (
      <>
        We are <b>expert software developers</b> who help teams become the best
        by transferring all the necessary knowledge to improve technically.
        <br />
        <b>We are Technical Coaches</b>
      </>
    ),
  },
  {
    title: "Learn in Community",
    image: require("@site/static/img/learn-together.png").default,
    description: (
      <>
        At CodeScouts, we believe collective learning is the best way to grow as{" "}
        <b>professionals</b>. That’s why we work as a team and invite you to be
        part of our community.
      </>
    ),
  },
  {
    title: "Climb to the Top",
    image: require("@site/static/img/climb-to-the-top.png").default,
    description: (
      <>
        At CodeScouts, we help software teams increase delivery speed and
        software quality by training them in <b>Extreme Programming</b>{" "}
        practices and the principles of <b>Software Craftsmanship</b>.
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
