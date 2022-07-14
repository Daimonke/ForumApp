import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { context } from "../context/Context";
import Arrows from "@mui/icons-material/KeyboardDoubleArrowDown";
import { CircularProgress } from "@mui/material";

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
    ctx.setUser(false);
    handleClose();
    setLoading(true);
    fetch("/auth/logout")
      .then(() => {
        ctx.setUser(null);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="">
      <div className="flex justify-center">
        {loading && mobile ? (
          <CircularProgress size={25} sx={{ mt: 2 }} />
        ) : (
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
        )}
        <Menu
          disableAutoFocusItem
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          classes={{
            paper: `!rounded-t-none ${
              mobile ? "absolute right-0" : " mt-[-4px]"
            }`,
            list: `bg-slate-200 text-gray-800`,
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
    </div>
  );
}
