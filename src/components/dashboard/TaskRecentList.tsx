import { List, ListItem, ListItemText, Chip, Stack } from '@mui/material';
import { Task } from '@/lib/schemas/task';
import { format } from 'date-fns';

export default function TaskRecentList({ tasks }: { tasks: Task[] }) {
  return (
    <List dense>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText
            primary={task.title}
            secondary={task.dueDate ? format(new Date(task.dueDate), 'MMM dd') : 'No due date'}
          />
          <Stack direction="row" spacing={1}>
            <Chip label={task.status} size="small" color={
              task.status === 'Completed' ? 'success' :
              task.status === 'Blocked' ? 'error' :
              task.status === 'In Progress' ? 'info' : 'default'
            } />
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
