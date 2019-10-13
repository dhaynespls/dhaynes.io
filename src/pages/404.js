import React from "react"

import PrimaryLayout from "../components/PrimaryLayout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <PrimaryLayout>
    <SEO title="404: Not found" />
    <p>You just hit a route that does not exist... the sadness.</p>
  </PrimaryLayout>
)

export default NotFoundPage
