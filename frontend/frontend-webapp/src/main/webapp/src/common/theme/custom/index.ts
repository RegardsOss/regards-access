import cdppTheme from "./cdppTheme"
import ssaltoTheme from "./ssaltoTheme"
import lightBaseTheme from "./lightBaseTheme"
import darkBaseTheme from "./darkBaseTheme"

/**
 * Add the following file to the project build
 */
// Cross browser css reset
import "./reset.css"
// Import a bootstrap grid that uses 100 cols instead of 12
// And nothing else from bootstrap 3.2
// @source https://github.com/zirafa/bootstrap-grid-only
import "./bootstrap_grid_100.css"

import "./background.jpg"

// Register them here
export default {
  cdpp: cdppTheme,
  ssalto: ssaltoTheme,
  Light: lightBaseTheme,
  Dark: darkBaseTheme
}
