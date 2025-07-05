import { signOut } from "next-auth/react";
import Button from "@mui/material/Button";

export default function LogoutButton() {

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </Button>
  );
}