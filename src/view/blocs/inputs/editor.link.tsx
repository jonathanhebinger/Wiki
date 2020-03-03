import { Box, Button, List, ListItem, ListItemText, Paper, Tab, Tabs, TextField } from '@material-ui/core'
import constate from 'constate'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { noteSelectorAll } from 'src/state/selectors'
import { INote } from 'src/types/models'
import { TabPanel, useModalContext } from 'src/view/blocs'

enum LinkInputType {
  INTERNAL,
  NOTES,
  EXTERNAL,
}

const [ LinkInputProvider, useLinkInputContext ] = constate( () => {
  const [ label, setLabel ] = useState( '' )

  const [ type, setType ] = React.useState( LinkInputType.INTERNAL )

  return { label, setLabel, type, setType }
} )

interface LinkInputDialogProps {
  onValidate: () => void
  onCancel: () => void
}

export function LinkInputDialog( { onValidate, onCancel }: LinkInputDialogProps ) {
  const { setConfig, open, close } = useModalContext()

  useEffect( () => {
    setConfig( {
      title: 'Create link',
      content: <LinkInputDialogContent />,
      actions: <LinkInputDialogActions />,
      wrapper: LinkInputProvider,
      onClose: onCancel,
      width: 'md',
    } )
    open()
    return () => close()
  }, [ setConfig, open, close, onCancel ] )

  return <React.Fragment />
}

const LinkInputDialogContent = () => {
  const { type, setType } = useLinkInputContext()

  const eTabChange = useCallback( ( e: React.ChangeEvent<{}>, value: LinkInputType ) => setType( value ), [ setType ] )

  return (
    <React.Fragment>
      <Box marginBottom={2.5}>
        <LinkInputExternalLabel />
      </Box>

      <Paper square>
        <Tabs value={type} indicatorColor="primary" textColor="primary" onChange={eTabChange}>
          <Tab label="External" value={LinkInputType.INTERNAL} />
          <Tab label="Notes" value={LinkInputType.NOTES} />
          <Tab label="Internal" value={LinkInputType.EXTERNAL} />
        </Tabs>
      </Paper>

      <TabPanel value={type} index={LinkInputType.INTERNAL}>
        <LinkInputExternal />
      </TabPanel>

      <TabPanel value={type} index={LinkInputType.NOTES}>
        <LinkInputNotes />
      </TabPanel>

      <TabPanel value={type} index={LinkInputType.EXTERNAL}>
        <LinkInputInternal />
      </TabPanel>
    </React.Fragment>
  )
}

const LinkInputDialogActions = () => {
  const { close } = useModalContext()
  return (
    <React.Fragment>
      <Button onClick={close} color="primary">
        Cancel
      </Button>
      <Button onClick={close} color="primary" disabled>
        Validate
      </Button>
    </React.Fragment>
  )
}

const LinkInputExternalLabel = () => {
  const { label, setLabel } = useLinkInputContext()
  const eLabelChange = useCallback(
    ( e: React.ChangeEvent<HTMLInputElement> ) => {
      setLabel( e.target.value )
    },
    [ setLabel ],
  )
  return <TextField margin="dense" label="Label" type="text" fullWidth value={label} onChange={eLabelChange} required />
}

const LinkInputExternal = () => {
  return (
    <React.Fragment>
      <TextField margin="dense" label="Address" type="text" fullWidth required />
    </React.Fragment>
  )
}

const LinkInputNotes = () => {
  const [ search, setSearch ] = useState( '' )

  const onSearch = ( e: React.ChangeEvent<HTMLInputElement> ) => setSearch( e.target.value )

  const select = useCallback( ( note: INote ) => {
    setSearch( note.title )
  }, [] )

  const notes = useSelector( noteSelectorAll )

  const searchResult = useMemo( () => {
    return notes.filter( note => note.title.includes( search ) ).slice( 0, 10 )
  }, [ search, notes ] )

  const vSearchResult = useMemo(
    () =>
      searchResult.map( note => {
        const onClick = () => select( note )

        return (
          <ListItem key={note.id} button>
            <ListItemText primary={note.title} onClick={onClick} />
          </ListItem>
        )
      } ),
    [ searchResult, select ],
  )

  return (
    <React.Fragment>
      <TextField type="text" value={search} onChange={onSearch} required margin="dense" label="Title" fullWidth />
      <List>{vSearchResult}</List>
    </React.Fragment>
  )
}

const LinkInputInternal = () => {
  return (
    <React.Fragment>
      <LinkInputExternalLabel />
    </React.Fragment>
  )
}
