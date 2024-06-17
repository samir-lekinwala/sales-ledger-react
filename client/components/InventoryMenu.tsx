import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react'
import { item } from '../models/items'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem } from '../apis/api'

interface props {
  item: item
  selectedArray: []
}

function InventoryMenu(props: props) {
  const { item, selectedArray } = props

  const queryClient = useQueryClient()
  const mutateDeleteTransaction = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })
  console.log('selected array', selectedArray)

  function singleItemDeleteOrMultiple(item, array: []) {
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        mutateDeleteTransaction.mutate(array[i])
      }
    } else mutateDeleteTransaction.mutate(item.id)
  }

  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
    >
      <MenuHandler>
        <th className="font-medium text-[#EEEEEE] text-left">{item.item}</th>
      </MenuHandler>
      <MenuList>
        <Link to={`/edit/${item.soldOrBought}/${item.id}`}>
          <MenuItem>Edit</MenuItem>
        </Link>
        {item.soldOrBought == 'bought' && !item.bought_Id ? (
          <MenuItem>
            <Link to={`/sold/${item.id}`}>Sold</Link>
          </MenuItem>
        ) : null}
        {item.soldOrBought == 'sold' && item.bought_Id ? (
          <div
            onClick={(e) => {
              e.preventDefault()
              window.location.replace(`/theledger/#row-${item.bought_Id}`)
            }}
          >
            <MenuItem className="text-[#eeeee] hover:bg-[#6dbdff]">
              <span>Go to Sold</span>
            </MenuItem>
          </div>
        ) : item.soldOrBought == 'bought' && item.bought_Id ? (
          <div
            onClick={(e) => {
              e.preventDefault()
              window.location.replace(`/theledger/#row-${item.bought_Id}`)
            }}
          >
            <MenuItem className="text-[#eeeee] hover:bg-[#6dbdff]">
              <span>Go to Bought</span>
            </MenuItem>
          </div>
        ) : null}
        <MenuItem
          className="text-[#ff3030] hover:text-[#ffffff] hover:bg-[#ff3030]"
          onClick={() => singleItemDeleteOrMultiple(item, selectedArray)}
          // onClick={() => mutateDeleteTransaction.mutate(item.id)}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default InventoryMenu
