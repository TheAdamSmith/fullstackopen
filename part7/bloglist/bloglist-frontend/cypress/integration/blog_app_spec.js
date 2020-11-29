
describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Firstname Lastname',
      username: 'test',
      password: 'test'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form is shown when clicked', function() {
    cy.contains('login').click
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('test')
      cy.get('#password')
        .type('test')
      cy.get('#login-button')
        .click()

      cy.contains('test logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('wrong')
      cy.get('#password')
        .type('wrong')
      cy.get('#login-button')
        .click()

      cy.get('.error')
        .should('contain', 'Invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'test logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.get('#newBlogToggle_show')
        .click()

      cy.get('#newBlogForm')
        .as('newBlogForm')
        .should('contain', 'create new')
        .and('contain', 'title')
        .and('contain', 'author')
        .and('contain', 'url')

      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')

      cy.get('button')
        .contains('create')
        .click()

      cy.get('#blogList')
        .should('contain', 'test title')
        .and('contain', 'test author')
        .and('contain', 'view')
    })

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title:'test title', author: 'test author', url: 'testurl.com' })
      })

      it('view can be clicked', function() {
        cy.get('#blogList')
          .contains('view')
          .click()

        cy.get('#blogList')
          .should('contain', 'test title')
          .and('contain', 'test author')
          .and('contain', 'testurl.com')
          .and('contain', 'Firstname Lastname')
      })

      it('like increases like', function() {
        cy.get('#blogList')
          .contains('view')
          .click()
        cy.contains('like')
          .click()

        cy.contains('like')
          .click()
        cy.contains('likes 2')
      })

      it('user can delete', function() {
        cy.get('#blogList')
          .contains('view')
          .click()
        cy.contains('remove')
          .click()
        cy.get('#blogList')
          .should('not.contain', 'test title')
          .and('not.contain', 'test title')
          .and('not.contain', 'test author')
      })

      it('wrong user cannot delete', function() {
        const user = {
          name: 'Firstname Lastname',
          username: 'wrong',
          password: 'wrong'
        }

        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.login({ username: 'wrong', password: 'wrong' })
        cy.get('#blogList')
          .contains('view')
          .click()
        cy.contains('remove')
          .click()
        cy.get('#blogList')
          .should('contain', 'test title')
          .and('contain', 'test title')
          .and('contain', 'test author')
      })

      it('blogs should be ordered by likes', function() {
        cy.createBlog({
          title:'test title2',
          author: 'test author2',
          url: 'testurl.com',
          likes: 2 })
        cy.createBlog({
          title:'test title2',
          author: 'test author2',
          url: 'testurl.com',
          likes: 4 })
        cy.createBlog({
          title:'test title2',
          author: 'test author2',
          url: 'testurl.com',
          likes: 7 })

        let prevLike = 10
        let currLike = -1
        cy.get('#blogList')
          .get('.togglableContent')
          .each((elem) => {
            cy.wrap(elem)
              .contains('likes')
              .then(function(elem2){
                currLike = elem2.text().split(' ')[1][0]
                expect(prevLike > currLike).to.be.true
                prevLike = currLike
              })
          })

      })
    })
  })

})

