import {
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react'

export function RadioHorizontalList() {
  return (
    <Card className="w-full max-w-[24rem]">
      <List className="flex-row">
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                onChange={handleShippingChange}
                value={'yes'}
                name="shippingOption"
                id="yesShipping"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: 'p-0',
                }}
                crossOrigin={null}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              React.js
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                onChange={handleShippingChange}
                defaultChecked
                value={'no'}
                name="shippingOption"
                id="noShipping"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: 'p-0',
                }}
                crossOrigin={null}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              No
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
  )
}
