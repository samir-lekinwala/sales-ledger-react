interface props {
  width: number
  classes: string
  colour: string
}

function Logo({ width, classes, colour }: props) {
  return (
    <img
      width={width}
      src={`../client/images/minimal-book-v2-${colour}.png`}
      alt="Sales Ledger logo"
      className={classes}
    />
  )
}

export default Logo
