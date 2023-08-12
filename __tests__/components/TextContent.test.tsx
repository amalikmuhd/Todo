import {render} from '@testing-library/react-native';
import TextContent from '../../app/components/TextContent';

describe('TextContent', () => {
  it('renders with the provided title', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    const {getByText} = render(<TextContent title="Sample Title" />);
    const titleText = getByText('Sample Title');
    expect(titleText).toBeDefined();
  });
});
