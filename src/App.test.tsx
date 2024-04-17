import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import App from './App';

test('full app rendering and navigating', () => {
  render(<App />,{wrapper: BrowserRouter});
  expect(screen.getByText(/STARWARS/i)).toBeInTheDocument()
});
