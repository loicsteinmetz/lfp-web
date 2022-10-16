const Breakpoints = {
  SMALL: '0px',
  MEDIUM: '768px',
  LARGE: '992px',
}

export const Devices = {
  MOBILE: `(min-width: ${Breakpoints.SMALL})`,
  TABLET: `(min-width: ${Breakpoints.MEDIUM})`,
  DESKTOP: `(min-width: ${Breakpoints.LARGE})`,
}
