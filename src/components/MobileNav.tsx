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
};

const MobileNav = ({ links }: Props) => {
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
        color="inherit"
        onClick={() => setOpen(true)}
        size="large"
        sx={{ position: "absolute", height: "fit-content", right: 10 }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ minWidth: 150 }}>
          {links.map((link, index) =>
            link.divider ? (
              <Divider key={index} className="bg-gray-400" />
            ) : (
              <ListItem
                key={index}
                disablePadding
                onClick={() => handleClick(link.path!)}
                className={active === link.path ? "bg-gray-200" : ""}
              >
                <ListItemButton>
                  <ListItemText
                    sx={{ textAlign: "center" }}
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
