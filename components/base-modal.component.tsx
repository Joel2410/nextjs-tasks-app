// mui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  title: string;
  body: string;
  open: boolean;
  dialogResult: (choose: boolean) => void;
};

export default function BaseModalComponent(props: Props) {
  const hadleConfirm = () => {
    props.dialogResult(true);
  };

  const handleCancel = () => {
    props.dialogResult(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>No</Button>
          <Button onClick={hadleConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
