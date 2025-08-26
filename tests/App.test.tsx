import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

// Mock CSS imports
jest.mock('../src/App.css', () => ({}));


describe('App', () => {
  it('renders welcome message', () => {
    render(<App />)
    expect(screen.getByText('Welcome to My Portfolio')).toBeInTheDocument
  })
})