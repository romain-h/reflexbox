
import React from 'react'
import config from './config'
import margin from './util/margin'
import padding from './util/padding'

/**
 * Creates a flexbox context to control layout of children.
 */

const Flex = ({
  wrap,
  column,
  align,
  justify,
  auto,
  style,
  className,
  ...props
}, { reflexbox }) => {

  let display = 'flex'
  const { breakpoints, scale } = { ...config, ...reflexbox }

  if (typeof window !== 'undefined') {
    Object.keys(breakpoints).forEach(key => {
      if (Object.keys(props).indexOf(key) > -1) {
        display = 'block'
      }
    })
    Object.keys(breakpoints).forEach(key => {
      if (props[key] && window.matchMedia(breakpoints[key]).matches) {
        display = 'flex'
      }
    })
  }

  const sx = Object.assign(
    {},
    style,
    {
      display,
      flexWrap: wrap ? 'wrap' : null,
      flexDirection: column ? 'column' : null,
      flex: auto ? '1 1 auto' : null,
      alignItems: align || null,
      justifyContent: justify || null
    },
    margin(props, scale),
    padding(props, scale)
  )

  const cx = className ? `Flex ${className}` : 'Flex'

  return <div
    {...props}
    style={sx}
    className={cx} />
}

Flex.propTypes = {
  /** Sets flex-wrap: wrap */
  wrap: React.PropTypes.bool,
  /** Sets flex-direction: column */
  column: React.PropTypes.bool,
  /** Sets negative left and right margins to compensate for <Box /> padding */
  gutter: React.PropTypes.number,
  /** Sets align-items */
  align: React.PropTypes.oneOf([
    'stretch',
    'center',
    'baseline',
    'flex-start',
    'flex-end',
  ]),
  /** Sets justify-content */
  justify: React.PropTypes.oneOf([
    'center',
    'space-around',
    'space-between',
    'flex-start',
    'flex-end',
  ]),
  /** Sets flex: 1 1 auto */
  auto: React.PropTypes.bool
}

Flex.contextTypes = {
  reflexbox: React.PropTypes.shape({
    breakpoints: React.PropTypes.object,
    scale: React.PropTypes.array
  })
}

export default Flex

