import { Box, Grid } from '@mui/material'

import { Badge } from '../../structure/Badge'
import { useSearchContext } from '../search.context'

export function SearchFilters() {
  const { state, actions } = useSearchContext()

  const Filters = state.filters.map((filter, index) => {
    const label = `${filter.name} - ${state.filtered.sizes[index]}`
    const handleDelete = () => actions.filters$remove(filter)

    return (
      <Box key={index} sx={{ m: 1 }}>
        <Badge label={label} onDelete={handleDelete} />
      </Box>
    )
  })

  return (
    <Grid container wrap="wrap">
      {Filters}
    </Grid>
  )
}
