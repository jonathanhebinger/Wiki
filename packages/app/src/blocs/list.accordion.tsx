import { IconButton, List, ListProps, ListSubheader } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import React, { useState } from 'react'

export function ListAccordion({
  children,
  subheader,
  ...props
}: Omit<ListProps, 'subheader'> & { subheader: React.ReactNode }) {
  const [opened, setOpened] = useState(false)

  function handleToggle() {
    setOpened(!opened)
  }

  const hasContent =
    children && (!Array.isArray(children) || children.length > 0)

  const subHeader = (
    <ListSubheader className="flex justify-between" onClick={handleToggle}>
      <div>{subheader}</div>
      <div>
        {hasContent && (
          <IconButton size="small">
            <ExpandMore style={opened ? { transform: 'rotate(180deg)' } : {}} />
          </IconButton>
        )}
      </div>
    </ListSubheader>
  )

  return (
    <List
      disablePadding={!opened || !hasContent}
      className="cursor-pointer"
      {...props}
      subheader={subHeader}
    >
      {opened && children}
    </List>
  )
}
