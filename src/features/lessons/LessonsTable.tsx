import { useState } from "react";
import Lesson from "./lessonsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, Visibility, Lock } from "@mui/icons-material";
import { useAppSelector } from "../../hooks/hooks";
import { selectAllLessons } from "../../features/lessons/lessonsSlice";

interface Lesson {
  id: string;
  title: string;
  project: string;
  category: string;
  impact: string;
  createdAt: string;
  isConfidential?: boolean;
  [key: string]: any;
}

interface Column {
  id: "title" | "project" | "category" | "impact" | "createdAt";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

const columns: Column[] = [
  { id: "title", label: "Title", minWidth: 200 },
  { id: "project", label: "Project", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "impact", label: "Impact", minWidth: 100, align: "center" },
  { id: "createdAt", label: "Date", minWidth: 100 },
];

const LessonsTable = () => {
  const lessons = useAppSelector(selectAllLessons);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof Lesson>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const handleRequestSort = (property: keyof Lesson) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortedLessons = [...lessons].sort((a: Lesson, b: Lesson) => {
    const aValue = a[orderBy as keyof Lesson];
    const bValue = b[orderBy as keyof Lesson];

    if (order === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="lessons table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedLessons
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lesson) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={lesson.id}>
                  {columns.map((column) => {
                    const value = lesson[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "impact" ? (
                          <Chip
                            label={value}
                            color={
                              value === "High"
                                ? "error"
                                : value === "Medium"
                                  ? "warning"
                                  : "success"
                            }
                          />
                        ) : column.id === "createdAt" ? (
                          new Date(value).toLocaleDateString()
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end">
                      <Tooltip title="View">
                        <IconButton>
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {lesson.isConfidential && (
                        <Tooltip title="Confidential">
                          <Lock color="warning" fontSize="small" />
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={lessons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LessonsTable;
