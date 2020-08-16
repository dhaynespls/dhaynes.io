import React from "react"
import { graphql, Link } from "gatsby"
import PrimaryLayout from "../components/PrimaryLayout"
import SEO from "../components/seo"
import postStyles from "../css/Post.module.css"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <PrimaryLayout>
      <SEO title={`🖋️ ${frontmatter.title}`} />

      <h3>
        <Link className={postStyles.home} to="/">
          <span role="img" aria-label="home" style={{ paddingRight: ".3em" }}>
            ⬅️
          </span>
          Home
        </Link>
      </h3>

      <div>
        <h1 style={{ margin: 0 }}>{frontmatter.title}</h1>
        <h2 style={{ margin: 0 }}>{frontmatter.date}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </PrimaryLayout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
