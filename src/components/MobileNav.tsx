import { useEffect, useState } from "react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

type Props = {
  links: {
    name?: string;
    path?: string;
    divider?: boolean;
  }[];
  classes?: string;
};

const MobileNav = ({ links, classes }: Props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(window.location.pathname);

  const handleClick = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  useEffect(() => {
    setActive(window.location.pathname);
  }, [navigate]);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        sx={{
          position: "absolute",
          right: 28,
        }}
      >
        <MenuIcon fontSize="large" className={`text-blue-900 ${classes}`} />
      </IconButton>
      <Drawer
        disableRestoreFocus
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { backgroundColor: "black" } }}
      >
        <List sx={{ minWidth: 150 }} disablePadding>
          {links.map((link, index) =>
            link.divider ? (
              <Divider key={index} className="bg-gray-400" />
            ) : (
              <ListItem
                key={index}
                disablePadding
                onClick={() => handleClick(link.path!)}
                className={active === link.path ? "bg-gray-700" : ""}
              >
                <ListItemButton>
                  <ListItemText
                    sx={{ textAlign: "center", color: "white" }}
                    primary={link.name}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default MobileNav;
