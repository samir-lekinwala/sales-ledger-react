import { Typography } from '@material-tailwind/react'

interface props {
  colour: string
}

function Footer({ colour }: props) {
  return (
    <footer className=" flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center">
      <Typography
        color={colour}
        className="font-normal hover:underline decoration-[#76ABAE]"
      >
        &copy; 2023 Samir Lekinwala
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          {/* <a href="https://samir-lekinwala.github.io/Portfolio/"> */}
          <Typography
            as="a"
            href="https://samir-lekinwala.github.io/Portfolio/"
            color={colour}
            className="hover:underline decoration-[#76ABAE] font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Me
          </Typography>
          {/* </a> */}
        </li>
        <li>
          <Typography
            as="a"
            href="https://github.com/samir-lekinwala"
            color={colour}
            className=" hover:underline decoration-[#76ABAE] font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            GitHub
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://linkedin.com/in/samir-lekinwala"
            color={colour}
            className="hover:underline decoration-[#76ABAE] font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            LinkedIn
          </Typography>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
