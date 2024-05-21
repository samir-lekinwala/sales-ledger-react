import React from 'react'

interface props {
  width: number
  classes: string
}

function Logo({ width, classes }: props) {
  return (
    <img
      width={width}
      src="../client/images/minimal-book-v2.png"
      alt="Sales Ledger logo"
      className={classes}
    />
  )
}

export default Logo
