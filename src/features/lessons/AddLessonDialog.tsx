import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

interface AddLessonDialogProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  project: yup.string().required("Project is required"),
  category: yup.string().required("Category is required"),
  impact: yup.string().required("Impact level is required"),
});

const AddLessonDialog = ({ open, onClose }: AddLessonDialogProps) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      project: "",
      category: "",
      impact: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted:", values);
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Lesson</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            {/* Add other form fields similarly */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddLessonDialog;
