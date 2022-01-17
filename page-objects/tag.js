const HeaderComponent = require('./components/header')
const DestinationsComponent = require('./components/destinations')

const randomNumberBetweenOneAnd = require('../utils/randomNumberBetweenOneAndN')

class Tag {
  constructor () {
    this.header = new HeaderComponent()
    this.destinations = new DestinationsComponent()
  }

  visit () {
    browser.get(`/tags/${randomNumberBetweenOneAnd(5)}`)
  }
}

module.exports = Tag
