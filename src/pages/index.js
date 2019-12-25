import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import PrimaryLayout from "../components/PrimaryLayout"
import SEO from "../components/SEO"
import indexStyles from "../css/Index.module.css"

export default () => {
  const { file } = useStaticQuery(graphql`
    query MyFace {
      file(name: { eq: "me" }) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const socialLinks = {
    letterboxd: "https://letterboxd.com/dhaynes/",
    rym: "https://rateyourmusic.com/~dhaynes",
    twitter: "https://twitter.com/dhaynespls/",
    discogs: "https://www.discogs.com/user/dhaynes/collection",
    linkedin: "https://www.linkedin.com/in/dhaynes207/",
  }

  return (
    <>
      <SEO title="🏠 Home" />

      <PrimaryLayout>
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(2, 1fr)`,
            gridGap: `50px`,
            gridAutoRows: `minmax(100px, auto)`,
          }}
        >
          <Img fluid={file.childImageSharp.fluid} className={indexStyles.me} />

          <div
            style={{
              gridColumn: 2,
              gridRow: 1,
            }}
          >
            <h1>David Haynes</h1>
            <div className={indexStyles.socials}>
              {Object.keys(socialLinks).map(key => (
                <a key={key} href={socialLinks[key]}>
                  <h3>{key}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </PrimaryLayout>
    </>
  )
}
