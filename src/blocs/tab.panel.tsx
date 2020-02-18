import { Box, Typography } from '@material-ui/core'
import React from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

export const TabPanel = ( { children, value, index, ...other }: TabPanelProps ) => (
  <Typography component="div" hidden={value !== index} {...other}>
    {value === index && <Box p={3}>{children}</Box>}
  </Typography>
)
