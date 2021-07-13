import React from 'react';
import { Basic } from '../stories/components/global-header/global-header.stories.js';

export const createComponent = (name) => {
  return {
    title: `Components/${name}`,
    argTypes: {
      header: {
        control: { type: 'boolean' },
        default: false,
      },
      footer: {
        control: { type: 'boolean' },
        default: false,
      }
    }
  }
}

export const UnityStory = (props) => {
  return (
    <div>
      { props.header && <div>header</div> }
      <div>{ props.children }</div>
      { props.footer && <div>footer</div> }
    </div>
  )
}

export const createStory = (componentJSX) => {
  const Template = ({...args}) => (
    <div>
      { args.header && <Basic /> }
      <div>{ componentJSX }</div>
      { args.footer && <div>footer</div> }
    </div>
  );

  return Template.bind({});
}


