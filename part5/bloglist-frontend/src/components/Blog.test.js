import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom' // eslint-disable-line no-eval
import Blog from './Blog'

describe('<Blog />', () => {
  let component, button
  const blog = {
    author: 'Adam Smith',
    title: 'How to test react',
    url: 'testingreact.com',
    like: 3,
    user: { name: 'User1' }
  }

  test('renders author/title before click', () => {

    component = render(
      <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent(
      'How to test react Adam Smith'
    )

  })

  test('renders all info after click', () => {
    component = render(
      <Blog blog={blog}/>
    )

    button = component.getByText('view')

    fireEvent.click(button)

    const toggleDiv  = component.container.querySelector('.togglableContent')

    expect(toggleDiv).toHaveStyle('display: block ')

    expect(toggleDiv).toHaveTextContent(
      'How to test react: Adam Smith'
    )

    expect(toggleDiv).toHaveTextContent(
      'testingreact.com'
    )

    expect(toggleDiv).toHaveTextContent(
      'like'
    )
  })

  test('clicking like increases likes', () => {

    const mockHandler = jest.fn()

    component = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
      />
    )

    button = component.getByText('view')

    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})