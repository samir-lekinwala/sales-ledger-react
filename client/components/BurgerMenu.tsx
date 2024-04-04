// //<---- old stuff --->

// import React from 'react'
// import { Link } from 'react-router-dom'

// interface Props {
//   burgermenuclick: React.Dispatch<React.SetStateAction<boolean>>
//   menuStatus: boolean
// }

// function BurgerMenu(props: Props) {
//   return (
//     <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
//       <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 rtl:space-x-reverse"
//         >
//           <img
//             src="https://flowbite.com/docs/images/logo.svg"
//             className="h-8"
//             alt="Flowbite Logo"
//           />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//             Sales Ledger
//           </span>
//         </Link>
//         <button
//           onClick={() => props.burgermenuclick(!props.menuStatus)}
//           data-collapse-toggle="navbar-hamburger"
//           type="button"
//           className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//           aria-controls="navbar-hamburger"
//           aria-expanded="true"
//         >
//           <span className="sr-only">Open main menu</span>
//           <svg
//             className="w-5 h-5"
//             aria-hidden="false"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//         {props.menuStatus ? (
//           <div className="w-full" id="navbar-hamburger">
//             <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
//               <li>
//                 <Link
//                   to="/inventory"
//                   className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
//                   aria-current="page"
//                 >
//                   Inventory
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="theledger"
//                   className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//                 >
//                   The Ledger
//                 </Link>
//               </li>
//               {/* <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
//               >
//                 Pricing
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//               >
//                 Contact
//               </a>
//             </li> */}
//             </ul>
//           </div>
//         ) : null}
//       </div>
//     </nav>

//     // <div>
//     //   <ul className="float-right">
//     //     <li>
//     //       <Link to="/" onClick={() => props.burgermenuclick()}>
//     //         Add Item
//     //       </Link>
//     //     </li>
//     //     <li>
//     //       <Link to="/inventory">Inventory</Link>
//     //     </li>
//     //     <li>
//     //       <Link to="theledger">The Ledger</Link>
//     //     </li>
//     //     <li>
//     //       <a href="#">Account</a>
//     //     </li>
//     //     <li>
//     //       <a href="#">Sign Out</a>
//     //     </li>
//     //   </ul>
//     // </div>
//   )
// }

// export default BurgerMenu

// // <-- old stuff -->

import React, { useState } from 'react'
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
  ThemeProvider,
} from '@material-tailwind/react'
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid'
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { getAllItems } from '../apis/fruits'
import { ModuleNamespace } from 'vite/types/hot.js'
import * as models from '../models/items.tsx'

interface Props {
  data: models.item[]
}

export function BurgerMenu(props: Props) {
  const data = props.data

  const [open, setOpen] = React.useState(0)
  // const [openAlert, setOpenAlert] = React.useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  // const [data, setData] = useState<models.item[] | null>(null)

  // async function getResponse() {
  //   const response = await getAllItems()
  //   const data = response // Extracting data as a JSON Object from the response
  //   // console.log(data.body)
  //   return setData(data.body)
  // }

  function numberOfItemsInInventory() {
    return data.filter((item) => item.soldOrBought == 'bought').length
  }
  function numberOfItemsInLedger() {
    return data.length
  }

  console.log(numberOfItemsInInventory())
  // getResponse()
  // const data = getData()
  // console.log('test', data())

  const customTheme = {
    ...{
      theme: {
        colors: {
          transparent: 'transparent',
          black: '#000',
          white: '#fff',
          gray: {
            100: '#f7fafc',
            // ...
            900: '#1a202c',
          },
        },
      },
    },
  }

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <>
      <ThemeProvider value={customTheme}>
        <IconButton variant="text" size="lg" onClick={openDrawer} color="white">
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
                src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                alt="brand"
                className="h-8 w-8"
              />
              <Typography variant="h5" color="black">
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
              {/* <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Analytics
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion> */}
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
              <ListItem>
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
              </ListItem>
            </List>
            {/* <Alert
            open={openAlert}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Upgrade to Material Tailwind PRO and get even more components,
              plugins, advanced features and premium.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium"
              >
                Upgrade Now
              </Typography>
            </div>
          </Alert> */}
          </Card>
        </Drawer>
      </ThemeProvider>
    </>
  )
}

export default BurgerMenu
