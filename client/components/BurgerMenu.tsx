import React from 'react'
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
  Card,
  ThemeProvider,
} from '@material-tailwind/react'
import { InboxIcon } from '@heroicons/react/24/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import * as models from '../models/items.tsx'

interface Props {
  data: models.item[]
}

export function BurgerMenu(props: Props) {
  const data = props.data

  // const [open, setOpen] = React.useState(0)
  // const [openAlert, setOpenAlert] = React.useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  function numberOfItemsInInventory() {
    return data.filter((item) => item.soldOrBought == 'bought').length
  }
  function numberOfItemsInLedger() {
    return data.length
  }

  console.log(numberOfItemsInInventory())

  const customTheme = {
    ...{
      theme: {
        colors: {
          transparent: 'transparent',
          black: '#000',
          white: '#EEE',
          gray: {
            100: '#f7fafc',
            // ...
            900: '#1a202c',
          },
        },
      },
    },
  }

  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value)
  // }

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <>
      <ThemeProvider value={customTheme}>
        <IconButton
          variant="text"
          size="lg"
          onClick={openDrawer}
          color="white"
          className="relative bottom-2"
        >
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <Card
            color="transparent"
            shadow={false}
            className="h-[calc(100vh-2rem)] w-full p-4"
          >
            <div className="mb-2 flex items-center gap-4 p-4">
              <img
                src="../client/images/minimal-book-v2-black.png"
                alt="Sales Ledger Logo"
                className="h-8"
              />
              <Typography
                variant="h5"
                color="black"
                className="font-poppins text-4xl"
              >
                Sales Ledger
              </Typography>
            </div>
            {/* <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div> */}
            <List>
              <hr className="my-2 border-blue-gray-50" />
              <ListItem>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Link to="/inventory" onClick={closeDrawer}>
                  Inventory
                </Link>
                <ListItemSuffix>
                  <Chip
                    value={numberOfItemsInInventory()}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Link to="/theledger" onClick={closeDrawer}>
                  Ledger
                </Link>
                <ListItemSuffix>
                  <Chip
                    value={numberOfItemsInLedger()}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              {/* <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem> */}
            </List>
          </Card>
        </Drawer>
      </ThemeProvider>
    </>
  )
}

export default BurgerMenu
