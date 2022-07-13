import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { context } from "../Context";

type Props = {
  classes?: string;
  fullWidth?: boolean;
};

export default function AccountMenu({ classes, fullWidth }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const ctx = React.useContext(context);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    fetch("/auth/logout").then(() => {
      ctx.setUser(null);
    });
  };

  return (
    <div className="flex relative">
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes}
      >
        ACCOUNT
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
          paper: `mt-[-2px] ${fullWidth ? "absolute right-0" : ""}`,
          list: `bg-slate-300 text-gray-800`,
        }}
      >
        <MenuItem onClick={handleClose} disabled>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} disabled>
          My account
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
