// @ts-check

/**
 * @typedef {{
 *    alt: string
 *    src: string
 *    mobileSrc: string
 *    brandLink: string
 *  }} Logo
 */

/**
 * @typedef {{
 *    href: string
 *    color?: "gold" | "maroon" | "light" | "dark"
 *    text: string
 *  }} Button
 */

/**
 * @typedef {{
 *  isPartner: boolean
 *  navTree: object[]
 *  title?: string
 *  baseUrl?: string
 *  parentOrg?:  string
 *  parentOrgUrl?: string
 *  partnerLogo: Logo
 *  logo: Logo
 *  loggedIn: boolean
 *  userName: string
 *  loginLink: string
 *  logoutLink:  string
 *  buttons: Button[]
 *  breakpoint: "Lg" | "Xl"
 *  animateTitle: boolean
 *  expandOnHover: boolean
 *  mobileNavTree: object[]
 * }} HeaderProps
 */

export const JSDOC = "jsdoc";
