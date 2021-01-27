import React from 'react'

// material-ui/core
import { Typography } from '@material-ui/core'

// material-ui/lab
import { Alert } from '@material-ui/lab'

function AutoSlugWarning() {
  return (
    <div>
      <Alert variant="filled" elevation={2} severity="warning">
        <Typography variant="body1">
          آدرس صفحه تغییر یافت! توجه داشته باشید که با تغییر آدرس صفحه، سئو به
          طور جدی تحت تاثیر قرار خواهد گرفت.
        </Typography>
      </Alert>
    </div>
  )
}

export default AutoSlugWarning
