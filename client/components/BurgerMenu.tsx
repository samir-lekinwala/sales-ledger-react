import { useEffect, useState } from 'react'
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
import { Link, useLocation } from 'react-router-dom'
import * as models from '../models/items.tsx'
import Footer from './Footer.tsx'
import Logo from './Logo.tsx'
import {
  numberOfItemsInInventory,
  numberOfItemsInLedger,
} from '../functions/functions.tsx'

interface Props {
  data: models.item[]
}

export function BurgerMenu(props: Props) {
  const location = useLocation()
  const { pathname } = location

  function checkPath() {
    console.log('pathname', pathname)
    if (pathname == '/theledger') {
      setCurrentPath('ledger')
    } else if (pathname == '/inventory') {
      setCurrentPath('inventory')
    } else setCurrentPath(undefined)
  }
  useEffect(() => {
    checkPath()
  }, [pathname])

  const [currentPath, setCurrentPath] = useState<string | null>()
  console.log(currentPath)
  const data = props.data

  // const [open, setOpen] = React.useState(0)
  // const [openAlert, setOpenAlert] = React.useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // function numberOfItemsInInventory(data) {
  //   return data.filter((item) => item.inventory == true).length
  // }
  // function numberOfItemsInLedger(data) {
  //   return data.length
  // }

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
            <Link to={`/`} onClick={closeDrawer}>
              <div className="mb-2 justify-center flex flex-wrap flex-row p-4">
                {/* <Logo
                  width={60}
                  colour="black"
                  classes="justify-center flex flex-wrap flex-row h-8"
                /> */}
                <Typography
                  variant="h5"
                  color="black"
                  className="font-poppins text-3xl"
                >
                  Sales Ledger
                </Typography>
              </div>
            </Link>
            {/* <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div> */}
            <List className="text-black">
              <hr className="my-2 border-blue-gray-50" />
              <ListItem
                className={`${
                  currentPath == 'inventory' ? 'bg-[#76ABAE] text-black' : null
                }`}
              >
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Link
                  // className="bg-black"
                  to="/inventory"
                  onClick={closeDrawer}
                >
                  Inventory
                </Link>
                <ListItemSuffix>
                  <Chip
                    value={numberOfItemsInInventory(data)}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem
                className={`${
                  currentPath == 'ledger' ? 'bg-[#76ABAE] text-black' : null
                }`}
              >
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Link to="/theledger" onClick={closeDrawer}>
                  Ledger
                </Link>
                <ListItemSuffix>
                  <Chip
                    value={numberOfItemsInLedger(data)}
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
            <div className="relative top-[calc(80vh-250px)]">
              <Footer colour={'black'} />
            </div>
          </Card>
        </Drawer>
      </ThemeProvider>
    </>
  )
}

export default BurgerMenu
