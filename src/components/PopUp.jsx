import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function PopUp({ open, setOpen }) {
    const handleClose = () => setOpen(false);
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>팝업 제목</DialogTitle>
            <DialogContent>
                <Typography>여기 팝업 내용을 입력하세요.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopUp;
