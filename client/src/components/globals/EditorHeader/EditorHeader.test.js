import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import EditorHeader from './index';

test('EditorHeader Smoke Test', () => {
  const component = shallow(
    <EditorHeader
      text="Hello, world!"
    />
  );
  expect(toJSON(component)).toMatchSnapshot();
});
