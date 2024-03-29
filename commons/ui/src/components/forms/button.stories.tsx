import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './button'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => <Button {...args}>Button</Button>

export const Primary = Template.bind({})

Primary.args = {
  contrast: true,
}
