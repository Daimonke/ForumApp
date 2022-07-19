/* eslint-disable react-hooks/exhaustive-deps */
import { Stack, Switch, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { context } from "../../context/Context";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";

const FilterBar = () => {
  const ctx = useContext(context);
  const [sortSwitch, setSortSwitch] = useState(
    ctx.sortSwitch === "comments" ? true : false
  );
  const [displaySwitch, setdisplaySwitch] = useState(
    Boolean(ctx.displaySwitch)
  );

  const handleSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortSwitch(e.target.checked);
    ctx.setSortSwitch(e.target.checked ? "comments" : "created_at");
  };

  const handleDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ctx.user) {
      setdisplaySwitch(e.target.checked);
      ctx.setdisplaySwitch(e.target.checked ? `${ctx.user.id}` : "");
    }
  };

  useEffect(() => {
    setSortSwitch(ctx.sortSwitch === "comments" ? true : false);
    setdisplaySwitch(Boolean(ctx.displaySwitch));
    ctx.setPostsQuery(`?sort=${ctx.sortSwitch}&display=${ctx.displaySwitch}`);
  }, [ctx.sortSwitch, ctx.update, ctx.displaySwitch]);

  return (
    <div className="py-2 px-4 md:p-4 mx-0 md:mx-5 border-b-2 flex justify-between">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>New</Typography>
        <MaterialUISwitch
          sx={{ m: 1 }}
          onChange={handleSort}
          checked={sortSwitch}
          classes={{
            track: `${sortSwitch ? "!bg-red-500" : "!bg-blue-500"}`,
          }}
          icon={
            <BoltRoundedIcon
              className="bg-gray-200 rounded-full text-blue-500"
              sx={{
                width: 32,
                height: 32,
              }}
            />
          }
          checkedIcon={
            <LocalFireDepartmentIcon
              className=" bg-gray-200 rounded-full text-red-600"
              sx={{
                width: 32,
                height: 32,
              }}
            />
          }
        />
        <Typography>Hot</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>All</Typography>
        <MaterialUISwitch
          disabled={!ctx.user}
          sx={{ m: 1 }}
          onChange={handleDisplay}
          checked={displaySwitch}
          classes={{
            track: `${displaySwitch ? "!bg-green-500" : "!bg-blue-500"}`,
          }}
          icon={
            <PublicIcon
              className=" bg-gray-200 rounded-full text-blue-600"
              sx={{
                p: 0.1,
                width: 32,
                height: 32,
              }}
            />
          }
          checkedIcon={
            <PersonIcon
              className="  bg-gray-200 rounded-full text-green-600"
              sx={{
                p: 0.2,
                width: 32,
                height: 32,
              }}
            />
          }
        />
        <Typography>My</Typography>
      </Stack>
    </div>
  );
};

export default FilterBar;

const MaterialUISwitch = styled(Switch)(() => ({
  width: 80,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 0,
    padding: 0,
    transform: "translateX(2px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(42px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
  },
}));
