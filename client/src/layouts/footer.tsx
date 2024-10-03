// @ts-nocheck
"use client";
import {
  Typography,
  IconButton,
  Input,
  Button,
} from "@material-tailwind/react";

const CURRENT_YEAR = new Date().getFullYear();
const LINKS = ["Home", "About", "Contact"];

export function Footer() {
  return (
    <footer
      style={{ gap: "20px" }}
      className="w-full flex flex-col items-center justify-center p-4 bg-white"
    >
      <div
        id="newsletter"
        style={{ padding: "20px" }}
        className="flex flex-col justify-center items-center bg-gray-900 w-full min-h-[250px] mx-auto rounded-2xl"
      >
        <Typography
          className="text-2xl md:text-3xl text-center font-bold "
          color="white"
        >
          Join our community!
        </Typography>
        <Typography
          color="white"
          className=" md:w-7/12 text-center text-base"
        >
          Get news in your inbox every week! We hate spam too, so no worries
          about this.
        </Typography>
        <div className="mt-8 flex flex-col md:flex-row gap-3 items-center justify-center">
          <div className="grow">
            {/* @ts-ignore */}
            <Input label="Email" color="white" />
          </div>
          <Button size="md" className="w-32" fullWidth color="white">
            subscribe
          </Button>
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <Typography as="a" href="/" variant="h6" className="text-gray-900">
          INTHENEWS.
        </Typography>
        <ul className="flex justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
          {LINKS.map((link, index) => (
            <li key={index}>
              <Typography
                as="a"
                href="#"
                variant="small"
                color="white"
                className="font-normal !text-gray-700 hover:!text-gray-900 transition-colors"
              >
                {link}
              </Typography>
            </li>
          ))}
        </ul>
        <div className="flex w-fit justify-center gap-2">
          <IconButton size="sm" color="blue-gray" variant="text">
            <i className="fa-brands fa-twitter text-lg" />
          </IconButton>
          <IconButton size="sm" color="blue-gray" variant="text">
            <i className="fa-brands fa-youtube text-lg" />
          </IconButton>
          <IconButton size="sm" color="blue-gray" variant="text">
            <i className="fa-brands fa-instagram text-lg" />
          </IconButton>
          <IconButton size="sm" color="blue-gray" variant="text">
            <i className="fa-brands fa-github text-lg" />
          </IconButton>
        </div>
      </div> */}

      <Typography
        color="blue-gray"
        className="text-center font-normal !text-gray-700"
      >
        &copy; {CURRENT_YEAR} Made with ᡣ𐭩 by Web Wiser Technologies
      </Typography>
    </footer>
  );
}

export default Footer;
