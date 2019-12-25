import React from "react"

import PrimaryLayout from "../components/PrimaryLayout"
import SEO from "../components/SEO"

const NotFoundPage = () => (
  <>
    <SEO title="⚠️ 404" />

    <PrimaryLayout>
      <h1>You just hit a route that does not exist... the sadness.</h1>
    </PrimaryLayout>
  </>
)

export default NotFoundPage
