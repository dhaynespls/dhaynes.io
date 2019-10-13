import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import PrimaryLayout from "../components/PrimaryLayout"
import SEO from "../components/seo"

import styles from "../css/index.module.css"

const socialLinks = {
  letterboxd: "https://letterboxd.com/dhaynes/",
  rym: "https://rateyourmusic.com/~dhaynes",
  twitter: "https://twitter.com/dhaynespls/",
  discogs: "https://www.discogs.com/user/dhaynes/collection",
  linkedin: "https://www.linkedin.com/in/dhaynes207/",
}

export default ({ data }) => (
  <>
    <SEO title="Home" />

    <PrimaryLayout>
      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `repeat(2, 1fr)`,
          gridGap: `50px`,
          gridAutoRows: `minmax(100px, auto)`,
        }}
      >
        <Img fluid={data.file.childImageSharp.fluid} className={styles.me} />

        <div
          style={{
            gridColumn: 2,
            gridRow: 1,
          }}
        >
          <h1>David Haynes</h1>
          <div className={styles.socials}>
            {Object.keys(socialLinks).map(key => (
              <a href={socialLinks[key]} target="_">
                <h3>{key}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </PrimaryLayout>
  </>
)

export const query = graphql`
  query {
    file(name: { eq: "me" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
