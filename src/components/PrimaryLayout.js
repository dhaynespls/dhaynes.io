import React from "react"
import PropTypes from "prop-types"

import styles from "../css/PrimaryLayout.module.css"

const PrimaryLayout = ({ children }) => {
  return <div className={styles.body}>{children}</div>
}

PrimaryLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrimaryLayout
