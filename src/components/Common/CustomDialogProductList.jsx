import React from 'react'
import PropTypes from 'prop-types'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from '@material-ui/core'

// @material-ui/icons
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import CloseIcon from '@material-ui/icons/Close'

// components
import ProductList from 'components/Products/ProductList'
import SponsorProductDetails from 'components/Products/SponsorProductDetails'

const useStyles = makeStyles(theme => ({
  root: {
    top: `${theme.spacing(4)}px !important`,
    left: `${theme.spacing(4)}px !important`,
    right: `${theme.spacing(4)}px !important`,
    bottom: `${theme.spacing(4)}px !important`,
    zIndex: '20000000 !important',
    // zIndex: '1500 !important',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  dialogTitleWrapper: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(0, 3),
    textAlign: 'right',
  },
  closeButton: {
    // marginLeft: theme.spacing(-0.75),
    marginRight: theme.spacing(-0.75),
    marginLeft: theme.spacing(2.5),
  },
  dialogContentWrapper: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(0, 2, 2),
    '& > video': {
      width: theme.spacing(75),
      maxWidth: '100%',
    },
  },
  container: {
    height: '100%',
    paddingLeft: `${theme.spacing(0)}px !important`,
    paddingRight: `${theme.spacing(0)}px !important`,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function CustomDialogProductList({
  open,
  setIsOpenProductList,
  isListOrItem,
  setIsListOrItem,
  suggestedContents,
  sponsorProductSlug,
  setSponsorProductSlug,
}) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullScreen
      keepMounted
      scroll="paper"
      className={classes.root}
    >
      <DialogTitle disableTypography className={classes.dialogTitleWrapper}>
        {isListOrItem === 'item' && (
          <Button
            onClick={() => {
              // setIsOpenProductList(false)
              setIsListOrItem('list')
            }}
            endIcon={<KeyboardBackspaceIcon size={20} />}
            className={classes.closeButton}
          >
            بازگشت به لیست محصولات
          </Button>
        )}

        <Button
          onClick={() => {
            setIsOpenProductList(false)
            setIsListOrItem('list')
          }}
          endIcon={<CloseIcon size={20} />}
          className={classes.closeButton}
        >
          بازگشت به غرفه
        </Button>
      </DialogTitle>

      <DialogContent className={classes.dialogContentWrapper}>
        <Container maxWidth="lg" className={classes.container}>
          {isListOrItem === 'list' && (
            <ProductList
              // catSlug={slug}
              isSuggestedProducts
              suggestedProducts={suggestedContents}
              setIsListOrItem={setIsListOrItem}
              setSponsorProductSlug={setSponsorProductSlug}
              chapterCount={0}
              // comparable
              pageable
              xsGrid={12}
              smGrid={6}
              mdGrid={3}
              lgGrid={3}
            />
          )}

          {isListOrItem === 'item' && (
            <SponsorProductDetails
              sponsorProducts={suggestedContents}
              sponsorProductSlug={sponsorProductSlug}
            />
          )}
        </Container>
      </DialogContent>
    </Dialog>
  )
}

CustomDialogProductList.defaultProps = {
  suggestedContents: [],
  sponsorProductSlug: '',
}

CustomDialogProductList.propTypes = {
  open: PropTypes.bool.isRequired,
  setIsOpenProductList: PropTypes.func.isRequired,
  isListOrItem: PropTypes.string.isRequired,
  setIsListOrItem: PropTypes.func.isRequired,
  suggestedContents: PropTypes.arrayOf(PropTypes.object),
  sponsorProductSlug: PropTypes.string,
  setSponsorProductSlug: PropTypes.func.isRequired,
}

export default CustomDialogProductList
