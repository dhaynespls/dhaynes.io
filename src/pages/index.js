import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import PrimaryLayout from "../components/PrimaryLayout"
import SEO from "../components/SEO"
import indexStyles from "../css/Index.module.css"

export default () => {
  const { file, allMarkdownRemark } = useStaticQuery(graphql`
    query allBlogPostsPathsAndMyFace {
      file(name: { eq: "me" }) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allMarkdownRemark {
        nodes {
          frontmatter {
            path
            title
            date(formatString: "MMMM DD, YYYY")
            lede
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
    <PrimaryLayout>
      <SEO title="🏠 Home" />

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

      <h2 className={indexStyles.blag}>
        <span role="img" aria-label="pen" style={{ paddingRight: ".3em" }}>
          🖋️
        </span>
        Blog posts and other musings
      </h2>
      <hr />
      <br />

      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `repeat(1, 1fr)`,
          gridGap: `50px`,
          gridAutoRows: `minmax(100px, auto)`,
        }}
      >
        {Object.keys(allMarkdownRemark.nodes).map(node => (
          <Link
            className={indexStyles.post}
            key={node}
            to={allMarkdownRemark.nodes[node].frontmatter.path}
          >
            <div>
              <h3 style={{ margin: 0 }}>
                {allMarkdownRemark.nodes[node].frontmatter.title}
              </h3>
              <h5 style={{ margin: 0 }}>
                {allMarkdownRemark.nodes[node].frontmatter.date}
              </h5>
              <p>{allMarkdownRemark.nodes[node].frontmatter.lede}</p>
            </div>
          </Link>
        ))}
      </div>
    </PrimaryLayout>
  )
}
