import { styled } from "@mui/material"
import Tabs, { TabsProps } from '@mui/material/Tabs';

export const TabList = styled(Tabs)<TabsProps>(({orientation="horizontal", theme }) => ({
  border: '0 !important',
  overflow: 'visible',
  '& .MuiTabs-flexContainer': {
    flexDirection: orientation === 'horizontal' ? 'row': 'column',
    gap: 5
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTabs-root': {
    marginRight: "0px !important",
  },
  '& .MuiTab-root': {
    lineHeight: 1.5,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: orientation === 'horizontal' ? 'center' : 'start',
    marginRight: "0px !important",
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1.5),
    '& svg': {
      marginBottom: 0,
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  }
}))

