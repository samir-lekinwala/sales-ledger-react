import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react'
import { item } from '../models/items'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteItem } from '../apis/fruits'

interface props {
  item: item
}

function InventoryMenu(props: props) {
  const { item } = props

  const queryClient = useQueryClient()
  const mutateDeleteTransaction = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })

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
        <MenuItem>
          <Link to={`/edit/${item.soldOrBought}/${item.id}`}>Edit</Link>
        </MenuItem>
        {item.soldOrBought == 'bought' ? (
          <MenuItem>
            <Link to={`/sold/${item.id}`}>Sold</Link>
          </MenuItem>
        ) : null}

        <MenuItem
          className="text-[#ff3030] hover:text-[#ffffff] hover:bg-[#ff3030]"
          onClick={() => mutateDeleteTransaction.mutate(item.id)}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default InventoryMenu
