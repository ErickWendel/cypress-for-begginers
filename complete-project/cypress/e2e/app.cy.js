import assert from 'assert'
class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    urlFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit'),
  }

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text)
  }

  typeUrl(url) {
    if (!url) return;
    this.elements.imageUrlInput().type(url)
  }
  clickSubmit() {
    this.elements.submitBtn().click()
  }
  hitEnter() {
    cy.focused().type('{enter}')
  }
}

const registerForm = new RegisterForm()
const colors = {
  error: 'rgb(220, 53, 69)',
  success: 'rgb(222, 226, 230)'
}
describe('Image Registration', () => {

  describe('Submitting an image with invalid inputs', () => {
    const input = {
      title: '',
      url: '',
    }

    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })

    it(`Then I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url)
    })

    it('Then I click the submit button', () => {
      registerForm.clickSubmit()
    })

    it('Then I should see "Please type a title for the image" message above the title field', () => {
      registerForm.elements.titleFeedback().should('contain.text', 'Please type a title for the image')
    })

    it('And I should see "Please type a valid URL" message above the imageUrl field', () => {
      registerForm.elements.urlFeedback().should('contain.text', 'Please type a valid URL')
    })

    it('And I should see an exclamation icon in the title and URL fields', () => {
      registerForm.elements.titleInput().should(([$input]) => {
        const styles = window.getComputedStyle($input);
        const border = styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.error)
      })
    })

  })

  describe('Submitting an image with valid inputs using enter key', () => {

    const input = {
      title: 'Alien BR',
      url: 'https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg',

    }

    after(() => {
      cy.clearLocalStorage()
    })

    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title)
    })

    it(`Then I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url)
    })

    it('I should see a check icon in the imageUrl field', () => {
      registerForm.elements.titleInput().should(([$input]) => {
        const styles = window.getComputedStyle($input);
        const border = styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.success)
      })
    })

    it('Then I can hit enter to submit the form', () => {
      registerForm.hitEnter()
      cy.wait(100)
    })

    it('And the list of registered images should be updated with the new item', () => {
      cy.get('#card-list .card-img').should((elements) => {
        const lastElement = elements[elements.length - 1]
        const src = lastElement.getAttribute('src')
        assert.strictEqual(src, input.url)
      })
    });

    it('And the new item should be stored in the localStorage', () => {
      cy.getAllLocalStorage().should((ls) => {
        const currentLs = ls[window.location.origin]
        const elements = JSON.parse(Object.values(currentLs))
        const lastElement = elements[elements.length - 1]

        assert.deepStrictEqual(lastElement, {
          title: input.title,
          imageUrl: input.url,
        })

      })
    })

    it('Then The inputs should be cleared', () => {
      registerForm.elements.titleInput().should('have.value', '')
      registerForm.elements.imageUrlInput().should('have.value', '')
    })

  })

  describe('Refreshing the page after submitting an image clicking in the submit button', () => {
    const input = {
      title: 'Alien BRAZIL',
      url: 'https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg',
    }

    after(() => {
      cy.clearLocalStorage()
    })

    it('Given I am on the image registration page', () => {
      cy.visit('/')
    })

    it(`Then I have submitted an image by clicking the submit button`, () => {
      registerForm.typeTitle(input.title)
      registerForm.typeUrl(input.url)
      registerForm.clickSubmit()
      cy.wait(100)
    })

    it(`When I refresh the page`, () => {
      cy.reload()
    })

    it('Then I should still see the submitted image in the list of registered images', () => {
      cy.getAllLocalStorage().should((ls) => {
        const currentLs = ls[window.location.origin]
        const elements = JSON.parse(Object.values(currentLs))
        const lastElement = elements[elements.length - 1]

        assert.deepStrictEqual(lastElement, {
          title: input.title,
          imageUrl: input.url,
        })
      })
    })

  })

})