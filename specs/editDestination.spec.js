const helper = require('protractor-helper')

const Destination = require('../page-objects/destination')
const EditDestination = require('../page-objects/editDestination')

describe('Given I\'m at a random edit destination page', () => {
  let editDestination

  beforeEach(() => {
    editDestination = new EditDestination()
    editDestination.visit()
  })

  fit('Then I see an image, and a form to edit the name and description', () => {
    helper.waitForElementVisibility(editDestination.self.image)
    helper.waitForElementVisibility(editDestination.form.nameLabel)
    helper.waitForElementVisibility(editDestination.form.nameInput)
    helper.waitForElementVisibility(editDestination.form.descriptionLabel)
    helper.waitForElementVisibility(editDestination.form.descriptionInput)
    helper.waitForElementVisibility(editDestination.form.updateButton)
  })

  describe('When I submit the form with less than the minimum required characters', () => {
    beforeEach(() => {
      editDestination
        .form
        .submitFormAfterClearingAndFillingItWith('Ab', 'Abcdefghi')
    })

    it('Then both input fields are wrapped in a .field_wuth_errors div', () => {
      helper.waitForElementVisibility(editDestination.form.nameInputWithError)
      helper.waitForElementVisibility(editDestination.form.descriptionInputWithError)
    })
  })

  describe('When successfully submitting for thr form a new name and description', () => {
    let destinationUrl
    const randomUuid = faker.random.uuid()
    const fiveRandomWords = faker.random.words(5)

    beforeEach(() => {
      browser.getCurrentUrl().then(url => {
        destinationUrl = url.replace('/edit', '')
      })

      editDestination
        .form
        .submitFormAfterClearingAndFillingItWith(randomUuid, fiveRandomWords)
    })

    it('Then I\'m redirected to the destination view page, and I see the updated info', () => {
      const destination = new Destination()

      helper.waitForUrlToBeEqualToExpectedtUrl(destinationUrl)
      helper.waitForTextToBePresentInElement(
        destination.self.heading,
        randomUuid
      )
      helper.waitForUrlToBeEqualToExpectedtUrl(destinationUrl)
      helper.waitForTextToBePresentInElement(
        destination.self.paragraph,
        fiveRandomWords
      )
    })
  })
})
