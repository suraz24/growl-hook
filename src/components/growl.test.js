import React from 'react';
import { render } from '@testing-library/react';
import Growl from './growl';

test('displays hello', () => {
    const { getByText } = render(<Growl message ="Hello" active={true} />);
    const linkElement = getByText('Hello');
    expect(linkElement).toBeInTheDocument();
  });