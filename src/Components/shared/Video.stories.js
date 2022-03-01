import React from 'react';

import { storiesOf } from '@storybook/react';

import Video from './Video';

storiesOf('Video', module)
  .add(
    'renders a placeholder initially that plays back the video when tapped',
    () => (
      <Video src="https://storage.googleapis.com/zume-file-mirror/en/32.mp4" />
    )
  )
  .add('renders a youtube video properly', () => (
    <Video
      src="https://www.youtube.com/embed/yZl6NTl2hhY?start=772"
      title="Communicating for insight video"
    />
  ));
