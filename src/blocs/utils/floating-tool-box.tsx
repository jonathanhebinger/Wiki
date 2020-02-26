import { Grid, GridProps, Tooltip, TooltipProps, withStyles } from '@material-ui/core'
import React from 'react'

const LightTooltip = withStyles( theme => ( {
  tooltip: {
    backgroundColor: 'white',
    boxShadow: theme.shadows[ 1 ],
    padding: '2px',
  },
} ) )( Tooltip )

export interface FloatingToolBoxProps extends Omit<TooltipProps, 'title'> {
  tools: TooltipProps[ 'title' ]
  direction?: GridProps[ 'direction' ]
}

export const FloatingToolBox = ( props: FloatingToolBoxProps ) => {
  const { tools: actions, direction, ...others } = props
  const actionsWrapper = (
    <Grid container direction={direction || 'column'}>
      {actions}
    </Grid>
  )
  return <LightTooltip placement="left" {...others} title={actionsWrapper} interactive />
}
