import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom' // eslint-disable-line no-eval
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  let component, form
  test('updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    component = render (
      <NewBlogForm  createNewBlog={createBlog} />
    )
    const input = component.container.querySelector('#author')
    form = component.container.querySelector('form')

    fireEvent.change(input, { target: { value: 'John Doe' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls.length).toBe(1)

    expect(createBlog.mock.calls[0][0].author).toBe('John Doe')
  })
})
