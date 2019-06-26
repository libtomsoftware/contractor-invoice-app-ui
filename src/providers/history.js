import { createHistory, useBasename } from "history";

const history = useBasename(createHistory)({
  basename: process.env.PUBLIC_URL || ""
});

export default history;
