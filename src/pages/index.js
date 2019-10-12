import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <Img fluid={data.file.childImageSharp.fluid} />
      <h1>David Haynes</h1>
    </div>
  </Layout>
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
