import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { context } from "../Context";
import Arrows from "@mui/icons-material/KeyboardDoubleArrowDown";
import { CircularProgress, IconButton } from "@mui/material";

type Props = {
  classes?: string;
  mobile?: boolean;
};

export default function AccountMenu({ classes, mobile }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const ctx = React.useContext(context);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setFirstLoad(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setLoading(true);
    fetch("/auth/logout")
      .then(() => {
        ctx.setUser(null);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center relative">
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes}
      >
        <span>ACCOUNT</span>
        <div className="flex h-full align-middle items-center justify-center">
          <Arrows
            className={`text-green-500 mr-[-0.5rem] ${
              open ? "rotate180" : !firstLoad ? "rotate180back" : ""
            }`}
          />
        </div>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        classes={{
          paper: `mt-[-2px] ${mobile ? "absolute right-0" : ""}`,
          list: `bg-slate-300 text-gray-800`,
        }}
      >
        <MenuItem onClick={handleClose} disabled>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} disabled>
          My account
        </MenuItem>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress color="info" size={25} />
          </div>
        ) : (
          <MenuItem onClick={logout}>Logout</MenuItem>
        )}
      </Menu>
    </div>
  );
}
